import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('movie-reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getReviews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: string,
    @Query('filter') filter: string,
  ) {
    return await this.reviewsService.getReviews(page, limit, order, filter);
  }

  @Get(':id')
  async getReview(@Param('id') id: number) {
    return await this.reviewsService.getReview(id);
  }

  @Put(':id')
  async updateReview() {}

  @Delete(':id')
  async deleteReview() {}
}
