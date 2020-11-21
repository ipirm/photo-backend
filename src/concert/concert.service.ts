import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {LessThan, Repository} from "typeorm";
import {UpdateConcertDto} from "./dto/update-concert-dto";
import {CreateConcertDto} from "./dto/create-concert-dto";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";

@Injectable()
export class ConcertService {
    constructor(
        @InjectRepository(ConcertsEntity) private readonly concert: Repository<ConcertsEntity>,
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>
    ) {
    }

    async getAllConcerts(with_users): Promise<any> {
        if (with_users)
            return await this.concert.find({relations: ["concertsUsers"], order: {id: "ASC"}});

        return await this.concert.find({order: {id: "ASC"}})
    }

    async findConcert(id, with_users): Promise<any> {

        const data = await this.concert.createQueryBuilder('concert')
            .where("concert.id = :id", {id: id})
            .leftJoinAndSelect("concert.concertsUsers", "concertsUsers")
            .leftJoinAndSelect("concertsUsers.user", "user")
            .loadRelationCountAndMap('user.likesCount', 'user.likes')
            .orderBy('user.likesCount','DESC')
            .leftJoinAndSelect("user.likes", "likes")
            // .andWhere("likes IS NULL")
            // .orWhere("likes.concertId = :concertId", {concertId: id})
            .getOne()
        // 2.3
        // 3.2
        if (with_users)
            return {
                ...data
            }

        return {
            ...await this.concert.findOne(id),
        }
    }

    async deleteConcert(id): Promise<any> {
        return await this.concert.delete(id)
    }

    async createConcert(createConcertDto: CreateConcertDto): Promise<any> {
        return await this.concert.save(createConcertDto);
    }

    async updateConcert(id, updateConcertDto: UpdateConcertDto): Promise<any> {
        return await this.concert.update(id, updateConcertDto)
    }


}
