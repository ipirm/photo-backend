import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddVoiceDto {
    @ApiProperty({example: '1', description: 'ID of user'})
    @IsNotEmpty()
    @IsString()
    userId: number;

    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    @IsString()
    concertId: number;

    @ApiProperty({example: 'true', description: 'Voice or Participation'})
    @IsNotEmpty()
    @IsBoolean()
    voice: boolean;

}