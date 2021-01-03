import {Controller, Get, Query, Res, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
//
// const paypal = require('@paypal/checkout-server-sdk');
// import {PaypalService} from "./paypal.service";
// import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
// import {User} from "../decorators/user.decorator";
//
// ;
//
@ApiTags('Paypal')
@Controller('paypal')
export class PaypalController {
//     constructor(private paypalService: PaypalService) {
//     }
//
//     // @UseGuards(JwtAuthGuard)
//     @Get('/')
//     async getPay(@Res() res, @User() user: any): Promise<void> {
//
// // Creating an environment
//         let clientId = process.env.PAYPAL_CLIENT_ID;
//         let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
// // This sample uses SandboxEnvironment. In production, use LiveEnvironment
//         let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
//         let client = new paypal.core.PayPalHttpClient(environment);
//
//         let request = new paypal.orders.OrdersCreateRequest();
//         request.requestBody({
//             "intent": "CAPTURE",
//             "purchase_units": [
//                 {
//                     "amount": {
//                         "currency_code": "USD",
//                         "value": "100.00"
//                     }
//                 }
//             ]
//         });
//
// // Call API with your client and get a response for your call
//         let createOrder  = async function(){
//             let response = await client.execute(request);
//             // console.log(`Response: ${JSON.stringify(response)}`);
//             // If call returns body in response, you can get the deserialized version from the result attribute of the response.
//             // console.log(`Order: ${JSON.stringify(response.result)}`);
//             for (let i = 0; i < response.result.links.length; i++) {
//                 if (response.result.links[i].rel === 'approve') {
//                     console.log(response.result.links)
//
//                  return res.redirect(response.result.links[i].href)
//                 }
//             }
//             }
//         createOrder();
//
//         // return true
//     }
//
//     @Get('/success')
//     async getSuccess(
//         @Query('user_id') user_id: string,
//         @Query('payerId') payerId: string,
//         @Query('paymentId') paymentId: string,
//         @Res() res
//     ): Promise<any> {
//         const execute_payment_json = {
//             "payer_id": payerId,
//             "transactions": [{
//                 "amount": {
//                     "currency": "USD",
//                     "total": `${process.env.PRICE}.00`
//                 }
//             }]
//         };
//
//         paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
//             if (error) {
//                 console.log(error.response);
//                 res.redirect(`${process.env.FRONT_URL}/?paypal_success=false`)
//             } else {
//                 await this.paypalService.giveMoney(user_id)
//                 res.redirect(`${process.env.FRONT_URL}/?paypal_success=true`)
//             }
//         });
//     }
//
//     @Get('/cancel')
//     async getCancel(@Query('user_id') user_id: string, @Res() res): Promise<any> {
//         await this.paypalService.getMoney(user_id)
//         return res.redirect(`${process.env.FRONT_URL}/?paypal_success=false`)
//     }
}
