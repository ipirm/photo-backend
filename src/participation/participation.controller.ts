import {Body, Controller, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ParticipationService} from "./participation.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AddVoiceDto} from "./dto/add-voice-dto";
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
    addVoiceToConcert(@UploadedFiles() files, @Body() addVoiceDto: AddVoiceDto): Promise<any> {
        return this.voice.addVoiceToConcert(addVoiceDto, files)
    }


    @Post('delete')
    @ApiOperation({summary: 'Delete participation in concert'})
    deleteVoiceToConcert(@Body() addVoiceDto: AddVoiceDto): Promise<any> {
        return this.voice.deleteVoiceToConcert(addVoiceDto)
    }

}
