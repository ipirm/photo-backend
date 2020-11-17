import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ConcertService} from "./concert.service";
import {CreateConcertDto} from "./dto/create-concert-dto";
import {UpdateConcertDto} from "./dto/update-concert-dto";
import {ApiTags, ApiOperation} from "@nestjs/swagger";


@ApiTags('Concerts')
@Controller('concerts')

export class ConcertController {
    constructor(private concert: ConcertService) {
    }

    @Get('/')
    @ApiOperation({summary: 'Get all concerts'})
    getAllConcerts(@Query('with_users') with_users): Promise<any[]> {
        return this.concert.getAllConcerts(with_users);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get concert by id'})
    findConcert(@Param('id') id: string,@Query('with_users') with_users: boolean): Promise<any[]> {
        return this.concert.findConcert(id,with_users);
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

}
