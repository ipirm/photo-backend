import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";
import * as helmet from 'helmet';
import {config} from 'aws-sdk';

const paypal = require('paypal-rest-sdk');


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.setGlobalPrefix('api');
    await app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setDescription('The  API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    await config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    await paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': process.env.PAYPAL_CLIENT_ID,
        'client_secret': process.env.PAYPAL_CLIENT_SECRET
    });
    await SwaggerModule.setup('api', app, document);
    await app.enableCors();
    await app.use(helmet());
    await app.listen(process.env.PORT || 8080);
}

bootstrap();
