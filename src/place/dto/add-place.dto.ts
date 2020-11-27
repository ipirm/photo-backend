import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddPlaceDto {
    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    @IsString()
    concertId: number;

    @ApiProperty({example: 'example palce name', description: 'Name Place'})
    @IsString()
    name: string;


    @ApiProperty({example: 'en name example', description: 'En Name Place'})
    @IsString()
    name__en: string;

    @ApiProperty({example: '1000', description: 'total balance'})
    @IsString()
    total: string;
}