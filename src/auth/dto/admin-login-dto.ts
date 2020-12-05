import {ApiProperty} from "@nestjs/swagger";

export class AdminLoginDto {
    @ApiProperty({ example: 'ilham.pirm@gmail.com', description: 'email' })
    email: string;

}