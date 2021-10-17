import { Injectable } from '@nestjs/common';
import { CreateSimDto } from './dto/create-sim.dto';
import { UpdateSimDto } from './dto/update-sim.dto';

@Injectable()
export class SimsService {
  create(createSimDto: CreateSimDto) {
    return 'This action adds a new sim';
  }

  findAll() {
    return `This action returns all sims`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sim`;
  }

  update(id: number, updateSimDto: UpdateSimDto) {
    return `This action updates a #${id} sim`;
  }

  remove(id: number) {
    return `This action removes a #${id} sim`;
  }
}
