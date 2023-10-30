import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const corsOptions: CorsOptions = {
    origin: process.env.ORIGIN || 'http://localhost:3000', // or your frontend application's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
