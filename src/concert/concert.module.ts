import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {LikesEntity} from "../entities/likes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ConcertsEntity,ConcertsUsersEntity,LikesEntity])],
  providers: [ConcertService],
  controllers: [ConcertController]
})
export class ConcertModule {}
