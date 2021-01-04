import {
    Body,
    Controller,
    Param,
    Req,
    Post,
    Put,
    UploadedFiles,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ParticipationService} from "./participation.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AddParticipationDto} from "./dto/add-participation-dto";
import {FilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {imageFileFilter} from "../helpers/check-file-type";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {User} from "../decorators/user.decorator";

@ApiTags('Participation')
@Controller('participation')
export class ParticipationController {
    constructor(private participation: ParticipationService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @UseInterceptors(FilesInterceptor('files', 6, {
            fileFilter: imageFileFilter,
        }
    ))

    @ApiOperation({summary: 'Add participation to concert'})
    addParticipationToConcert(
        @UploadedFiles() files,
        @Body() addParticipationDto: AddParticipationDto,
        @User() user: any,
    ): Promise<any> {
        return this.participation.addParticipationToConcert(addParticipationDto, files, user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    @ApiOperation({summary: 'Delete participation in concert'})
    deleteParticipationFromConcert(
        @Body() addParticipationDto: AddParticipationDto,
        @User() user: any,
    ): Promise<any> {
        return this.participation.deleteParticipationFromConcert(addParticipationDto, user)
    }

    @Put('approve/:id')
    @ApiOperation({summary: 'Approve concert'})
    approveConcert(@Param('id') id: string) {
        return this.participation.approveConcertUser(id)
    }

}
