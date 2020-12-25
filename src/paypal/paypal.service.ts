import {InjectPaypal} from "nestjs-paypal-payouts/dist";


export class PaypalService {
    constructor(
        @InjectPaypal()
        private readonly paypalClient,
        @InjectPaypal()
        private readonly paypal,
    ) {
    }

    async payout() {
        const request =  new this.paypal.payouts.PayoutsPostRequest();
        request.requestBody({
            sender_batch_header: {
                recipient_type: "EMAIL",
                email_message: "SDK payouts test txn",
                note: "Enjoy your Payout!!",
                sender_batch_id: "Test_sdk_1",
                email_subject: "This is a test transaction from SDK"
            },
            items: [{
                note: "Your 5$ Payout!",
                amount: {
                    currency: "USD",
                    value: "1.00"
                },
                receiver: "payout-sdk-1@paypal.com",
                sender_item_id: "Test_txn_1",
                redirect_urls: {
                    return_url: "https://photo-backend-app.herokuapp.com",
                    cancel_url: "https://photo-backend-app.herokuapp.com"
                }
            }]
        });
          console.log(this.paypalClient)
        let response = await this.paypalClient.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
        console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
    }
}