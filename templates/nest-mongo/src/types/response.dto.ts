import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  /** 请求业务状态码 参考业务枚举 */
  @ApiProperty({ description: '请求业务状态码 参考业务枚举' })
  code: string | number;

  /** 请求时间戳 */
  @ApiProperty({ description: '请求时间戳' })
  timestamp: string | number;

  /** 请求消息 */
  @ApiProperty({ description: '请求消息' })
  message: string;

  /** 请求业务数据 */
  @ApiProperty({ description: '请求业务数据' })
  data: T;

  /** 接口请求状态，接口请求成功不代表业务请求成功，实际业务成功与否请根据返回的业务code进行判断 */
  @ApiProperty({
    description:
      '接口请求状态，接口请求成功不代表业务请求成功，实际业务成功与否请根据返回的业务code进行判断',
  })
  isSuccess: boolean;

  /** 请求路径 */
  @ApiProperty({ description: '请求路径' })
  path?: string;
}
