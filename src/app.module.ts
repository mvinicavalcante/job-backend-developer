import { Module } from '@nestjs/common';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeORMConfig } from './db/mysql.config';
import { TypeOrmExModule } from './db/typeorm-ex.module';
import { ReviewRepository } from './modules/reviews/repositories/review.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.production'],
    }),
    TypeOrmModule.forRoot(TypeORMConfig),
    TypeOrmExModule.forCustomRepository([ReviewRepository]),
    ReviewsModule,
  ],
})
export class AppModule {}
