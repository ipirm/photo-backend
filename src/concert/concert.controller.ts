import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ConcertService} from "./concert.service";
import {CreateConcertDto} from "./dto/create-concert-dto";
import {UpdateConcertDto} from "./dto/update-concert-dto";
import {ApiTags, ApiOperation} from "@nestjs/swagger";
import {User} from "../decorators/user.decorator";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";


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


    @UseGuards(JwtAuthGuard)
    @Get('concertUsers/:id')
    @ApiOperation({summary: 'Get concert users by concertId with token'})
    findConcertUsers(
        @User() user: any,
        @Param('id') id: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sort_by') sort_by: string = null,
        @Query('linkID') linkID: number=100000000
    ): Promise<any[]> {
        limit = limit > 100 ? 100 : limit;
        return this.concert.findConcertUsers({id, page, limit, user, sort_by, linkID});
    }

    @Get('concertUsersWithOutAuth/:id')
    @ApiOperation({summary: 'Get concert users by concertId without token'})
    findConcertUsersWithOutAuth(
        @User() user: any,
        @Param('id') id: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sort_by') sort_by: string = null,
        @Query('linkID') linkID: number=100000000
    ): Promise<any[]> {
        limit = limit > 100 ? 100 : limit;

        return this.concert.findConcertUsers({id, page, limit, user, sort_by,linkID});
    }

    @Get(':id')
    @ApiOperation({summary: 'Get concert by id'})
    findConcert(@Param('id') id: string,): Promise<any> {
        return this.concert.findConcert(id)
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

    @Get('search/data')
    @ApiOperation({summary: 'Search Concert'})
    searchConcert(
        @Query('id') id: number = 1,
        @Query('search') search: string = null,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sort_by') sort_by: string = null
    ): Promise<any> {
        limit = limit > 100 ? 100 : limit;
        return this.concert.searchConcert(id, search, page, limit, sort_by);
    }
}
