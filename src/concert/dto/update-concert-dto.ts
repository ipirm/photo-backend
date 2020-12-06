import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateConcertDto {

    @ApiProperty({ example: 'Grigoria Leps', description: 'The title of Concert' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Concert created and songs Grigoria Leps', description: 'The description of Concert' })
    @IsString()
    description: string;

    @ApiProperty({ example: '15.11.2020', description: 'The startDate of Concert' })
    @IsString()
    startDate: string;

    @ApiProperty({ example: '16.11.2020', description: 'The endDate of Concert' })
    @IsString()
    endDate: string;

    @ApiProperty({ example: '16.11.2020', description: 'The endDate of Concert' })
    total: string;
    concertsUsers: Array<any>
}