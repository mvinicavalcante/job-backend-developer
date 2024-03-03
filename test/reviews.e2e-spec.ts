import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../src/modules/reviews/reviews.service';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from '../src/modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../src/modules/reviews/entities/review.entity';
import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();

describe('Reviews Module (e2e test)', () => {
  let app: INestApplication;

  const mockReviewsService = {
    getReviews: jest.fn(),
    getReview: jest.fn(),
    createReview: jest.fn(),
    updateReview: jest.fn(),
    deleteReview: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env', '.env.production'],
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: process.env.DB_PORT as unknown as number,
          database: process.env.DB_NAME,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          entities: [Review],
          migrations: ['dist/src/migrations/*{.ts,.js}'],
          synchronize: true,
          migrationsRun: true,
          migrationsTableName: 'migrations_TypeORM',
          migrationsTransactionMode: 'all',
        }),
        ReviewsModule,
      ],
    })
      .overrideProvider(ReviewsService)
      .useValue(mockReviewsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /movie-reviews', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get('/movie-reviews');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews?filter=smurfs', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews?filter=smurfs',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews?order=id:asc', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews?order=id:asc',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews?order=id:desc', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews?order=id:desc',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews?order=title:asc', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews?order=title:asc',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews?order=title:desc', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews?order=title:desc',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews?order=rating:asc', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews?order=rating:asc',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews?order=rating:desc', () => {
    it('Should return an array of reviews', async () => {
      const reviews = [
        { title: 'The Smurfs', notes: 'Great movie!' },
        { title: 'The Smurfs 2', notes: 'Great movie!' },
      ];
      mockReviewsService.getReviews.mockResolvedValue({
        reviews,
        total: reviews.length,
      });
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews?order=rating:desc',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: reviews,
        total: reviews.length,
      });
    });
  });

  describe('GET /movie-reviews/:id', () => {
    it('Should return a review', async () => {
      const review = { title: 'The Smurfs', notes: 'Great movie!' };
      mockReviewsService.getReview.mockResolvedValue(review);
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews/1',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(review);
    });
  });

  describe('GET /movie-reviews/:id', () => {
    it('Should return a 500 status', async () => {
      const response = await request(app.getHttpServer()).get(
        '/movie-reviews/a',
      );
      expect(response.status).toBe(400);
    });
  });

  describe('POST /movie-reviews', () => {
    it('Should return a review', async () => {
      const review = {
        tile: 'The Smurfs',
        notes: 'Great movie!',
      };
      mockReviewsService.createReview.mockResolvedValue(review);

      const response = await request(app.getHttpServer())
        .post('/movie-reviews')
        .send(review);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(review);
    });
  });

  describe('POST /movie-reviews', () => {
    it('Should return a 500 status', async () => {
      const review = {
        tile: 'The Smurfs',
        notes: 'Great movie!',
      };
      mockReviewsService.createReview.mockRejectedValue(new Error());

      const response = await request(app.getHttpServer())
        .post('/movie-reviews')
        .send(review);

      expect(response.status).toBe(500);
    });
  });

  describe('PUT /movie-reviews/:id', () => {
    it('Should return a review', async () => {
      const review = {
        tile: 'The Smurfs',
        notes: 'Great movie!',
      };
      mockReviewsService.updateReview.mockResolvedValue(review);

      const response = await request(app.getHttpServer())
        .put('/movie-reviews/1')
        .send(review);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(review);
    });
  });

  describe('PUT /movie-reviews/:id', () => {
    it('Should return a 500 status', async () => {
      const review = {
        tile: 'The Smurfs',
        notes: 'Great movie!',
      };
      mockReviewsService.updateReview.mockRejectedValue(new Error());

      const response = await request(app.getHttpServer())
        .put('/movie-reviews/1')
        .send(review);

      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /movie-reviews/:id', () => {
    it('Should return a 200 status', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/movie-reviews/1',
      );
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /movie-reviews/:id', () => {
    it('Should return a 500 status', async () => {
      mockReviewsService.deleteReview.mockRejectedValue(new Error());
      const response = await request(app.getHttpServer()).delete(
        '/movie-reviews/1',
      );
      expect(response.status).toBe(500);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
