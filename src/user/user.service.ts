import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";

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

}
