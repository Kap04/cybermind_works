
import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './database/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://cybermind-works-eta.vercel.app'
    ],
    credentials: true,
  });
  await app.init();
}

bootstrap();
export default server;
