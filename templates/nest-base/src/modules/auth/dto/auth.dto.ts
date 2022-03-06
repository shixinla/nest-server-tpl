import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名格式错误' })
  @MaxLength(40, { message: '用户名过长' })
  username: string;

  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名格式错误' })
  @MaxLength(40, { message: '用户名过长' })
  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '密码' })
  age: number;
}
