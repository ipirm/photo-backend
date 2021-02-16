import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LikesEntity} from "../entities/likes.entity";
import {AddLikeDto} from "./dto/add-like-dto";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {UsersEntity} from "../entities/users.entity";
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(LikesEntity) private readonly like: Repository<LikesEntity>,
        private readonly mailerService: MailerService,
        @InjectRepository(UsersEntity) private readonly user: Repository<UsersEntity>,
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>
    ) {
    }

    // Проголосовать за участника

    async addLike(addLikeDto: AddLikeDto, user): Promise<any> {
        const concertItem = await this.user.findOne({where: {id: user.id}});
        if (!concertItem.accept_rules) {
            return new HttpException('Not Accepted Rules', 403)
        }
        const exist = await this.like.findOne({
            where: {
                user_id: user.id,
                userId: addLikeDto.userId,
                concertId: addLikeDto.concertId
            }
        })
        if (exist)
            return {
                message: 'Exist'
            }
        const likedUser = await this.user.findOne({where: {id: addLikeDto.userId}});
        if(likedUser.email) {
            await this.mailerService.sendMail({
                to: likedUser.email,
                from: 'site@beautybattle.net',
                subject: 'За вас проголосовали на сайте BeautyBattle.net',
                html: `
                  <h1> У вас появился новый лайк!</h1><br>
                  <span>Перейдите по ссылке, чтобы посмотреть <a href="https://beautybattle.net?referrer=${likedUser.id}">https://beautybattle.net/</a></span><br>
                  `,
            })
        }
        Object.assign(addLikeDto, {
            user_id: user.id,
            name: user.name + ' ' + user.last_name,
            email: user.email,
            avatar: user.avatar
        })

        await this.like.save(addLikeDto)
        const concert = await this.concert_users.findOne({
            where: {
                concertId: addLikeDto.concertId,
                userId: addLikeDto.userId
            }
        })
        concert.likesCount++;

        await this.concert_users.save(concert)
        return {success: true}
    }

    // Удалить голос за участника

    async deleteLike(addLikeDto: AddLikeDto, user): Promise<any> {
        const concertItem = await this.user.findOne({where: {id: user.id}});

        if (!concertItem.accept_rules) {
            return new HttpException('Not Accepted Rules', 403)
        }


        const exist = await this.like.findOne({where: {user_id: user.id, concertId: addLikeDto.concertId}})

        if (!exist)
            return 'Like not exist'

        await this.like.delete({concertId: addLikeDto.concertId, userId: addLikeDto.userId, user_id: user.id})
        const concert = await this.concert_users.findOne({
            where: {
                concertId: addLikeDto.concertId,
                userId: addLikeDto.userId
            }
        })
        concert.likesCount--;
        await this.concert_users.save(concert)
        return {success: true}
    }

    // Получиь все голоса за участников
    async getLikes(): Promise<any> {
        return await this.like.find();
    }
}
