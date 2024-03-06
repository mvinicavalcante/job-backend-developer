import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createDocumentSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  createDocumentSwagger(app);
  await app.listen(
    process.env.ENVIROMENT === 'development'
      ? process.env.PORT_LOCAL
      : process.env.PORT_PRODUCTION,
  );
}
bootstrap();
