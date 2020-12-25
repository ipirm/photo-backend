import {Module} from '@nestjs/common';
import {NestjsPaypalPayoutsModule} from "nestjs-paypal-payouts/dist";
import {PaypalService} from "./paypal.service";
import {PaypalController} from "./paypal.controller";

@Module({
    imports: [
        NestjsPaypalPayoutsModule.register({
            environment: 'sandbox',
            clientId: process.env.PAYPAL_CLIENT_ID,
            clientSecret: process.env.PAYPAL_CLIENT_SECRET
        }),
    ],
    providers: [PaypalService],
    controllers: [PaypalController]
})
export class PaypalModule {
}