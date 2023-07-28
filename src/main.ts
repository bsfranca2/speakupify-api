import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(AppModule.port, AppModule.hostname);
  logger.log(`Listening at http://${AppModule.hostname}:${AppModule.port}/`);
}
bootstrap();
