import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {LikeService} from "./like.service";
import {AddLikeDto} from "./dto/add-like-dto";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {User} from "../decorators/user.decorator";


@ApiTags('Likes')
@Controller('like')
export class LikeController {
    constructor(private like: LikeService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @ApiOperation({summary: 'Add like to concert'})
    async addVoiceToConcert(@Body() addLikeDto: AddLikeDto, @User() user: any): Promise<any> {
        return await this.like.addLike(addLikeDto, user)
    }

    @Get('/')
    @ApiOperation({summary: 'Get all likes'})
    async getLikes(): Promise<any> {
        return await this.like.getLikes()
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    @ApiOperation({summary: 'Delete like by id'})
    deleteConcert(@Body() addLikeDto: AddLikeDto, @User() user: any): Promise<any> {
        return this.like.deleteLike(addLikeDto, user);
    }

}
