import {Injectable} from '@nestjs/common';
import {AddVoiceDto} from "../concert/dto/add-voice-dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {Repository} from "typeorm";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";

@Injectable()
export class VoiceService {
    constructor(
        @InjectRepository(ConcertsEntity) private readonly concert: Repository<ConcertsEntity>,
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>
    ) {
    }

    // Голосовать и учавствовать !
    async addVoiceToConcert(addVoiceDto: AddVoiceDto): Promise<any> {
        const {concertId, userId} = addVoiceDto;
        const exist = await this.concert_users.find({where: {concertId: concertId, userId: userId}});
        if (exist.length)
            return `This user exist in ${concertId} concert`;

        await this.concert_users.save(addVoiceDto);
        return true
    }

    // Удалить голос или участие
    async deleteVoiceToConcert(addVoiceDto: AddVoiceDto): Promise<any> {
        const {concertId, userId} = addVoiceDto;
        return await this.concert_users.delete({concertId: concertId, userId: userId});
    }
}
