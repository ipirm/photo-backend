import {Module} from '@nestjs/common';
import {ParticipationService} from './participation.service';
import {ParticipationController} from './participation.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ConcertsUsersEntity])],
    providers: [ParticipationService],
    controllers: [ParticipationController]
})
export class ParticipationModule {
}
