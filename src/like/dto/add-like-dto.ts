
import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddLikeDto {
    @ApiProperty({example: '1', description: 'ID of user'})
    @IsNotEmpty()
    @IsString()
    user_id: number;

    @ApiProperty({example: 'eldar', description: 'Concert ID'})
    name: string;

    @ApiProperty({example: 'eldar@at.ru', description: 'Concert ID'})
    email: string;

    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    userId: number;

    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    concertId: number;
}