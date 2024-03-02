import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ReviewsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/movie-reviews (POST)', () => {
    return request(app.getHttpServer())
      .post('/movie-reviews')
      .send({
        title: 'Test Movie',
        notes: 'Test Notes',
      })
      .expect(201);
  });

  it('/movie-reviews (GET)', () => {
    return request(app.getHttpServer()).get('/movie-reviews').expect(200);
  });

  it('/movie-reviews/:id (GET)', () => {
    return request(app.getHttpServer()).get('/movie-reviews/1').expect(200);
  });

  it('/movie-reviews/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/movie-reviews/1')
      .send({
        title: 'Updated Test Movie',
        notes: 'Updated Test Notes',
      })
      .expect(200);
  });

  it('/movie-reviews/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/movie-reviews/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
