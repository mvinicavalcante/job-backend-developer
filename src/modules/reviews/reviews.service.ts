import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOMDbHelper } from 'src/helpers/apiOMDb';
import { Review } from './review.entity';
import { Repository, Like, FindManyOptions } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private readonly apiOMDbHelper: ApiOMDbHelper,
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
}
