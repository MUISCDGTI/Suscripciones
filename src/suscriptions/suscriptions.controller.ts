import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Suscription } from './suscription.entity';
import { SuscriptionsService } from './suscriptions.service';
import UpdateSuscriptionDto from './dto/updateSuscription.dto';
import CreateSuscriptionDto from './dto/createSuscription.dto';
import { Categories } from '../enums/categories';
import { AppService } from 'src/app.service';

const endpoint = process.env.HOST_BASE_URL || '';

@Controller(endpoint.concat('suscripciones'))
export class SuscriptionsController {
  constructor(
    private readonly suscriptionsService: SuscriptionsService,
    private readonly appService: AppService,
  ) {}
  @ApiResponse({
    status: 201,
    description: 'The suscription has been created successfully',
    type: Suscription,
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
  async createSuscription(
    @Body() createSuscriptionDto: CreateSuscriptionDto,
    @Query('apikey') apikey: string,
    @Res() response?: Response,
  ): Promise<Suscription> {
    if (await this.appService.verifyApiKey(apikey)) {
      response.status(HttpStatus.CREATED);
      response.send(await this.suscriptionsService.create(createSuscriptionDto));
    } else {
      response?.status(HttpStatus.FORBIDDEN).send();
      return;
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of suscriptions have been retrieved successfully',
    type: [Suscription],
  })
  @ApiQuery({
    name: 'email',
    type: String,
    description: 'An email to filter by',
    required: false,
  })
  @ApiQuery({
    name: 'category',
    enum: Categories,
    description: 'An category to filter by',
    required: false,
  })
  @ApiQuery({
    name: 'apikey',
    type: String,
    description: 'Autentication',
    required: true,
  })
  async getSuscriptions(
    @Query('email') email: string,
    @Query('category') category: Categories,
    @Query('apikey') apikey: string,
    @Res() response?: Response,
  ): Promise<Suscription[]> {
    if (await this.appService.verifyApiKey(apikey)) {
      response.status(HttpStatus.OK);
      response.send( await this.suscriptionsService.findAll(email, '', category));
      return;
    } else {
      response?.status(HttpStatus.FORBIDDEN).send();
      return;
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The suscription has been retrieved successfully',
    type: Suscription,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @ApiQuery({
    name: 'apikey',
    type: String,
    description: 'Autentication',
    required: true,
  })
  async getSuscription(
    @Param() params: Record<string, string>,
    @Query('apikey') apikey: string,
    @Res() response?: Response,
  ): Promise<Suscription> {
    if (await this.appService.verifyApiKey(apikey)) {
      response.status(HttpStatus.OK);
      response.send( await this.suscriptionsService.findOne(params.id));
      return;
    } else {
      response?.status(HttpStatus.FORBIDDEN).send();
      return;
    }
  }

  @ApiResponse({
    status: 204,
    description: 'The suscription has been deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @ApiQuery({
    name: 'apikey',
    type: String,
    description: 'Autentication',
    required: true,
  })
  @Delete(':id')
  async deleteSuscription(
    @Param() params: Record<string, string>,
    @Query('apikey') apikey: string,
    @Res() response?: Response,
  ) {
    const deleteResult = await this.suscriptionsService.remove(params.id);
    if (await this.appService.verifyApiKey(apikey) && deleteResult?.affected === 0) {
      if (deleteResult?.affected === 0)
        response?.status(HttpStatus.NOT_FOUND).send();

      response?.status(HttpStatus.NO_CONTENT).send();
    } else {
      response?.status(HttpStatus.FORBIDDEN).send();
      return;
    }

    return;
  }

  @ApiResponse({
    status: 200,
    description: 'The suscription has been updated successfully',
    type: Suscription,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @ApiQuery({
    name: 'apikey',
    type: String,
    description: 'Autentication',
    required: true,
  })
  @HttpCode(200)
  @Put(':id')
  async updateSuscription(
    @Body() updateSuscriptionDto: UpdateSuscriptionDto,
    @Param() params: Record<string, string>,
    @Query('apikey') apikey: string,
    @Res() response?: Response,
  ): Promise<Suscription> {
    if (await this.appService.verifyApiKey(apikey)) {

      response.status(HttpStatus.OK);
      response.send( await this.suscriptionsService.update(
        updateSuscriptionDto,
        params.id,
      ));
      return;

    } else {
      response?.status(HttpStatus.FORBIDDEN).send();
      return;
    }
  }
}
