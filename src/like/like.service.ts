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

    async addLike(addLikeDto: AddLikeDto): Promise<any> {
        const exist = await this.like.findOne({where: {user_id: addLikeDto.user_id, userId: addLikeDto.userId}})

        if (exist)
            return 'Exist like'

        await this.like.save(addLikeDto)
        const concert = await this.concert_users.findOne({where: {concertId: addLikeDto.concertId}})
        concert.likesCount++;
        await this.concert_users.update(addLikeDto.concertId, concert)
        return {success: true}
    }

    async deleteLike(id: string): Promise<any> {
        return await this.like.delete(id)
    }


    async getLikes(): Promise<any> {
        return await this.like.find();
    }
}
