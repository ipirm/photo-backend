import {IsString} from 'class-validator';

export class UpdateConcertDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    startDate: string;

    @IsString()
    endDate: string;
}