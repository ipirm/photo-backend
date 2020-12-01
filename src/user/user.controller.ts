import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user-dto";

@ApiTags('Users')
@Controller('user')

export class UserController {
    constructor(private user: UserService) {
    }

    @Get('/')
    @ApiOperation({summary: 'Get all Users'})
    async getAllConcerts(): Promise<any[]> {
        return await this.user.getAllUser();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by id'})
    async findConcert(@Param('id') id: string): Promise<any[]> {
        return await this.user.findUser(id);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete user by id'})
    async deleteConcert(@Param('id') id: string): Promise<any> {
        return await this.user.deleteUser(id);
    }

    @Post()
    @ApiOperation({summary: 'Create user'})
    async createConcert(@Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.user.createUser(createUserDto);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update user'})
    async updateConcert(@Param('id') id: string, @Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.user.updateUser(id, createUserDto);
    }
}
