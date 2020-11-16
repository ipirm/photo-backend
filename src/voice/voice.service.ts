import {Injectable} from '@nestjs/common';
import {AddVoiceDto} from "./dto/add-voice-dto";
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
    async addVoiceToConcert(addVoiceDto: AddVoiceDto, files): Promise<any> {
        const {concertId, userId} = addVoiceDto;
        const exist = await this.concert_users.find({where: {concertId: concertId, userId: userId}});
        if (exist.length)
            return `This user exist in ${concertId} concert`;

        if (files.length) {
            const images = files.map((item) => {
                return {name: item.originalname, url: `${process.env.FILE_URL}/${item.filename}`}
            })
            Object.assign(addVoiceDto,{images: images})
        }

        await this.concert_users.save(addVoiceDto);
        return true
    }

    // Удалить голос или участие
    async deleteVoiceToConcert(addVoiceDto: AddVoiceDto): Promise<any> {
        const {concertId, userId} = addVoiceDto;
        return await this.concert_users.delete({concertId: concertId, userId: userId});
    }


}
