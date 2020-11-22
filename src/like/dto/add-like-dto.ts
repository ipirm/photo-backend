
import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddLikeDto {
    @ApiProperty({example: '1', description: 'ID of user liked'})
    @IsNotEmpty()
    @IsString()
    user_id: number;

    @ApiProperty({example: 'eldar', description: 'Liked name'})
    name: string;

    @ApiProperty({example: 'eldar@at.ru', description: 'Liked email'})
    email: string;

    @ApiProperty({example: '1', description: 'User who like ID'})
    @IsNotEmpty()
    userId: number;

    @ApiProperty({example: '1', description: 'Concert ID'})
    @IsNotEmpty()
    concertId: number;

    @ApiProperty({example: '1', description: 'ConcertUsers ID'})
    @IsNotEmpty()
    concertUsersId: number;
}