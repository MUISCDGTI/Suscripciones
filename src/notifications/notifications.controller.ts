import { Body, Controller, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import CreateNotificationDto from './dto/createNotification.dto';
import { AppService } from 'src/app.service';

const endpoint = process.env.HOST_BASE_URL;
@Controller(endpoint.concat('notifications'))
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly appService: AppService,
  ) {}

  @ApiResponse({
    status: 204,
    description: 'The notification has been created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiQuery({
    name: 'apikey',
    type: String,
    description: 'Autentication',
    required: true,
  })
  @Post()
  async notify(
    @Query('apikey') apikey: string,
    @Body() createNotificationDto: CreateNotificationDto,
    @Res() response?: Response,
  ) {
    if (await this.appService.verifyApiKey(apikey)) {
      const result = await this.notificationsService.notify(
        createNotificationDto,
      );
      if (result) {
        response?.status(HttpStatus.NO_CONTENT).send();
      } else {
        response?.status(HttpStatus.EXPECTATION_FAILED).send();
      }
    } else {
      response?.status(HttpStatus.FORBIDDEN).send();
    }
    return;
  }
}
