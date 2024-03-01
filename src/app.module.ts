import { Module } from '@nestjs/common';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeORMConfig } from './db/mysql.config';
import { TypeOrmExModule } from './db/typeorm-ex.module';
import { ReviewRepository } from './modules/reviews/review.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmExModule.forCustomRepository([ReviewRepository]),
    TypeOrmModule.forRoot(TypeORMConfig),
    ReviewsModule,
  ],
})
export class AppModule {}
