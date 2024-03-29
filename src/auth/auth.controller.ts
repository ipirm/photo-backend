import {Controller, Get, Request, UseGuards, Res, HttpStatus, Req, Post, Body} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";
import {User} from "../decorators/user.decorator";
import {AdminLoginDto} from "./dto/admin-login-dto";

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
    getProfile(@Request() req,@User() user: any,) {
        return this.auth.profile(user);
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

    @Post('admin/login')
    loginAsAdmin(@Body() adminLoginDto: AdminLoginDto){
        return this.auth.signAdminIn(adminLoginDto)
    }


}
