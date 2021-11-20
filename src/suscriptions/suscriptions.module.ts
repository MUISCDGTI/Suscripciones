import { Module } from '@nestjs/common';
import { SuscriptionsController } from './suscriptions.controller';
import { SuscriptionsService } from './suscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './suscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suscription])],
  controllers: [SuscriptionsController],
  providers: [SuscriptionsService],
})
export class AppModule {}
