import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import {UserService} from "../../user/user.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    constructor(private readonly userService: UserService) {
        super({
            clientID: '3468217469894232',
            clientSecret: 'dbd315621b0e9127f0b70df0851267ba',
            callbackURL: "https://photo-backend-app.herokuapp.com/api/auth/facebook/redirect",
            profileFields: ['id', 'displayName', 'name', 'gender','email', 'picture.type(large)']
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any> {
        const user = await this.userService.findOrCreate(
            profile,
        )
        done(null, user);
    }
}