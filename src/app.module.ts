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

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.main',
            isGlobal: true
        }),
        TypeOrmModule.forRoot(ormConfig),
        ServeStaticModule.forRoot({rootPath: `${process.cwd()}/public`}),
        AuthModule,
        ConcertModule,
        ParticipationModule,
        UserModule,
        LikeModule,
        PlaceModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
