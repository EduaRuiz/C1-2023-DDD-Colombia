import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PipeValidatorConfig } from './pipe-validator.config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      cliente: {
        brokers: ['localhost:9092'],
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
