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
    getAllConcerts(): Promise<any[]> {
        return this.user.getAllUser();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by id'})
    findConcert(@Param('id') id: string): Promise<any[]> {
        return this.user.findUser(id);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete user by id'})
    deleteConcert(@Param('id') id: string): Promise<any> {
        return this.user.deleteUser(id);
    }

    @Post()
    @ApiOperation({summary: 'Create user'})
    createConcert(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.user.createUser(createUserDto);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update user'})
    updateConcert(@Param('id') id: string, @Body() createUserDto: CreateUserDto): Promise<any> {
        return this.user.updateUser(id, createUserDto);
    }
}
