import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddParticipationDto {
    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    @IsString()
    concertId: number;

}