import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const corsOptions: CorsOptions = {
    origin: process.env.ORIGIN || 'https://kyomplete-todo-nextjs.vercel.app/', // or your frontend application's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
