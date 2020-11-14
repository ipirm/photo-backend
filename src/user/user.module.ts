import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
