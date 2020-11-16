import {Controller, Get, Param, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Global Routes')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('uploads/:imgpath')
  @ApiOperation({summary: 'Get images by path'})
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
