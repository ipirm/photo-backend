import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {Repository} from "typeorm";
import {UpdateConcertDto} from "./dto/update-concert-dto";
import {CreateConcertDto} from "./dto/create-concert-dto";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {paginate} from "nestjs-typeorm-paginate";

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

    async findConcertUsers({id, with_users, page, limit}): Promise<any> {

        const data = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .leftJoinAndSelect("concertUsers.user", "user")
            .leftJoinAndSelect("user.likes", "likes", "likes.concertId = :concertId OR likes IS NULL", {concertId: id})
            .orderBy('concertUsers.likesCount', 'ASC')

        if (with_users)
            return paginate<ConcertsUsersEntity>(data, {page, limit})

        return {
            ...await this.concert.findOne(id),
        }
    }

    async findConcert(id): Promise<any> {
        return await this.concert.findOne(id)
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
