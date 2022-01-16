import { Module } from '@nestjs/common';
import { SuscriptionsController } from './suscriptions.controller';
import { SuscriptionsService } from './suscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './suscription.entity';
import { AppService } from 'src/app.service';

@Module({
  imports: [TypeOrmModule.forFeature([Suscription])],
  controllers: [SuscriptionsController],
  providers: [SuscriptionsService, AppService],
})
export class SuscriptionsModule {}
