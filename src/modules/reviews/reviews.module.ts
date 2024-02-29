import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiOMDbHelper } from 'src/helpers/apiOMDb';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService, ApiOMDbHelper],
})
export class ReviewsModule {}
