'use client';

import { type RefObject, useEffect } from 'react';

/**
 * 지정된 요소 외부에서 클릭이 감지되었을 때 콜백을 실행하는 커스텀 훅입니다.
 *
 * @template T - DOM 요소의 타입.
 * @param {RefObject<T>} ref - 외부 클릭을 감지할 요소를 가리키는 React ref 객체.
 * @param {() => void} callback - 지정된 요소 외부에서 클릭이 감지되었을 때 호출될 함수.
 *
 * @example
 * const ref = useRef(null);
 * useBackgroundClick(ref, () => {
 *   console.log('외부를 클릭했습니다.');
 * });
 */
export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [ref, callback]);
};
