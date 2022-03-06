import newEnums from '@/utils/utils';
import { HttpStatus } from '@nestjs/common';

type BUSINESS_CODE_TYPE = {
  SUCCESS;
  /** 参数错误类型 */
  PARAM_ERROR;
  /** 无权限 */
  NO_AUTH;
  /** 网络错误 */
  NETWORK_ERROR;
  /** 用户不存在 */
  USER_NOT_EXIST;
  /** 用户名或密码错误 */
  USER_NOT_MATCH;
  UN_LOGIN;
  INTERNAL_SERVER_ERROR;
};

// TODO 错误码规则约束
export const BUSINESS_CODE = newEnums<BUSINESS_CODE_TYPE>({
  SUCCESS: [200, '请求成功'],
  // 客户端异常
  UN_LOGIN: [40001, '用户未登录'],
  PARAM_ERROR: [40002, '参数错误'],
  NO_AUTH: [40003, '未授权'],
  USER_NOT_EXIST: [40004, '用户不存在'],
  USER_NOT_MATCH: [40005, '用户名或密码错误'],

  // 服务端异常
  INTERNAL_SERVER_ERROR: [HttpStatus.INTERNAL_SERVER_ERROR, '服务器内部错误'],
  NETWORK_ERROR: [50001, '网络错误'],
});
