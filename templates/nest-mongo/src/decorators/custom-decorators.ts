import { SetMetadata } from '@nestjs/common';

// 公共接口装饰器
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// 无请求响应封装装饰器
export const IGNORE_TRANSFROM_KEY = 'ignoreTransfrom';
export const IgnoreTransform = () => SetMetadata(IGNORE_TRANSFROM_KEY, true);

// 覆盖消息装饰器
export const OVERRIDE_RESP_KEY = 'overrideResp';
export const OverrideResp = () => SetMetadata(OVERRIDE_RESP_KEY, true);
