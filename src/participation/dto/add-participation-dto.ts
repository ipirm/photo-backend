import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddParticipationDto {
    @ApiProperty({example: '1', description: 'ID of user'})
    @IsNotEmpty()
    @IsString()
    userId: number;

    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    @IsString()
    concertId: number;


    @ApiProperty({example: 'false', description: 'Come from moderation'})
    @IsNotEmpty()
    @IsBoolean()
    approve: boolean;


}