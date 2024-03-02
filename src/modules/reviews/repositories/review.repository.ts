import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(private dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  async findOneByTitle(title: string): Promise<Review> {
    const queryBuilder = this.dataSource.createQueryBuilder(Review, 'review');

    return await queryBuilder
      .where('review.title = :title', { title })
      .getOne();
  }

  async findAndCount(
    options?: FindManyOptions<Review>,
  ): Promise<[Review[], number]> {
    if (!this.dataSource) {
      throw new Error('EntityManager not initialized');
    }

    const queryBuilder = this.dataSource.createQueryBuilder(Review, 'review');

    if (options?.where) {
      queryBuilder.where(options.where);
    }

    if (options?.skip) {
      queryBuilder.skip(options.skip);
    }

    if (options?.take) {
      queryBuilder.take(options.take);
    }

    if (options?.order) {
      Object.keys(options.order).forEach((key) => {
        const value = options.order[key];
        queryBuilder.orderBy(`review.${key}`, value);
      });
    }

    return await queryBuilder.getManyAndCount();
  }

  async findOneReview(id: number): Promise<Review> {
    if (!this.dataSource) {
      throw new Error('EntityManager not initialized');
    }

    const queryBuilder = this.dataSource.createQueryBuilder(Review, 'review');

    return await queryBuilder.where('review.id = :id', { id }).getOne();
  }

  async createReview(data: Partial<Review>): Promise<Review> {
    return this.dataSource.transaction(async (manager) => {
      const review = new Review();
      Object.assign(review, data);
      return await manager.save(review);
    });
  }

  async updateReview(id: number, data: Partial<Review>): Promise<Review> {
    return this.dataSource.transaction(async (manager) => {
      const review = await manager.findOne(Review, {
        where: { id },
      });
      if (!review) {
        throw new Error('Review not found');
      }

      Object.assign(review, data);
      return await manager.save(review);
    });
  }

  async deleteReview(id: number): Promise<void> {
    return this.dataSource.transaction(async (manager) => {
      const review = await manager.findOne(Review, {
        where: { id },
      });
      if (!review) {
        throw new Error('Review not found');
      }

      await manager.remove(review);
    });
  }
}
