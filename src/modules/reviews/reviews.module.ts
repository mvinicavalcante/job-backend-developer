import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { OmdbModule } from '../omdb/omdb.module';
import { ReviewRepository } from './review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), OmdbModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewRepository],
})
export class ReviewsModule {}
