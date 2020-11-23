import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {
    }

    @UseGuards(AuthGuard('facebook-token'))
    @Get('facebook')
    @ApiOperation({summary: 'Facebook auth'})
    async login(@Request() req) {
        return this.auth.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
