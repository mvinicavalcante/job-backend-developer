import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './reviews.dto';

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

  @Post()
  async createReview(@Body() body: CreateReviewDto) {
    return await this.reviewsService.createReview(body);
  }

  @Put(':id')
  async updateReview() {}

  @Delete(':id')
  async deleteReview(@Param('id') id: number) {
    await this.reviewsService.deleteReview(id);
  }
}
