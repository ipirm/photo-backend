import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SearchDto {

    @ApiProperty({example: 'ilham', description: 'Name'})
    @IsString()
    id: string;

    @ApiProperty({example: 'Last name', description: 'Last name'})
    @IsString()
    search: string;

}