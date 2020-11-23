
import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddLikeDto {

    @ApiProperty({example: '1', description: 'User who like ID'})
    @IsNotEmpty()
    userId: number;

    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    concertId: number;

}