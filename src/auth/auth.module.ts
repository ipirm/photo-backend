import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {UserController} from '../user/user.controller';
import {UserModule} from '../user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {FacebookStrategy} from "./social/facebook.strategy";
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from './jwt/constants'
import {JwtStrategy} from "./jwt/jwt.strategy";
import {GoogleStrategy} from "./social/google.strategy";

@Module({
    controllers: [AuthController, UserController],
    providers: [FacebookStrategy,GoogleStrategy, AuthService,JwtStrategy],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '286400s'},
        }),
        UserModule,
        TypeOrmModule.forFeature([UsersEntity])
    ]
})
export class AuthModule {
}
