import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlacesEntity} from "../entities/places.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlacesEntity])],
  providers: [PlaceService],
  controllers: [PlaceController]
})
export class PlaceModule {}
