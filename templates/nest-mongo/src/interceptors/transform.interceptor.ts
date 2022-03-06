import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseDto } from '@/types/response.dto';
import { BUSINESS_CODE } from '@/enums/response.enums';
import { Reflector } from '@nestjs/core';
import {
  IgnoreTransform,
  IGNORE_TRANSFROM_KEY,
  OVERRIDE_RESP_KEY,
} from '@/decorators/custom-decorators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // 忽略统一封装请求内容
        const isIgnore = this.reflector.getAllAndOverride(
          IGNORE_TRANSFROM_KEY,
          [context.getHandler(), context.getClass()],
        );

        if (isIgnore) return data;

        const transformResponse: ResponseDto<T> = {
          data,
          code: BUSINESS_CODE.SUCCESS,
          message: BUSINESS_CODE.getDescriptionByValue(BUSINESS_CODE.SUCCESS),
          timestamp: new Date().toISOString(),
          isSuccess: true,
        };

        // 覆盖消息
        const OverrideResp = this.reflector.getAllAndOverride(
          OVERRIDE_RESP_KEY,
          [context.getHandler(), context.getClass()],
        );

        if (OverrideResp) {
          transformResponse.message = data.message;
          transformResponse.data = data.data;
          transformResponse.code =
            data.code !== undefined ? data.code : BUSINESS_CODE.SUCCESS;
        }

        return transformResponse;
      }),
    );
  }
}
