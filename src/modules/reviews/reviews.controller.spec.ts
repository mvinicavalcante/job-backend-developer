import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { OmdbModule } from '../omdb/omdb.module';
import { Review } from './entities/review.entity';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [OmdbModule],
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            getReviews: jest.fn(),
            getReview: jest.fn(),
            createReview: jest.fn(),
            updateReview: jest.fn(),
            deleteReview: jest.fn(),
          },
        },
      ],
    }).compile();

    reviewsController = app.get<ReviewsController>(ReviewsController);
  });

  describe('root', () => {
    it('Should be define reviewsController', () => {
      expect(reviewsController).toBeDefined();
    });
  });

  describe('getReviews', () => {
    it('Should be return an array of reviews', async () => {
      const result = { reviews: [], total: 0 };
      jest
        .spyOn(reviewsController, 'getReviews')
        .mockImplementation(async () => result);
      expect(
        await reviewsController.getReviews(1, 10, 'id:asc', 'filter'),
      ).toBe(result);
    });
  });

  describe('getReview', () => {
    it('Should be return a review', async () => {
      const result = {} as Review; // Specify the type of result as Review
      jest
        .spyOn(reviewsController, 'getReview')
        .mockImplementation(async () => result);
      expect(await reviewsController.getReview(1)).toBe(result);
    });
  });

  describe('createReview', () => {
    it('Should be return a review', async () => {
      const result = {} as Review;
      jest
        .spyOn(reviewsController, 'createReview')
        .mockImplementation(async () => result);
      expect(
        await reviewsController.createReview({
          title: 'title',
          notes: 'notes test',
        }),
      ).toBe(result);
    });
  });

  describe('updateReview', () => {
    it('Should be return a review', async () => {
      const result = {} as Review;
      jest
        .spyOn(reviewsController, 'updateReview')
        .mockImplementation(async () => result);
      expect(
        await reviewsController.updateReview(1, {
          notes: 'notes test updated',
        }),
      ).toBe(result);
    });
  });

  describe('deleteReview', () => {
    it('Should be return undefined', async () => {
      jest
        .spyOn(reviewsController, 'deleteReview')
        .mockImplementation(async () => undefined);
      expect(await reviewsController.deleteReview(1)).toBeUndefined();
    });
  });

  describe('getReviews', () => {
    it('Should be return an error', async () => {
      jest
        .spyOn(reviewsController, 'getReviews')
        .mockImplementation(async () => {
          throw new Error();
        });
      expect(
        reviewsController.getReviews(1, 10, 'id:asc', 'filter'),
      ).rejects.toThrow();
    });
  });

  describe('getReview', () => {
    it('Should be return an error', async () => {
      jest
        .spyOn(reviewsController, 'getReview')
        .mockImplementation(async () => {
          throw new Error();
        });
      expect(reviewsController.getReview(1)).rejects.toThrow();
    });
  });

  describe('createReview', () => {
    it('Should be return an error', async () => {
      jest
        .spyOn(reviewsController, 'createReview')
        .mockImplementation(async () => {
          throw new Error();
        });
      expect(
        reviewsController.createReview({
          title: 'title',
          notes: 'notes test',
        }),
      ).rejects.toThrow();
    });
  });

  describe('updateReview', () => {
    it('Should be return an error', async () => {
      jest
        .spyOn(reviewsController, 'updateReview')
        .mockImplementation(async () => {
          throw new Error();
        });
      expect(
        reviewsController.updateReview(1, {
          notes: 'notes test updated',
        }),
      ).rejects.toThrow();
    });
  });

  describe('deleteReview', () => {
    it('Should be return an error', async () => {
      jest
        .spyOn(reviewsController, 'deleteReview')
        .mockImplementation(async () => {
          throw new Error();
        });
      expect(reviewsController.deleteReview(1)).rejects.toThrow();
    });
  });
});
