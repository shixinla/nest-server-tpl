import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserException, ErrorCode } from '../../filters/http-exception.filter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // throw new UserException(ErrorCode.PARAM_ERROR, '参数错误', { hhhh: 1 });

    return this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        open_id: createUserDto.openid,
        union_id: createUserDto.unionid,
      })
      .execute();
  }

  findAll() {
    // return `This action returns all users`;
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
