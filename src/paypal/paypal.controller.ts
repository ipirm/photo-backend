import {Controller, Get, Query, Res, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

const paypal = require('paypal-rest-sdk');
import {PaypalService} from "./paypal.service";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {User} from "../decorators/user.decorator";

;

@ApiTags('Paypal')
@Controller('paypal')
export class PaypalController {
    constructor(private paypalService: PaypalService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getPay(@Res() res, @User() user: any): Promise<Boolean> {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `https://photo-backend-app.herokuapp.com/api/paypal/success?user_id=${user.id}`,
                "cancel_url": "https://photo-backend-app.herokuapp.com/api/paypal/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Contest",
                        "total": `${process.env.PRICE}.00`,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": `${process.env.PRICE}.00`
                },
                "description": "Participation in Contest"
            }]
        };
        await paypal.payment.create(create_payment_json, (error, payment) => {
            if (error)
                throw error

            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    return res.redirect(payment.links[i].href)
                }
            }
        });
        return true
    }

    @Get('/success')
    async getSuccess(
        @Query('user_id') user_id: string,
        @Query('payerId') payerId: string,
        @Query('paymentId') paymentId: string,
        @Res() res
    ): Promise<any> {
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": `${process.env.PRICE}.00`
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
            if (error) {
                console.log(error.response);
                res.redirect(`${process.env.FRONT_URL}/?paypal_success=false`)
            } else {
                await this.paypalService.giveMoney(user_id)
                res.redirect(`${process.env.FRONT_URL}/?paypal_success=true`)
            }
        });
    }

    @Get('/cancel')
    async getCancel(@Query('user_id') user_id: string, @Res() res): Promise<any> {
        await this.paypalService.getMoney(user_id)
        return res.redirect(`${process.env.FRONT_URL}/?paypal_success=false`)
    }
}
