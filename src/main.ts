import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";
import {IoAdapter} from '@nestjs/platform-socket.io';
import {WsAdapter} from "@nestjs/platform-ws";
// import {RedisIoAdapter} from "./common/adapters/redis-io.adapter";
import {config} from 'aws-sdk';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setDescription('The  API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    app.enableCors();

    // config.update({
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //     region: process.env.AWS_REGION
    // });
    // app.useWebSocketAdapter(new WsAdapter());
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
