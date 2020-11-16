import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ormConfig} from "./orm.config";
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';
import { VoiceModule } from './voice/voice.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        AuthModule,
        ConcertModule,
        VoiceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
