import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";
import { IoAdapter } from '@nestjs/platform-socket.io';
import {WsAdapter} from "@nestjs/platform-ws";
// import {RedisIoAdapter} from "./common/adapters/redis-io.adapter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setDescription('The  API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    // app.useWebSocketAdapter(new RedisIoAdapter(app));
    // app.useWebSocketAdapter(new WsAdapter(app));
    SwaggerModule.setup('api', app, document);
    app.enableCors();
    // app.useWebSocketAdapter(new WsAdapter());
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
