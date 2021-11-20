import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { Suscription } from './suscriptions/suscription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'db',
      port: 27017,
      username: 'up0',
      password: 'up0',
      entities: [Suscription],
      synchronize: true,
    }),
    SuscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
