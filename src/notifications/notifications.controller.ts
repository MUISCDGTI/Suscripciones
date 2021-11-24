import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { NotificationsService } from './notifications.service';
import CreateNotificationDto from './dto/createNotification.dto';

const endpoint = process.env.HOST_BASE_URL;
@Controller(endpoint.concat('notifications'))
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiResponse({
    status: 204,
    description: 'The notification has been created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post()
  async notify(
    @Body() createNotificationDto: CreateNotificationDto,
    @Res() response?: Response,
  ) {
    const result =  await this.notificationsService.notify(createNotificationDto);
    if (result){
      response?.status(HttpStatus.NO_CONTENT).send();
    }else{
      response?.status(HttpStatus.EXPECTATION_FAILED).send();
    }
    return;
  }

}
