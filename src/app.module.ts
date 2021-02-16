import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ormConfig} from "./orm.config";
import {AuthModule} from './auth/auth.module';
import {ConcertModule} from './concert/concert.module';
import {ParticipationModule} from './participation/participation.module';
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "./user/user.module";
import {LikeModule} from './like/like.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {PlaceModule} from './place/place.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail/mail.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.main',
            isGlobal: true
        }),
        MailerModule.forRoot({
            transport: {
                host: 'mail.beautybattle.net',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'site@beautybattle.net', // generated ethereal user
                    pass: '_Szmun+(t_lG', // generated ethereal password
                },
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        TypeOrmModule.forRoot(ormConfig),
        ServeStaticModule.forRoot({rootPath: `${process.cwd()}/public`}),
        AuthModule,
        ConcertModule,
        ParticipationModule,
        UserModule,
        LikeModule,
        PlaceModule,
        MailModule
    ],
    controllers: [AppController],
    providers: [AppService, MailService],
})
export class AppModule {
}
