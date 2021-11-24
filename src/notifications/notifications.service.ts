import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import CreateNotificationDto from './dto/createNotification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  notify(suscription: CreateNotificationDto): Promise<boolean> {
    //TODO
    const a = this.send({ email: 'alvaronavarromora3@gmail.com', subject: 'test', name: 'Álvaro', customMessage: 'Prueba de concepto'});
    return Promise.resolve(a);
  }

  async send({ email: to, subject, name, customMessage }): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        context: {
          name,
          customMessage,
        },
        text: customMessage,
      });
      return Promise.resolve(true);
    } catch (error) {
      console.error(`Error sending email to ${to}. `, error);
      return Promise.reject(false);
    }
  }
  
}
