import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

import {PaypalService} from "./paypal.service";

@ApiTags('Paypal')
@Controller('paypal')
export class PaypalController {
    constructor(private paypal: PaypalService) {
    }

    @Get('/')
    getPay(): any {
        return this.paypal.payout()
    }
}
