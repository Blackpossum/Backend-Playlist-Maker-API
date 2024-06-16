import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// implement validation
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use the validation here:
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
