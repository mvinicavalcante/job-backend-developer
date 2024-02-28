import { Module } from '@nestjs/common';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Vinicius2014!',
      database: 'dolado',
      entities: [],
      synchronize: true,
    }),
    ReviewsModule,
  ],
})
export class AppModule {}
