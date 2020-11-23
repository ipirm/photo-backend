import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LikesEntity} from "../entities/likes.entity";
import {AddLikeDto} from "./dto/add-like-dto";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(LikesEntity) private readonly like: Repository<LikesEntity>,
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>
    ) {
    }

    // Проголосовать за участника

    async addLike(addLikeDto: AddLikeDto, user): Promise<any> {
        const exist = await this.like.findOne({where: {user_id: user.id, concertId: addLikeDto.concertId}})

        if (exist)
            return `Exist like likedId ${user.id} concertId ${addLikeDto.concertId}`

        Object.assign(addLikeDto, {
            user_id: user.id,
            name: user.name + ' ' + user.last_name,
            email: user.email,
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
