import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import {UserService} from "../../user/user.service";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly userService: UserService) {
        super({
            clientID: '17653774292-a18pndk5e5q1479cfoiofkgiu1diiqrc.apps.googleusercontent.com',
            clientSecret: 'xfDPfc552VyomPsAVKs4dg3n',
            callbackURL: 'https://photo-backend-app.herokuapp.com/api/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user = await this.userService.findOrCreate(
            profile,
        );
        done(null, user);
    }
}