import { BUSINESS_CODE } from '@/enums/response.enums';
import { ResponseDto } from '@/types/response.dto';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: UserException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody: ResponseDto<unknown> = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: BUSINESS_CODE.getDescriptionByValue(
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
      isSuccess: false,
      data: undefined,
    };

    let stackError = null;
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof Error) {
      stackError = exception.stack;

      responseBody.message = exception.message;
      responseBody.data = exception.message;
    }

    if (exception instanceof HttpException) {
      const errorContent: any = exception.getResponse();
      httpStatus = exception.getStatus();
      stackError = exception.stack;

      responseBody.code = errorContent.code || httpStatus;
      responseBody.message = errorContent.message || exception.message;
      responseBody.data = errorContent.data || exception.message;
    }

    if (typeof exception !== 'object') {
      responseBody.message = exception;
      responseBody.data = exception;
    }

    if (Array.isArray(responseBody.message)) {
      responseBody.message = responseBody.message.join(',');
    }
    // 记录完整日志
    Logger.error({ responseBody, exception, stackError });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

/**
 * @description 用于接口请求成功，但是业务异常的场景，http状态码统一200，用于区分系统异常，系统异常状态码包括权限异常等与http状态码一致
 */
export class UserException extends HttpException {
  constructor(
    /** 错误码，参考 ERROR_CODE 枚举 */
    errorCode: number,
    /** 错误提示 **/
    errMsg?: string,
    /** 错误详情 */
    data = null,
  ) {
    super(
      {
        code: errorCode,
        message: errMsg || BUSINESS_CODE.getDescriptionByValue(errorCode),
        data,
      },
      HttpStatus.OK,
    );
  }
}
