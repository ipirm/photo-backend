import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "../user/user.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private user: UserService) {
    }

    @UseGuards(AuthGuard('facebook-token'))
    @Get('facebook')
    @ApiOperation({summary: 'Facebook auth'})
    async getTokenAfterFacebookSignIn(@Req() req) {
        return req.user
    }
}
