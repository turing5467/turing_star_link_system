/*
 * @Author: turing5467
 * @Date: 2023-03-13 10:11:15
 * @LastEditors: turing5467
 * @LastEditTime: 2023-05-29 14:05:04
 * @Description: main
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './util/filter/http-exception.filter';
import { TransformInterceptor } from './util/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { connectIo } from './util/socket';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger配置
  const config = new DocumentBuilder()
    .setTitle('star-link-system')
    .setDescription('star-link-system接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  // ws连接
  connectIo();
  // rabbitMq
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'turing_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();
  await app.listen(3300);
}
bootstrap();
