import {IsEnum, IsOptional, IsString, Matches, NotEquals} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

enum Roles {
    Admin = 'admin',
    User = 'user',
}

export class CreateUserDto {
    @ApiProperty({example: 'Ilham', description: 'name'})

    name: string;

    @ApiProperty({example: 'Baku', description: 'city'})
    city: string;

    @ApiProperty({example: 'England', description: 'country'})

    country: string;

    @ApiProperty({example: 'Pirmammadov', description: 'last_name'})
    last_name: string;

    @ApiProperty({example: 'ilham.pirm@gmail.com', description: 'email'})
    email: string;

    @ApiProperty({example: '554454641', description: 'password'})
    password: string;


    @ApiProperty({example: 'man', description: 'gender'})
    gender: string;

    @ApiProperty({example: '151212', description: 'facebook_id'})
    facebook_id: number;

    @ApiProperty({example: '151212', description: 'vk_id'})
    vk_id: number;

    @ApiProperty({example: '151212', description: 'google_id'})
    google_id: number;

    @ApiProperty({example: 'avatar.png', description: 'avatar'})
    avatar: string;

    @IsEnum(Roles)
    public role?: Roles;

}