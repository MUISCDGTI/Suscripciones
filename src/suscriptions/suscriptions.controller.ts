import { Controller, Get } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';

@Controller()
export class SuscriptionsController {
  constructor(private readonly suscriptionsService: SuscriptionsService) {}

  @Get()
  getHello(): string {
    return this.suscriptionsService.getHello();
  }
}
