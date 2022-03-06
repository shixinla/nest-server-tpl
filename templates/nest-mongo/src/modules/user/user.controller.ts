import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';

// import { RolesGuard } from '@/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, UserPageDto } from './dto/user.dto';
import { PaginationDto } from '@/types/request.dto';
// import { IgnoreTransform, OverrideResp } from '@/decorators/custom-decorators';
// @IgnoreTransform() // 忽略统一响应封装
// @OverrideResp() // 覆盖响应code、message、data

@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('page')
  findByPaginate(@Body() userPageDto: PaginationDto<CreateUserDto>) {
    return this.userService.findByPaginate(userPageDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
