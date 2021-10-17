import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '小程序用户openid' })
  @IsNotEmpty()
  /** 小程序用户openid */
  readonly openid: string;
  @ApiProperty({ description: '小程序用户unionid' })
  @IsNotEmpty()
  /** 小程序用户unionid */
  readonly unionid?: string;
}
