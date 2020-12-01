import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, VerifyCallback} from "passport-vkontakte";
import {UserService} from "../../user/user.service";

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, "vkontakte") {
    constructor(private readonly userService: UserService) {
        super({
            passReqToCallBack: false,
            clientID: '7678205',
            clientSecret: 'kaEWZCSsu8CyyQnnUAXG',
            callbackURL: "https://photo-backend-app.herokuapp.com/api/auth/vkontakte/redirect",
            scope: ['id', 'displayName', 'name', 'gender', 'email', 'photos'],
            profileFields: ["email"]
        }, async (accessToken: any,
                  refreshToken: any,
                  params: any,
                  profile: any,
                  done: VerifyCallback) => {
            console.log(profile);
            const user = await this.userService.findOrCreate(profile)
            done(null, user)
        });
    }
}
