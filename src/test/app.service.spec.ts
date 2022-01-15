import { Test, TestingModule } from '@nestjs/testing';

import CreateSuscriptionDto from '../suscriptions/dto/createSuscription.dto';
import { SuscriptionsService } from '../suscriptions/suscriptions.service';
import { Suscription } from '../suscriptions/suscription.entity';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Categories } from '../enums/categories';

const dto: CreateSuscriptionDto = {
  subject: 'Subject',
  mail: 'test@gmail.com',
  category: Categories.Noticia,
};

describe('SuscriptionsService', () => {
  let service: SuscriptionsService;
  let repository: Repository<Suscription>;
  const token = getRepositoryToken(Suscription);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuscriptionsService,
        {
          provide: token,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SuscriptionsService>(SuscriptionsService);
    repository = module.get<Repository<Suscription>>(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should creates a suscription', () => {
      jest
        .spyOn(repository, 'save')
        .mockImplementation(
          () => new Promise((resolve) => resolve({ _id: '1', ...dto })),
        );

      expect(service.create(dto)).resolves.toStrictEqual({ _id: '1', ...dto });
    });
  });

  describe('update', () => {
    it('should updates a suscription', async () => {
      const suscription = { _id: '1', ...dto };
      const suscriptionDto = { ...dto, subject: 'Updated subject' };
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(
          () => new Promise((resolve) => resolve(suscription)),
        );
      jest
        .spyOn(repository, 'save')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve({ _id: '1', ...suscriptionDto })),
        );
      const response = await service.update(suscriptionDto, suscription._id);
      expect(response.subject).toBe(suscriptionDto.subject);
    });

    it('should throws a error if the suscription does not exist', () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(null)));

      expect(service.update(dto, '3')).rejects.toThrowError(
        'Suscription not found',
      );
    });
  });

  describe('findAll', () => {
    it('should retrieve all suscription', () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () => new Promise((resolve) => resolve([{ _id: '1', ...dto }])),
        );

      expect(service.findAll('', '', 'Noticia')).resolves.toStrictEqual([
        { _id: '1', ...dto },
      ]);
    });
  });

  describe('findOne', () => {
    it('should retrieve a suscription', () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(
          () => new Promise((resolve) => resolve({ _id: '1', ...dto })),
        );

      expect(service.findOne('1')).resolves.toStrictEqual({
        _id: '1',
        ...dto,
      });
    });
  });
});
