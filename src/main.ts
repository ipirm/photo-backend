import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";
import * as helmet from 'helmet';
import {config} from 'aws-sdk';
import * as compression from 'compression';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setDescription('The  API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    SwaggerModule.setup('api', app, document);
    await app.enableCors({
        origin: ['http://localhost:8080','http://localhost:3000','https://beautybattle.net','https://www.beautybattle.net','www.beautybattle.net','beautybattle.net'],
        credentials: true
    });
    app.use(helmet());
    app.use(compression());
    await app.listen(process.env.PORT || 3000, () => {
        console.log(`Our app is running on port ${process.env.PORT}`);
    });
}

bootstrap();
