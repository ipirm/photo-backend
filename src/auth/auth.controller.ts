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

    // access_token: EAAxSU05LZClgBAKdczPXL9cfxur8RJCcuHT9DSCwdlrAIEU2PeBhqxt0u1mNe4DBEya871monORYKy1DDp8vbpm6yXD0y2rs7qlvx0Nlx1vxMsaDnUxaTkTy7ZCAg5QZCYZCpofSzoU8pNQq5oPysSZCZAKKXejOsfQ39QKEuWzRGQGhUbmUzDQmmppnNkm607nO9TzBQduAZDZD
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

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Request() req) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Request() req) {
        return this.auth.login(req.user);
    }
}
