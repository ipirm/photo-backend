import {Injectable} from "@nestjs/common";
import {use} from "passport";
import PassportFacebookToken = require("passport-facebook-token");
import {UserService} from "../../user/user.service";

@Injectable()
export class FacebookStrategy {
    constructor(
        private readonly userService: UserService
    ) {
        this.init();
    }

    init() {
        use(
            new PassportFacebookToken(
                {
                    clientID: '3468217469894232',
                    clientSecret: 'dbd315621b0e9127f0b70df0851267ba',
                    fbGraphVersion: 'v3.0',
                },
                async (
                    accessToken: string,
                    refreshToken: string,
                    profile: any,
                    done: any,
                ) => {
                    const user = await this.userService.findOrCreate(
                        profile
                    );
                    return done(null, user);
                },
            ),
        );
    }
}