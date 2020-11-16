import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'Ilham', description: 'name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Pirmammadov', description: 'last_name' })
    @IsString()
    last_name: string;

    @ApiProperty({ example: 'ilham.pirm@gmail.com', description: 'email' })
    @IsString()
    email: string;

    @ApiProperty({ example: '554454641', description: 'password' })
    @IsString()
    password: string;


    @ApiProperty({ example: 'man', description: 'gender' })
    @IsString()
    gender: string;

    @ApiProperty({ example: '151212', description: 'facebook_id' })
    @IsString()
    facebook_id: number;

    @ApiProperty({ example: 'avatar.png', description: 'avatar' })
    @IsString()
    avatar: string;

}