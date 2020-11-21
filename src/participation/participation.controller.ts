import {Body, Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ParticipationService} from "./participation.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AddParticipationDto} from "./dto/add-participation-dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {imageFileFilter} from "../helpers/check-file-type";
import {editFileName} from "../helpers/edit-file-name";
import {editFilePath} from "../helpers/change-file-path";


@ApiTags('Participation')
@Controller('participation')
export class ParticipationController {
    constructor(private voice: ParticipationService) {
    }

    @Post('/')
    @UseInterceptors(FilesInterceptor('files', 5, {
            storage: diskStorage({
                path: editFilePath,
                destination: './uploads',
                filename: editFileName,
            }),

            fileFilter: imageFileFilter,
        }
    ))
    @ApiOperation({summary: 'Add participation to concert'})
    addVoiceToConcert(@UploadedFiles() files, @Body() addParticipationDto: AddParticipationDto): Promise<any> {
        return this.voice.addVoiceToConcert(addParticipationDto, files)
    }


    @Post('delete')
    @ApiOperation({summary: 'Delete participation in concert'})
    deleteVoiceToConcert(@Body() addParticipationDto: AddParticipationDto): Promise<any> {
        return this.voice.deleteVoiceToConcert(addParticipationDto)
    }

}
