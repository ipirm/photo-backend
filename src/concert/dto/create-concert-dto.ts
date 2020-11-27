import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateConcertDto {
    @ApiProperty({example: 'Grigoria Leps', description: 'The title of Concert'})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: 'Concert created and songs Grigoria Leps', description: 'The description of Concert'})
    @IsString()
    description: string;

    @ApiProperty({example: '15.11.2020', description: 'The startDate of Concert'})
    @IsString()
    startDate: string;

    @ApiProperty({example: '16.11.2020', description: 'The endDate of Concert'})
    @IsString()
    endDate: string;


    @ApiProperty({example: 'Eng title', description: 'Title English'})
    @IsString()
    title__en: string;

    @ApiProperty({example: 'Eng description', description: 'Title English'})
    @IsString()
    description__en: string;

}