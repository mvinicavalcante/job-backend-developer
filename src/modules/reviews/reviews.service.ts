import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { Like, FindManyOptions } from 'typeorm';
import { OmdbProvider } from '../omdb/omdb.provider';
import { ReviewRepository } from './repositories/review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly omdbProvider: OmdbProvider,
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
      if (!['id', 'title', 'rating', 'released'].includes(field))
        throw new HttpException('Invalid field', 400);
      options.order[field] = direction.toUpperCase();
    }

    if (filter) {
      options.where = [
        { title: Like(`%${filter}%`) },
        { director: Like(`%${filter}%`) },
        { actors: Like(`%${filter}%`) },
        { genre: Like(`%${filter}%`) },
      ];
    }

    const [reviews, total] =
      await this.reviewRepository.findAndCountReviews(options);

    return { reviews, total };
  }

  async getReview(id: number) {
    const review = await this.reviewRepository.findOneReview(id);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async deleteReview(id: number) {
    const review = await this.reviewRepository.findOneReview(id);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewRepository.deleteReview(id);
  }

  async createReview(data: Partial<Review>) {
    try {
      const reviewExists = await this.reviewRepository.findOneByTitle(
        data.title,
      );

      if (reviewExists) {
        throw new HttpException(
          `Review already exists with title "${reviewExists.title}" and id "${reviewExists.id}" `,
          403,
        );
      }

      const moviesData = await this.omdbProvider.searchMovies(data.title);

      if (!moviesData.Search) {
        throw new NotFoundException('No movies found');
      }

      const exactMatch = this.findExactMatch(moviesData.Search, data.title);

      if (!exactMatch) {
        const similarTitles = moviesData.Search.map(
          (movie: any) => movie.Title,
        );
        throw new HttpException(
          `Movie title not found. Similar titles: ${similarTitles.join(', ')}`,
          404,
        );
      }

      const imdbID = exactMatch.imdbID;

      if (!imdbID) {
        throw new NotFoundException('IMDb ID not found for the given movie');
      }

      const movieDetails = await this.omdbProvider.getMovieByImdbID(imdbID);

      if (!movieDetails) {
        throw new NotFoundException('Movie details not found');
      }

      return this.reviewRepository.createReview({
        ...data,
        rating: movieDetails.imdbRating,
        runtime: movieDetails.Runtime,
        director: movieDetails.Director,
        genre: movieDetails.Genre,
        released: new Date(movieDetails.Released),
        actors: movieDetails.Actors,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  private findExactMatch(movies: any[], title: string) {
    return movies.find(
      (movie: any) => movie.Title.toLowerCase() === title.toLowerCase(),
    );
  }

  async updateReview(id: number, data: Partial<Review>) {
    try {
      const review = await this.reviewRepository.findOneReview(id);

      if (!review) {
        throw new NotFoundException('Review not found');
      }

      if (data.title) {
        const reviewExists = await this.reviewRepository.findOneByTitle(
          data.title,
        );

        if (reviewExists && reviewExists.id !== id) {
          throw new HttpException(
            `Review already exists with title ${reviewExists.title} and id ${reviewExists.id}`,
            403,
          );
        }

        const moviesData = await this.omdbProvider.searchMovies(data.title);

        if (!moviesData.Search) {
          throw new NotFoundException('No movies found');
        }

        const exactMatch = this.findExactMatch(moviesData.Search, data.title);

        if (!exactMatch) {
          const similarTitles = moviesData.Search.map(
            (movie: any) => movie.Title,
          );
          throw new HttpException(
            `Movie title not found. Similar titles: ${similarTitles.join(', ')}`,
            404,
          );
        }

        const imdbID = exactMatch.imdbID;

        if (!imdbID) {
          throw new NotFoundException('IMDb ID not found for the given movie');
        }

        const movieDetails = await this.omdbProvider.getMovieByImdbID(imdbID);

        if (!movieDetails) {
          throw new NotFoundException('Movie details not found');
        }

        data.title = movieDetails.Title;
        data.rating = movieDetails.imdbRating;
        data.runtime = movieDetails.Runtime;
        data.director = movieDetails.Director;
        data.genre = movieDetails.Genre;
        data.released = new Date(movieDetails.Released);
        data.actors = movieDetails.Actors;
      }

      await this.reviewRepository.update(id, data);

      return await this.reviewRepository.findOneReview(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
