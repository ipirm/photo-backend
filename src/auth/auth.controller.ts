import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "../user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private user: UserService) {
    }

    @UseGuards(AuthGuard('facebook-token'))
    @Get('facebook')
    async getTokenAfterFacebookSignIn(@Req() req) {
        return req.user
    }
}
