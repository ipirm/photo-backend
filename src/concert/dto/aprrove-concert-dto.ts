
import {ApiProperty} from "@nestjs/swagger";

export class AprroveConcertDto {

    @ApiProperty({ example: 'false', description: 'Aprove or Un ' })
    approve: boolean;
}