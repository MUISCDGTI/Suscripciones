import { Injectable } from '@nestjs/common';

@Injectable()
export class SuscriptionsService {
  getHello(): string {
    return 'Hello World!!';
  }
}
