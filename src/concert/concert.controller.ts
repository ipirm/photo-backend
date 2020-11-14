import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ConcertService} from "./concert.service";
import {CreateConcertDto} from "./dto/create-concert-dto";
import {UpdateConcertDto} from "./dto/update-concert-dto";
import {ApiTags, ApiOperation} from "@nestjs/swagger";
import {AddVoiceDto} from "./dto/add-voice-dto";


@ApiTags('Concerts')
@Controller('concerts')

export class ConcertController {
    constructor(private concert: ConcertService) {
    }

    @Get('/')
    @ApiOperation({summary: 'Get all concerts'})
    getAllConcerts(): Promise<any[]> {
        return this.concert.getAllConcerts();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get concert by id'})
    findConcert(@Param('id') id: string): Promise<any[]> {
        return this.concert.findConcert(id);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete concert by id'})
    deleteConcert(@Param('id') id: string): Promise<any> {
        return this.concert.deleteConcert(id);
    }

    @Post()
    @ApiOperation({summary: 'Create concert'})
    createConcert(@Body() createConcertDto: CreateConcertDto): Promise<any> {
        return this.concert.createConcert(createConcertDto);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update concert'})
    updateConcert(@Param('id') id: string, @Body() updateConcertDto: UpdateConcertDto): Promise<any> {
        return this.concert.updateConcert(id, updateConcertDto);
    }


    @Post('voice')
    @ApiOperation({summary: 'Add voice to concert'})
    addVoiceToConcert(@Body() addVoiceDto: AddVoiceDto): Promise<any> {
        return this.concert.addVoiceToConcert(addVoiceDto)
    }
}
