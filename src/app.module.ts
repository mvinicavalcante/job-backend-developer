import { Module } from '@nestjs/common';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './db/mysql.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), ReviewsModule],
})
export class AppModule {}
