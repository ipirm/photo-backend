import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UsersEntity) private readonly user: Repository<UsersEntity>
    ) {
    }


    async login(user: any) {
        const payload = {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            gender: user.gender,
            age: user.age,
            email: user.email,
            avatar: user.avatar,
            balance: user.balance,
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async profile(user: any) {
        return await this.user.findOne(user.id)
    }
}
