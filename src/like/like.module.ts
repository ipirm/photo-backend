import {Module} from '@nestjs/common';
import {LikeController} from './like.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LikesEntity} from "../entities/likes.entity";
import {LikeService} from "./like.service";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {UsersEntity} from "../entities/users.entity";

@Module({

    imports: [TypeOrmModule.forFeature([LikesEntity, ConcertsUsersEntity, UsersEntity])],
    providers: [LikeService],
    controllers: [LikeController]
})
export class LikeModule {
}
