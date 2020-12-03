import {Injectable} from '@nestjs/common';
import {AddParticipationDto} from "./dto/add-participation-dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {S3} from 'aws-sdk';

@Injectable()
export class ParticipationService {
    constructor(
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>
    ) {
    }

    // Учавствовать в конкурсе !
    async addParticipationToConcert(addParticipationDto: AddParticipationDto, files, user): Promise<any> {
        let images = []
        const {concertId} = addParticipationDto;
        const exist = await this.concert_users.find({where: {concertId: concertId, userId: user.id}});
        if (exist.length)
            return `This user exist in ${concertId} concert`;


        for (const item of files) {
            images.push(await this.uploadPublicFile(item))
        }

        Object.assign(addParticipationDto, {images: images, userId: user.id})
        return await this.concert_users.save(addParticipationDto);
    }

    // Удалить участие из конкурса
    async deleteParticipationFromConcert(addParticipationDto: AddParticipationDto, user): Promise<any> {
        const {concertId} = addParticipationDto;
        return await this.concert_users.delete({concertId: concertId, userId: user.id});
    }


    //  Подтвердить участие юзера в концерте по id
    async approveConcertUser(id): Promise<any> {
        const concertUser = await this.concert_users.findOne(id);
        concertUser.approve = true;
        await this.concert_users.update(id, concertUser)
        return {success: true}
    }

    async uploadPublicFile(file) {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Body: file.buffer,
            Key: file.originalname,
            ACL: 'public-read'
        }).promise();

        return {
            key: uploadResult.Key,
            url: uploadResult.Location
        };
    }
}
