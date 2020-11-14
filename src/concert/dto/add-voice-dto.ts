import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddVoiceDto {
    @ApiProperty({example: '1', description: 'ID of user'})
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    @IsString()
    concertId: string;

    @ApiProperty({example: 'true', description: 'Voice or Participation'})
    @IsNotEmpty()
    @IsBoolean()
    voice: boolean;

}