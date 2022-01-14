import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from 'src/enums/categories';
import { SuscriptionsService } from 'src/suscriptions/suscriptions.service';
import CreateNotificationDto from './dto/createNotification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly suscriptionsService: SuscriptionsService,
  ) {}

  async notify(notification: CreateNotificationDto): Promise<boolean> {
    const subscribers = await this.suscriptionsService.findAll('', notification.topic, notification.type);
    var messagesSent = true;
    for ( var subscriber of subscribers){
      if (! await this.send({ email: subscriber.mail, subject: subscriber.subject, name: "TODO NOMBRE", customMessage: 'TODO MENSAJE'})){
        messagesSent = false;
      }
    }
    
    return Promise.resolve(messagesSent);
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
