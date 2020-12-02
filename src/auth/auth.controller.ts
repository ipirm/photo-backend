import {Controller, Get, Request, UseGuards, Res, HttpStatus, Req} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {
    }

    @Get("/facebook")
    @UseGuards(AuthGuard("facebook"))
    facebookLogin() {
        return HttpStatus.OK;
    }

    @Get("/facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
        const url = await this.auth.login(req.user);
        return res.redirect(`${process.env.FRONT_URL}/?access_token=${url.access_token}`)
    }

    @Get("/vkontakte")
    @UseGuards(AuthGuard("vkontakte"))
     vkontakteLogin() {
        return HttpStatus.OK;
    }

    @Get("/vkontakte/redirect")
    @UseGuards(AuthGuard("vkontakte"))
    async vkontakteLoginRedirect(@Req() req, @Res() res): Promise<any> {
        const url = await this.auth.login(req.user);
         res.redirect(`${process.env.FRONT_URL}/?access_token=${url.access_token}`)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth(@Request() req) {
        return HttpStatus.OK;
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req, @Res() res) {
        const url = await this.auth.login(req.user);
        return res.redirect(`${process.env.FRONT_URL}/?access_token=${url.access_token}`)
    }
}
