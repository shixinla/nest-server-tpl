import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseVo<T> {
  @ApiProperty({ description: '业务状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '业务数据' })
  data: T;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;

  @ApiProperty({ description: '业务请求状态', example: true })
  isSuccess: boolean;
}

export class ErrorResponseVo<T> {
  @ApiProperty({ description: '业务状态码', example: 400 })
  code: number;

  @ApiProperty({ description: '业务错误数据' })
  data: T;

  @ApiProperty({ description: '请求结果信息', example: '参数错误' })
  message: string;

  @ApiProperty({ description: '业务请求状态', example: false })
  isSuccess: boolean;

  @ApiProperty({
    description: '请求时间戳字符串',
    example: '2021-10-17T18:07:33.016Z',
  })
  timestamp: string;
}
