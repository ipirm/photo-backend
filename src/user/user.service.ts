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
        const {provider} = profile
        let user;
        if (provider === 'google') {
            user = await this.user.findOne({google_id: profile.id});
        }
        if (provider === 'facebook') {
            user = await this.user.findOne({facebook_id: profile.id})
        }
        if (provider === 'vkontakte') {
            user = await this.user.findOne({vk_id: profile.id})
        }

        if (!user) {
            const createdUser = {
                name: profile.name.givenName ? profile.name.givenName : '',
                last_name: profile.name.familyName ? profile.name.familyName : '',
                email: profile.emails[0].value ? profile.emails[0].value : '',
                password: '',
                gender: profile.gender ? profile.gender : '',
                avatar: profile.photos[0].value ? profile.photos[0].value : ''
            };
            if (provider === 'google') {
                Object.assign(createdUser, {google_id: profile.id})
            }
            if (provider === 'facebook') {
                Object.assign(createdUser, {facebook_id: profile.id})
            }
            if (provider === 'vkontakte') {
                Object.assign(createdUser, {vk_id: profile.id})
            }
            user = await this.user.save(createdUser)
        }
        console.log(user);
        return user
    }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.user.findOne({email: createUserDto.email});
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
