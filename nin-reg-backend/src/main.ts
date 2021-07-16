import { NestFactory } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, );
  console.log("App is running on", await(app.getUrl()))
}
bootstrap();


