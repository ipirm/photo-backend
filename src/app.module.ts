import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ormConfig} from "./orm.config";
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';
import { ParticipationModule } from './participation/participation.module';
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "./user/user.module";
import { LikeService } from './like/like.service';
import { LikeModule } from './like/like.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot(ormConfig),
        AuthModule,
        ConcertModule,
        ParticipationModule,
        UserModule,
        LikeModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
