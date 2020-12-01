import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy,VerifyCallback } from "passport-vkontakte";
import {UserService} from "../../user/user.service";

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, "vkontakte") {
    constructor(private readonly userService: UserService) {
        super({
            clientID: '7678205',
            clientSecret: 'kaEWZCSsu8CyyQnnUAXG',
            callbackURL: "https://photo-backend-app.herokuapp.com/api/auth/vkontakte/redirect",
        });
    }
    async validate(accessToken:any, refreshToken:any, params:any, profile: any, done:any): Promise<any> {
        const user = await this.userService.findOrCreate(
            profile,
        );
        done(null, user);
    }
}