import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ApiOMDbHelper } from 'src/helpers/apiOMDb';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Review])],
      controllers: [ReviewsController],
      providers: [ReviewsService, ApiOMDbHelper],
    }).compile();

    reviewsController = app.get<ReviewsController>(ReviewsController);
  });

  describe('root', () => {
    it('Should be define reviewsController', () => {
      expect(reviewsController).toBeDefined();
    });
  });
});
