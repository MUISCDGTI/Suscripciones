import { Injectable, NotFoundException } from '@nestjs/common';

import { Suscription } from './suscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import CreateSuscriptionDto from './dto/createSuscription.dto';
import UpdateSuscriptionDto from './dto/updateSuscription.dto';

@Injectable()
export class SuscriptionsService {
  constructor(
    @InjectRepository(Suscription)
    private suscriptionsRepository: Repository<Suscription>,
  ) {}

  create(suscription: CreateSuscriptionDto): Promise<Suscription> {
    return this.suscriptionsRepository.save(suscription);
  }

  findAll(email = ''): Promise<Suscription[]> {
    if (email && email != ''){
      return this.suscriptionsRepository.find({mail: email});
    }else{
      return this.suscriptionsRepository.find();
    }
  }

  async findOne(id: string): Promise<Suscription> {
    const suscription = await this.suscriptionsRepository.findOne(id);

    if (!suscription) throw new NotFoundException('Suscription not found');
    return suscription;
  }

  async remove(id: string): Promise<DeleteResult> {
    const suscription = await this.suscriptionsRepository.findOne(id);
    if (!suscription) throw new NotFoundException('Suscription not found');
    return await this.suscriptionsRepository.delete(id);
  }

  async update(
    partialSuscription: UpdateSuscriptionDto,
    id: string,
  ): Promise<Suscription> {
    const suscription = await this.suscriptionsRepository.findOne(id);

    if (!suscription) throw new NotFoundException('Suscription not found');

    return this.suscriptionsRepository.save({
      ...suscription,
      ...partialSuscription,
    });
  }
}
