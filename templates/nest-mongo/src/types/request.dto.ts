import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PaginationDto<T> {
  @ApiProperty({ description: '页码', default: 1 })
  @IsNotEmpty({ message: '页码不能为空' })
  page: number;

  @ApiProperty({ description: '页面大小', default: 10 })
  @IsNotEmpty({ message: '页面大小不能为空' })
  pageSize: number;

  @ApiPropertyOptional({ description: '查询条件', default: {} })
  @IsOptional()
  queries?: T;
}
