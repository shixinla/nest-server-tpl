import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserPageDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { PaginationDto } from '@/types/request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Pagination<UserDocument>,
  ) {}
  private readonly users = [
    {
      userId: '1',
      username: 'admin',
      password: 'admin',
    },
    {
      userId: '2',
      username: 'developer',
      password: 'developer',
    },
    {
      userId: '3',
      username: 'guest',
      password: 'guest',
    },
  ];

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByPaginate({
    page,
    pageSize,
    queries,
  }: PaginationDto<CreateUserDto>) {
    console.log(page, pageSize, queries);

    return await this.userModel.paginate({
      query: {},
      page,
      limit: pageSize,
    });
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
