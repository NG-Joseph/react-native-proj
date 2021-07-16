import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';

@Injectable()
export class CitizensService {
  constructor(
    @InjectRepository(Citizen) private citizenRepository: Repository<Citizen>){}
  
  async create(createCitizenDto: CreateCitizenDto) {
    const newCitizen = this.citizenRepository.create(createCitizenDto);
    return await this.citizenRepository.save(newCitizen)

  }

  findAll() {
    return this.citizenRepository.find()
  }

  findOne(id: number) {
    return this.citizenRepository.findOne();
  
  }

  update(id: number, updateCitizenDto: UpdateCitizenDto) {
    return this.citizenRepository.update(id, updateCitizenDto)
  }

  remove(id: number) {
    return this.citizenRepository.delete(id)
  }
}
