import { ApiProperty } from '@nestjs/swagger';
import {
  SuccessResponseVo,
  ErrorResponseVo,
} from '../../../common/vo/resopnse.vo';

class Info {
  @ApiProperty({ description: '文章id', example: 1 })
  id: number;

  @ApiProperty({ description: '创建时间', example: '2021-07-03' })
  createTime: Date;

  @ApiProperty({ description: '更新时间', example: '2021-07-03' })
  updateTime: Date;

  @ApiProperty({ description: '文章标题', example: '文章标题' })
  title: string;

  @ApiProperty({ description: '文章描述', example: '文章描述' })
  description: string;

  @ApiProperty({ description: '文章内容', example: '文章内容' })
  content: string;
}

export class NewUserResVo extends SuccessResponseVo<Info> {
  @ApiProperty({ type: Info })
  data: Info;
  @ApiProperty({ description: '业务状态码', example: 1001 })
  code: number;
}
