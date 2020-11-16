import {Body, Controller, Post} from '@nestjs/common';
import {VoiceService} from "./voice.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AddVoiceDto} from "../concert/dto/add-voice-dto";

@ApiTags('Voice or Participation')
@Controller('voice')
export class VoiceController {
    constructor(private voice: VoiceService) {
    }

    @Post('/')
    @ApiOperation({summary: 'Add voice to concert'})
    addVoiceToConcert(@Body() addVoiceDto: AddVoiceDto): Promise<any> {
        return this.voice.addVoiceToConcert(addVoiceDto)
    }


    @Post('delete')
    @ApiOperation({summary: 'Delete voice to concert'})
    deleteVoiceToConcert(@Body() addVoiceDto: AddVoiceDto): Promise<any> {
        return this.voice.deleteVoiceToConcert(addVoiceDto)
    }
}
