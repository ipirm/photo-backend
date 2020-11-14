import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {UserController} from '../user/user.controller';
import {UserModule} from '../user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {FacebookStrategy} from "./facebook.strategy";
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from './constants'

@Module({
    controllers: [AuthController, UserController],
    providers: [FacebookStrategy, AuthService],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        }),
        UserModule,
        TypeOrmModule.forFeature([UsersEntity])
    ]
})
export class AuthModule {
}
