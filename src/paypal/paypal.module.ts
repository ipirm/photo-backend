import {Module} from '@nestjs/common';
import {PaypalService} from "./paypal.service";
import {PaypalController} from "./paypal.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [PaypalService],
    controllers: [PaypalController]
})
export class PaypalModule {
}