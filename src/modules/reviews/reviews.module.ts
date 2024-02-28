import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiOMDbHelper } from 'src/helpers/apiOMDb';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [ReviewsService, ApiOMDbHelper],
})
export class ReviewsModule {}
