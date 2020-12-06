import {Module} from '@nestjs/common';
import {ParticipationService} from './participation.service';
import {ParticipationController} from './participation.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {ConcertsEntity} from "../entities/concerts.entity";
import {PlacesEntity} from "../entities/places.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ConcertsUsersEntity,ConcertsEntity,PlacesEntity])],
    providers: [ParticipationService],
    controllers: [ParticipationController]
})
export class ParticipationModule {
}
