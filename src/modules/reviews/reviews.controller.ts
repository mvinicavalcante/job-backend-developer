import { Controller, Get } from '@nestjs/common';

@Controller('')
export class ReviewsController {
  constructor() {}

  @Get('/movie-reviews')
  async getReviews() {}
}
