import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {Repository} from "typeorm";
import {UpdateConcertDto} from "./dto/update-concert-dto";
import {CreateConcertDto} from "./dto/create-concert-dto";
import {AddVoiceDto} from "./dto/add-voice-dto";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";

@Injectable()
export class ConcertService {
    constructor(
        @InjectRepository(ConcertsEntity) private readonly concert: Repository<ConcertsEntity>,
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>
    ) {
    }

    async getAllConcerts(): Promise<any> {
        return await this.concert.find()
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

    async addVoiceToConcert(addVoiceDto: AddVoiceDto): Promise<any> {
        let concertVoice:any = this.concert.findOne(addVoiceDto.concertId);
         let userVoice = this.concert.findOne(addVoiceDto.userId);
        concertVoice.concertsUsers = [addVoiceDto.userId]
        return await this.concert.find({relations: ["concertsUsers"]});
    }

}
