import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LikesEntity} from "../entities/likes.entity";
import {AddLikeDto} from "./dto/add-like-dto";
@Injectable()
export class LikeService{
    constructor(
        @InjectRepository(LikesEntity) private readonly like: Repository<LikesEntity>
    ) {}

    async addLike(addLikeDto:AddLikeDto): Promise<any>{
        const exist = await this.like.findOne({user_id: addLikeDto.user_id} && {userId: addLikeDto.userId})
        if(exist)
            return 'Exist like'

        return await this.like.save(addLikeDto)
    }

    async deleteLike(id:string): Promise<any>{
        return await this.like.delete(id)
    }


    async getLikes(): Promise<any> {
        return await this.like.find();
    }
}
