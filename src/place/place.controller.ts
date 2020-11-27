import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {PlaceService} from "./place.service";
import {AddPlaceDto} from "./dto/add-place.dto";


@ApiTags('Places')
@Controller('place')
export class PlaceController {
    constructor(private place: PlaceService) {
    }

    @Post('/')
    @ApiOperation({summary: 'Add new Place'})
    async addVoiceToConcert(@Body() addPlaceDto: AddPlaceDto): Promise<any> {
        return await this.place.addPlace(addPlaceDto)
    }

    @Get('/')
    @ApiOperation({summary: 'Get all places'})
    async getLikes(): Promise<any> {
        return await this.place.getAllPlace()
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete place by id'})
    deleteConcert(@Param('id') id: string): Promise<any> {
        return this.place.removePlace(id);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get place by id'})
    findConcert(@Param('id') id: string): Promise<any[]> {
        return this.place.getOnePlace(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update place'})
    updateConcert(@Param('id') id: string, @Body() addPlaceDto: AddPlaceDto): Promise<any> {
        return this.place.updateUser(id, addPlaceDto);
    }
}