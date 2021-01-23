import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {User} from "../decorators/user.decorator";
import {UpdateUserAdminDto} from "./dto/update-user-admin-dto";

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

    @UseGuards(JwtAuthGuard)
    @Put('/edit')
    @ApiOperation({summary: 'Update user'})
    async updateConcert(@Body() createUserDto: CreateUserDto, @User() user: any): Promise<any> {
        return await this.user.updateUser(createUserDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: any, @UploadedFile() file: any, @User() user: any) {
        return this.user.uploadPublicFile(file, user);
    }

    @Put('/admin/:id')
    @ApiOperation({summary: 'Make user Admin'})
    async updateUserAdmin(@Body() updateAdminUser: UpdateUserAdminDto, @Param('id') id: string): Promise<any> {
        return await this.user.updateAdminUser(updateAdminUser, id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/accept-rules/true')
    acceptRules(@User() user: any): Promise<any> {
        return this.user.acceptRules(user);
    }

}
