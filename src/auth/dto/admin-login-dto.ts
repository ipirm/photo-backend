import {ApiProperty} from "@nestjs/swagger";

export class AdminLoginDto {
    @ApiProperty({ example: 'ilham.pirm@gmail.com', description: 'email' })
    email: string;


    @ApiProperty({ example: '42432432432432432', description: 'password' })
    password: string;
}