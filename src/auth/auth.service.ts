import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";
import {AdminLoginDto} from "./dto/admin-login-dto";

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
            role: user.role,
            accept_rules: user.accept_rules
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signAdminIn(adminLoginDto: AdminLoginDto): Promise<any> {
        const user = await this.user.findOne({email: adminLoginDto.email,password: adminLoginDto.password});

        // if (user.role !== 'admin') {
        //     throw new UnauthorizedException('Role must be admin');
        // }
        const payload = {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            gender: user.gender,
            age: user.age,
            email: user.email,
            avatar: user.avatar,
            balance: user.balance,
            role: user.role,
            accept_rules: user.accept_rules
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async profile(user: any) {
        return await this.user
            .createQueryBuilder('user')
            .where("user.id = :id", {id: user.id})
            .leftJoinAndSelect('user.concertsUsers', 'concertsUsers')
            .addSelect(["user.balance","user.facebook_id","user.google_id","user.vk_id"])
            .getOne();

    }
}
