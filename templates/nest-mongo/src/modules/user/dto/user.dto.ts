import { PaginationDto } from '@/types/request.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '登录用户名' })
  @Length(4, 40, { message: '不满足4-40位长度限制' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '登录密码' })
  @MaxLength(40, { message: '长度超过最大限制' })
  @IsNotEmpty({ message: '登录密码不能为空' })
  password: string;

  @ApiPropertyOptional({ description: '用户名称' })
  @MaxLength(40, { message: '长度超过最大限制' })
  name?: string;

  @ApiPropertyOptional({ description: '用户角色' })
  @IsOptional()
  roles?: string[];
}

class UserQueriesDto {
  @ApiPropertyOptional({ description: '用户角色' })
  roles?: string;
}

export type UserPageDto = Omit<CreateUserDto, 'roles'> & UserQueriesDto;

export class UpdateUserDto extends PartialType(CreateUserDto) {}
