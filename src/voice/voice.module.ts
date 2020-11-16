import { Module } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ConcertsEntity,ConcertsUsersEntity])],
  providers: [VoiceService],
  controllers: [VoiceController]
})
export class VoiceModule {}
