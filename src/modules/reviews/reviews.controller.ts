import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('movie-reviews')
export class ReviewsController {
  constructor() {}

  @Get()
  async getReviews() {}

  @Post()
  async createReview() {}

  @Get(':id')
  async getReview() {}

  @Put(':id')
  async updateReview() {}

  @Delete(':id')
  async deleteReview() {}
}
