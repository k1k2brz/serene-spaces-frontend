/**
 * 두 값(value, other)이 동일한지를 비교하는 재귀 함수입니다.
 * 기본적인 타입 비교뿐만 아니라, 배열이나 객체의 깊은 비교(deep equality)도 수행합니다.
 *
 * @param {unknown} value - 비교할 첫 번째 값
 * @param {unknown} other - 비교할 두 번째 값
 * @returns {boolean} 두 값이 동일하면 true, 그렇지 않으면 false
 */
export const isEqual = (value: unknown, other: unknown): boolean => {
  if (value === other) {
    return true;
  }

  if (typeof value !== typeof other) {
    return false;
  }

  // 두 값이 배열인 경우
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }
    return true;
  }

  // 두 값이 객체인 경우 (배열이 아닌 객체)
  if (typeof value === 'object' && typeof other === 'object' && value !== null && other !== null) {
    const valueObj = value as Record<string, unknown>;
    const otherObj = other as Record<string, unknown>;
    const valueKeys = Object.keys(valueObj);
    const otherKeys = Object.keys(otherObj);

    if (valueKeys.length !== otherKeys.length) {
      return false;
    }

    return valueKeys.every(
      // otherObj가 현재의 key를 가지고 있는지 확인 (프로토타입 체인을 고려하지 않고 otherObj자체에만 키가 있는지 검사) && 비교 재귀함수 검사
      (key) => Object.prototype.hasOwnProperty.call(otherObj, key) && isEqual(valueObj[key], otherObj[key]),
    );
  }

  return value === other;
};
