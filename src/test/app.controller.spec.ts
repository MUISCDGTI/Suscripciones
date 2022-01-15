import { Suscription } from '../suscriptions/suscription.entity';
import { SuscriptionsService } from '../suscriptions/suscriptions.service';
import { SuscriptionsController } from '../suscriptions/suscriptions.controller';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateSuscriptionDto from '../suscriptions/dto/createSuscription.dto';
import { Categories } from '../enums/categories';

const dto: CreateSuscriptionDto = {
    subject: 'Subject',
    mail: 'test@gmail.com',
    category: Categories.Noticia,
};

describe('SuscriptionsController', () => {
  let controller: SuscriptionsController;
  let service: SuscriptionsService;

  beforeEach(async () => {
    const token = getRepositoryToken(Suscription);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuscriptionsController],
      providers: [
        SuscriptionsController,
        SuscriptionsService,
        {
          provide: token,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SuscriptionsService>(SuscriptionsService);
    controller = module.get<SuscriptionsController>(SuscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSuscriptions', () => {
    it('should retrieve all suscription', () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(
          () => new Promise((resolve) => resolve([{ _id: '1', ...dto }])),
        );

      expect(controller.getSuscriptions("",Categories.Noticia)).resolves.toStrictEqual([
        { _id: '1', ...dto },
      ]);
    });
  });

  describe('getSuscription', () => {
    it('should retrieve a suscription', () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(
          () => new Promise((resolve) => resolve({ _id: '1', ...dto })),
        );

      expect(controller.getSuscription({ _id: '1' })).resolves.toStrictEqual({
        _id: '1',
        ...dto,
      });
    });
  });

  describe('createSuscription', () => {
    it('should creates a suscription', () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(
          () => new Promise((resolve) => resolve({ _id: '1', ...dto })),
        );

      expect(controller.createSuscription(dto)).resolves.toStrictEqual({
        _id: '1',
        ...dto,
      });
    });
  });

  describe('update', () => {
    it('should updates a suscription', async () => {
      const suscription = { _id: '1', ...dto };
      const suscriptionDto = { ...dto, subject: 'Updated subject' };
      jest
        .spyOn(service, 'update')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve({ _id: '1', ...suscriptionDto })),
        );
      const response = await controller.updateSuscription(suscriptionDto, {
        id: suscription._id,
      });
      expect(response.subject).toBe(suscriptionDto.subject);
    });

    describe('remove', () => {
      it('should remove a suscription', () => {
        jest
          .spyOn(service, 'remove')
          .mockImplementation(() => new Promise((resolve) => resolve(null)));

        controller.deleteSuscription({ _id: '1' }, null);
        expect(service.remove).toBeCalled();
      });
    });
  });
});