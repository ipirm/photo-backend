import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ){}
    async login(user: any) {
        const payload = { name: user.name, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
