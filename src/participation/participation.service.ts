import {HttpException, Injectable} from '@nestjs/common';
import {AddParticipationDto} from "./dto/add-participation-dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {S3} from 'aws-sdk';
import {ConcertsEntity} from "../entities/concerts.entity";
import {PlacesEntity} from "../entities/places.entity";
import {UsersEntity} from "../entities/users.entity";
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class ParticipationService {
    constructor(
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>,
        @InjectRepository(ConcertsEntity) private readonly concert: Repository<ConcertsEntity>,
        private readonly mailerService: MailerService,
        @InjectRepository(PlacesEntity) private readonly place: Repository<PlacesEntity>,
        @InjectRepository(UsersEntity) private readonly user: Repository<UsersEntity>,
    ) {
    }

    // Учавствовать в конкурсе !
    async addParticipationToConcert(addParticipationDto: AddParticipationDto, files, user): Promise<any> {
        const concertItem = await this.user.findOne({where: {id: user.id}});
        if (!concertItem.accept_rules) {
            return new HttpException('Not Accepted Rules', 403)
        }
        let images = []
        const {concertId} = addParticipationDto;
        const exist = await this.concert_users.find({where: {concertId: concertId, userId: user.id}});
        if (exist.length)
            return `This user exist in ${concertId} concert`;

        for (const item of files) {
            images.push(await this.uploadPublicFile(item))
        }
        const concert = await this.concert.findOne(concertId)

        // Поменять значение призов
        const newTotal = concert.total + parseInt(process.env.PRICE);
        await this.concert.update(concertId, {total: newTotal})

        const places = await this.place.find({where: {concertId: concertId}})

        for (const [i, item] of places.entries()) {
            await this.place.update(item.id, {total: newTotal / 100 * parseInt(item.name)})
        }

        await this.mailerService.sendMail({
            to: 'info@beautybattle.net',
            from: 'site@beautybattle.net',
            subject: 'На сайте появился новый участник !',
            html: `
                  <h1>На сайте появился новый участник !</h1>
                  <span>Имя ${concertItem.name}</span>
                  <span>Почта ${concertItem.email}</span>
                  <span>Фейсбук ${concertItem.facebook_id}</span>
                  <span>Вконтакте ${concertItem.vk_id}</span>
                  `,
        })

        await this.mailerService.sendMail({
            to: 'ilham.pirm@gmail.com',
            from: 'site@beautybattle.net',
            subject: 'На сайте появился новый участник !',
            html: `
                  <h1> На сайте появился новый участник !</h1><br>
                  <span>Имя ${concertItem.name}</span><br>
                  <span>Почта ${concertItem.email}</span><br>
                  <span>Фейсбук ${concertItem.facebook_id}</span><br>
                  <span>Вконтакте ${concertItem.vk_id}</span><br>
                  `,
        })

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
        const likedUser = await this.user.findOne({where: {id: concertUser.userId}});
        concertUser.approve = true;
        await this.concert_users.update(id, concertUser)
        console.log(concertUser.userId);
        console.log(likedUser);
        if (likedUser.email) {
            await this.mailerService.sendMail({
                to: likedUser.email,
                from: 'site@beautybattle.net',
                subject: 'Вы прошли модерацию на участие на конкурсе!',
                html: `
                  <h1>Вы прошли модерацию на участие га конкурсе!</h1><br>
                  <span>Перейдите по ссылке возможно вы уже получили несколько лайков <a href="https://beautybattle.net?referrer=${likedUser.id}">https://beautybattle.net/</a></span>
                  `,
            })
        }
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
