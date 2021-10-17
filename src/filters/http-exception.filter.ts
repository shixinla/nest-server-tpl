import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    // 获取响应
    const response = ctx.getResponse();
    // 获取请求对象
    const request = ctx.getRequest();
    // 异常状态码
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // 统一做异常数据包裹
    const errResponse: { message?: string; [prop: string]: unknown } = {
      message: '系统异常',
      isSuccess: false,
      timestamp: new Date().toISOString(),
      data: null,
      statusCode: 500,
      error: '',
    };

    // 区分业务异常与系统异常信息
    if (exception instanceof HttpException) {
      const errContent = exception.getResponse();
      status = exception.getStatus();
      typeof errContent === 'string'
        ? Object.assign(errResponse, { message: errContent })
        : Object.assign(errResponse, errContent);
    } else {
      errResponse.data = exception;
    }

    // 向前台抛出的错误
    const responseToFrontend = {
      code: errResponse.code || status,
      data: errResponse.data,
      timestamp: errResponse.timestamp,
      message: Array.isArray(errResponse.message)
        ? errResponse.message[0]
        : errResponse.message,
    };

    // 记录详细的异常日志
    const errlog = {
      exception,
      errResponse,
    };

    Logger.error(errlog);
    response.status(status).json(responseToFrontend);
  }
}

export class UserException extends HttpException {
  /**
   * @description 用于接口请求成功，但是业务异常的场景，http状态码统一200，用于区分系统异常，系统异常状态码包括权限异常等与http状态码一致
   * @param errorCode 业务错误码，@see ErrorCode枚举
   * @param errMsg 业务错误消息
   * @param data 具体业务错误
   */
  constructor(errorCode: number, errMsg: string, data?: unknown) {
    super(
      { code: errorCode, message: errMsg, data: data || null },
      HttpStatus.OK,
    );
  }
}

export enum ErrorCode {
  // 参数校验
  PARAM_ERROR = 10001,
  // 权限
  // 用户模块
  USER_NOT_EXIST = 30001,
  UESR_EXIST = 30002,
  NO_USER_OPENID = 30003,
  // SIM卡模块
  // 订单模块
  // 支付模块
}
