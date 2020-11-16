import {Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {VoiceService} from "./voice.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AddVoiceDto} from "./dto/add-voice-dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {imageFileFilter} from "../helpers/check-file-type";
import {editFileName} from "../helpers/edit-file-name";
import {editFilePath} from "../helpers/change-file-path";

@ApiTags('Voice or Participation')
@Controller('voice')
export class VoiceController {
    constructor(private voice: VoiceService) {
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
    @ApiOperation({summary: 'Add voice to concert'})
    addVoiceToConcert(@UploadedFiles() files, @Body() addVoiceDto: AddVoiceDto): Promise<any> {
        return this.voice.addVoiceToConcert(addVoiceDto, files)
    }


    @Post('delete')
    @ApiOperation({summary: 'Delete voice to concert'})
    deleteVoiceToConcert(@Body() addVoiceDto: AddVoiceDto): Promise<any> {
        return this.voice.deleteVoiceToConcert(addVoiceDto)
    }

}
