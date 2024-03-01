import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { OmdbModule } from '../omdb/omdb.module';
import { ReviewRepository } from './repositories/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), OmdbModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewRepository],
})
export class ReviewsModule {}
