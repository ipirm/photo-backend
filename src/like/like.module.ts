import {Module} from '@nestjs/common';
import {LikeController} from './like.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LikesEntity} from "../entities/likes.entity";
import {LikeService} from "./like.service";

@Module({

    imports: [TypeOrmModule.forFeature([LikesEntity])],
    providers: [LikeService],
    controllers: [LikeController]
})
export class LikeModule {
}
