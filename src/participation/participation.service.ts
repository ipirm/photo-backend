import {Injectable} from '@nestjs/common';
import {AddParticipationDto} from "./dto/add-participation-dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";

@Injectable()
export class ParticipationService {
    constructor(
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>
    ) {
    }

    // Учавствовать в конкурсе !
    async addVoiceToConcert(addParticipationDto: AddParticipationDto, files): Promise<any> {
        const {concertId, userId} = addParticipationDto;
        const exist = await this.concert_users.find({where: {concertId: concertId, userId: userId}});
        if (exist.length)
            return `This user exist in ${concertId} concert`;

        if (files.length) {
            const images = files.map((item) => {
                return {name: item.filename, url: `${process.env.FILE_URL}/${item.filename}`}
            })
            Object.assign(addParticipationDto, {images: images})
        }

        await this.concert_users.save(addParticipationDto);
        return files
    }

    // Удалить участие из конкурса
    async deleteVoiceToConcert(addParticipationDto: AddParticipationDto): Promise<any> {
        const {concertId, userId} = addParticipationDto;
        return await this.concert_users.delete({concertId: concertId, userId: userId});
    }

}
