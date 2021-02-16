import {Injectable} from '@nestjs/common';

import {MailerService} from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

}
// Username:	info@beautybattle.net
// Password:	Use the email account’s password.
//     Incoming Server:	mail.beautybattle.net
// IMAP Port: 993 POP3 Port: 995
// Outgoing Server:	mail.beautybattle.net
// SMTP Port: 465