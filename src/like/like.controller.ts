import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {LikeService} from "./like.service";
import {AddLikeDto} from "./dto/add-like-dto";


@ApiTags('Likes')
@Controller('like')
export class LikeController {
    constructor(private like: LikeService) {
    }


    @Post('/')
    @ApiOperation({summary: 'Add like to concert'})
    async addVoiceToConcert(@Body() addLikeDto: AddLikeDto): Promise<any> {
        return await this.like.addLike(addLikeDto)
    }

    @Get('/')
    @ApiOperation({summary: 'Get all likes'})
    async getLikes(): Promise<any> {
        return await this.like.getLikes()
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete like by id'})
    deleteConcert(@Param('id') id: string): Promise<any> {
        return this.like.deleteLike(id);
    }


    // @Post('delete')
    // @ApiOperation({summary: 'Delete participation to concert'})
    // deleteVoiceToConcert(@Body() addVoiceDto: AddParticipationDto): Promise<any> {
    //     return this.like.deleteVoiceToConcert(addVoiceDto)
    // }

    //
    // @Post()
    // @ApiOperation({summary: 'Like the user in concert'})
    // likeVoiceToConcert(@Body() addLikeDto: AddLikeDto): Promise<any> {
    //
    //     return this.participation.likeVoiceToConcert(addLikeDto)
    // }


}
