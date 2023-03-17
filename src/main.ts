import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PipeValidatorConfig } from './pipe-validator.config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('student-inscription')
    .setDescription('Api del contexto')
    .setVersion('0.0.1')
    .addTag('inscription')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

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
