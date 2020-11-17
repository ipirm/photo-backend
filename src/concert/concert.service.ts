import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {Repository} from "typeorm";
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
        const voices = await this.concert.createQueryBuilder('concert')
            .where("concert.id = :id", {id: id})
            .leftJoinAndSelect("concert.concertsUsers", "user")
            .where("user.voice = :voice", {voice: true})
            .orderBy("user.id", "ASC")
            .getCount();

        const participation  = await this.concert.createQueryBuilder('concert')
            .where("concert.id = :id", {id: id})
            .leftJoinAndSelect("concert.concertsUsers", "user")
            .where("user.voice = :voice", {voice: false})
            .orderBy("user.id", "ASC")
            .getCount();

        const data = await this.concert.createQueryBuilder('concert')
            .where("concert.id = :id", {id: id})
            .innerJoinAndSelect("concert.concertsUsers", "users")
            .getMany();
        if (with_users)
            return {
                ...data,
                voices: voices,
                participation: participation
            }


        return {
            ...await this.concert.findOne(id),
            voices: voices,
            participation: participation
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
