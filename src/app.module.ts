import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { Suscription } from './suscriptions/suscription.entity';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb+srv://rottenPotatoes:r0tt3nP0T4T03S@rottenpotatoes.jsp4d.mongodb.net/RottenPotatoes?retryWrites=true&w=majority",
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
      entities: [Suscription],
      synchronize: true,
    }),
    SuscriptionsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
