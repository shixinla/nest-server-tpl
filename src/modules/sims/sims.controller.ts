import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SimsService } from './sims.service';
import { CreateSimDto } from './dto/create-sim.dto';
import { UpdateSimDto } from './dto/update-sim.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SIM卡模块')
@Controller('sims')
export class SimsController {
  constructor(private readonly simsService: SimsService) {}

  @Post()
  create(@Body() createSimDto: CreateSimDto) {
    return this.simsService.create(createSimDto);
  }

  @Get()
  findAll() {
    return this.simsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSimDto: UpdateSimDto) {
    return this.simsService.update(+id, updateSimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simsService.remove(+id);
  }
}
