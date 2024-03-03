import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('movie-reviews')
@Controller('movie-reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({
    summary: 'Get all reviews',
    description: 'Get all reviews with pagination, ordering and filtering',
  })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'order', required: false, type: String })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @Get()
  async getReviews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: string,
    @Query('filter') filter: string,
  ) {
    return await this.reviewsService.getReviews(page, limit, order, filter);
  }

  @ApiOperation({
    summary: 'Get a review',
    description: 'Get a review by its ID',
  })
  @Get(':id')
  async getReview(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return await this.reviewsService.getReview(id);
  }

  @ApiOperation({
    summary: 'Create a review',
    description: 'Create a review',
  })
  @Post()
  async createReview(@Body() body: CreateReviewDto) {
    return await this.reviewsService.createReview(body);
  }

  @ApiOperation({
    summary: 'Update a review',
    description: 'Update a review by its ID',
  })
  @Put(':id')
  async updateReview(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateReviewDto,
  ) {
    return await this.reviewsService.updateReview(id, body);
  }

  @ApiOperation({
    summary: 'Delete a review',
    description: 'Delete a review by its ID',
  })
  @Delete(':id')
  async deleteReview(@Param('id', new ParseIntPipe()) id: number) {
    await this.reviewsService.deleteReview(id);
  }
}
