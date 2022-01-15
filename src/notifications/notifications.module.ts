import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { SuscriptionsService } from 'src/suscriptions/suscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from 'src/suscriptions/suscription.entity';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE || false,
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      },
    }),
    TypeOrmModule.forFeature([Suscription])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, SuscriptionsService],
})
export class NotificationsModule {}
