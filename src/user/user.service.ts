import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user-dto";
import {S3} from "aws-sdk";

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
            Object.assign(createdUser, {full_name: createdUser.name + createdUser.last_name})
            user = await this.user.save(createdUser)
        }
        return user
    }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.user.findOne({email: createUserDto.email});
        Object.assign(createUserDto, {full_name: createUserDto.name + createUserDto.last_name})
        if (user) {
            return user;
        }
        return await this.user.save(createUserDto)
    }

    async deleteUser(id): Promise<any> {
        return await this.user.delete(id)
    }

    async updateUser(createUserDto: CreateUserDto, user): Promise<any> {
        return await this.user.update(user.id, createUserDto)
    }

    async findUser(id): Promise<any> {
        const participations = await this.user.createQueryBuilder('user')
            .where("user.id = :id", {id: id})
            .leftJoinAndSelect("user.concertsUsers", "concertsUsers")
            .getCount()

        const likes = await this.user.createQueryBuilder('user')
            .where("user.id = :id", {id: id})
            .leftJoinAndSelect("user.likes", "likes")
            .getCount()

        const winner = await this.user.createQueryBuilder('user')
            .where("user.id = :id", {id: id})
            .innerJoinAndSelect("user.places", "places")
            .getOne()

        const user = await this.user.createQueryBuilder('user')
            .where("user.id = :id", {id: id})
            .leftJoinAndSelect("user.concertsUsers", "concertsUsers")
            .getOne()

        return {participations, winner, likes, user}
    }

    async getAllUser(): Promise<any> {
        return await this.user.find()
    }

    async uploadPublicFile(file, user) {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Body: file.buffer,
            Key: file.originalname,
            ACL: 'public-read'
        }).promise();

        return await this.user.update(user.id, {avatar: uploadResult.Location})
    }
}
