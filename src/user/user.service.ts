import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user-dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UsersEntity) private readonly user: Repository<UsersEntity>) {
    }

    async findOrCreate(profile): Promise<any> {
        const user = await this.user.findOne({facebook_id: profile.id});
        if (user) {
            return user;
        }
        const createdUser = await this.user.save({
            name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
            password: '',
            gender: profile.gender,
            facebook_id: profile.id,
            avatar: profile.photos[0].value
        });
        return createdUser
    }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.user.findOne({facebook_id: createUserDto.facebook_id});
        if (user) {
            return user;
        }
        return await this.user.save(createUserDto)
    }

    async deleteUser(id): Promise<any> {
        return await this.user.delete(id)
    }

    async updateUser(id, createUserDto: CreateUserDto): Promise<any> {
        return await this.user.update(id, createUserDto)
    }

    async findUser(id): Promise<any> {
        return await this.user.findOne(id)
    }

    async getAllUser(): Promise<any> {
        return await this.user.find()
    }
}
