import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository, Like, FindManyOptions, EntityManager } from 'typeorm';
import { OmdbProvider } from '../omdb/omdb.provider';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private readonly omdbprovider: OmdbProvider,
    private readonly entityManager: EntityManager,
  ) {}

  async getReviews(page = 1, limit = 10, order: string, filter: string) {
    const options: FindManyOptions<Review> = {
      skip: (page - 1) * limit,
      take: limit,
      order: {},
      where: {},
    };

    if (order) {
      const [field, direction] = order.split(':');
      options.order[field] = direction.toUpperCase();
    }

    if (filter) {
      options.where = [
        { title: Like(`%${filter}%`) },
        { director: Like(`%${filter}%`) },
        { actors: Like(`%${filter}%`) },
      ];
    }

    const [reviews, total] = await this.reviewRepository.findAndCount(options);

    if (reviews.length === 0) {
      throw new NotFoundException('No reviews found');
    }

    return { reviews, total };
  }

  async getReview(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async deleteReview(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewRepository.delete(id);
  }

  async createReview(data: Partial<Review>) {
    try {
      const reviewExists = await this.reviewAlreadyExists(data.title);

      if (reviewExists) {
        throw new HttpException('Review already exists', 403);
      }

      const moviesData = await this.omdbprovider.searchMovies(data.title);
      const movieData = this.getFirstMovieData(moviesData);
      const imdbID = movieData.imdbID;

      if (!imdbID) {
        throw new NotFoundException('IMDb ID not found for the given movie');
      }

      const movieDetails = await this.omdbprovider.getMovieByImdbID(imdbID);

      return this.entityManager.transaction(async (entityManager) => {
        const review = entityManager.create(Review, {
          ...data,
          rating: movieDetails.imdbRating,
          runtime: movieDetails.Runtime,
          director: movieDetails.Director,
          genre: movieDetails.Genre,
          released: new Date(movieDetails.Released),
          actors: movieDetails.Actors,
        });

        await entityManager.save(review);

        return review;
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  private async reviewAlreadyExists(title: string) {
    return await this.reviewRepository.findOne({ where: { title } });
  }

  private getFirstMovieData(data: any) {
    return data.Search[0];
  }

  async updateReview(id: number, data: Partial<Review>) {
    try {
      const review = await this.reviewRepository.findOne({ where: { id: id } });

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      return this.entityManager.transaction(async (entityManager) => {
        await entityManager.update(Review, { id }, data);

        const updatedReview = await entityManager.findOne(Review, {
          where: { id },
        });

        if (!updatedReview) {
          throw new NotFoundException('Updated review not found');
        }

        return updatedReview;
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
