/**
 * 枚举定义工具
 * @example
 * const STATUS = newEnums({
 *     PAY_SUCCESS: [1001, '支付成功'],
 *     PAY_FAIL: [1002, '支付失败']
 * })
 * STATUS.PAY_SUCCESS // 1001
 * STATUS.getDescription('PAY_SUCCESS') // 支付成功
 * STATUS.getDescriptionByValue(STATUS.PAY_SUCCESS) // 支付成功
 */
export default function newEnums<T>(enums: {
  [prop: string]: [number | string, string];
}) {
  const keyToValue = {};
  const valueToDescription = {};
  for (const key of Object.keys(enums)) {
    const [value, description] = enums[key];
    keyToValue[key] = value;
    valueToDescription[value] = description;
  }
  return {
    ...(keyToValue as T),
    getDescription(key) {
      return (enums[key] && enums[key][1]) || '';
    },
    getDescriptionByValue(value) {
      return valueToDescription[value] || '';
    },
  };
}
