import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable cors for frontend access
  app.setGlobalPrefix('api'); // Set prefix "api" to global after www.domain.com
  app.useGlobalPipes(new ValidationPipe()); // Set global validationPipe to any class or entity
  await app.listen(3000); // Application listen on port : 3000
}
bootstrap();
