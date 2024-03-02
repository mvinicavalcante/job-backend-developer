import { EntityManager, FindManyOptions } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CustomRepository } from '../../../db/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
@CustomRepository(Review)
export class ReviewRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findOneByTitle(title: string): Promise<Review> {
    const queryBuilder = this.entityManager.createQueryBuilder(
      Review,
      'review',
    );

    return await queryBuilder
      .where('review.title = :title', { title })
      .getOne();
  }

  async findAndCount(
    options?: FindManyOptions<Review>,
  ): Promise<[Review[], number]> {
    if (!this.entityManager) {
      throw new Error('EntityManager not initialized');
    }

    const queryBuilder = this.entityManager.createQueryBuilder(
      Review,
      'review',
    );

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

  async findOne(id: number): Promise<Review> {
    if (!this.entityManager) {
      throw new Error('EntityManager not initialized');
    }

    const queryBuilder = this.entityManager.createQueryBuilder(
      Review,
      'review',
    );

    return await queryBuilder.where('review.id = :id', { id }).getOne();
  }

  async create(data: Partial<Review>): Promise<Review> {
    if (!this.entityManager) {
      throw new Error('EntityManager not initialized');
    }

    const review = new Review();
    Object.assign(review, data);

    return await this.entityManager.save(review);
  }

  async update(id: number, data: Partial<Review>): Promise<Review> {
    if (!this.entityManager) {
      throw new Error('EntityManager not initialized');
    }
    const queryBuilder = this.entityManager.createQueryBuilder(
      Review,
      'review',
    );

    await queryBuilder
      .update(Review)
      .set(data)
      .where('review.id = :id', { id })
      .execute();

    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    if (!this.entityManager) {
      throw new Error('EntityManager not initialized');
    }

    const queryBuilder = this.entityManager.createQueryBuilder(
      Review,
      'review',
    );

    await queryBuilder.delete().where('review.id = :id', { id }).execute();
  }
}
