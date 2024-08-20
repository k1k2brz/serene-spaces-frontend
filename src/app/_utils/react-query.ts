import { cache } from 'react';

import { HydrationBoundary, QueryClient, dehydrate, type QueryState, type QueryKey } from '@tanstack/react-query';

import { isEqual } from './checker';

/**
 * QueryClient 인스턴스를 생성하고 캐싱합니다.
 * 여러 번 호출해도 동일한 인스턴스를 반환하여 중복 생성을 방지합니다.
 * @returns {QueryClient} 캐싱된 QueryClient 인스턴스
 */
export const getQueryClient = cache(() => new QueryClient());

/**
 * Promise의 내부 타입을 추출하는 유틸리티 타입입니다.
 * @template T - Promise 타입
 * @typeParam T - Promise의 반환 타입
 * @returns {T | U} - Promise 내부의 결과 타입을 반환, Promise가 아닌 경우 그대로 반환
 */
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * 쿼리 속성을 정의하는 인터페이스입니다.
 * @template ResponseType - 쿼리 함수의 반환 데이터 타입
 * @property {QueryKey} queryKey - 쿼리의 고유 키
 * @property {() => Promise<ResponseType>} queryFn - 데이터를 가져오는 비동기 함수
 */
interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

/**
 * 쿼리의 상태를 정의하는 인터페이스입니다.
 * @template TData - 쿼리의 데이터 타입
 * @template TError - 쿼리의 에러 타입
 * @property {QueryState<TData, TError>} state - 쿼리의 상태
 */
interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

/**
 * 특정 쿼리에 대해 미리 데이터를 가져오고, 그 상태를 반환합니다.
 * @template Q - 쿼리 속성 타입
 * @param {Q} props - 쿼리 키와 쿼리 함수가 포함된 객체
 * @returns {Promise<DehydratedQueryExtended<UnwrapPromise<ReturnType<Q['queryFn']>>>>} 미리 가져온 쿼리의 상태
 */
export async function getDehydratedQuery<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn }); //  쿼리의 데이터를 미리 가져온다.

  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) => isEqual(query.queryKey, queryKey));

  return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q['queryFn']>>>;
}

/**
 * 여러 쿼리에 대해 미리 데이터를 가져오고, 그 상태들을 배열로 반환합니다.
 * @template Q - 쿼리 속성 타입의 배열
 * @param {Q} queries - 여러 쿼리 키와 쿼리 함수가 포함된 객체 배열
 * @returns {Promise<DehydratedQueryExtended<UnwrapPromise<ReturnType<Q[number]['queryFn']>>>[]>} 미리 가져온 쿼리들의 상태 배열
 */
export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(queries.map(({ queryKey, queryFn }) => queryClient.prefetchQuery({ queryKey, queryFn }))); // 병렬로 실행

  return dehydrate(queryClient).queries as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q[number]['queryFn']>>>[];
}

/**
 * 서버에서 미리 가져온 데이터를 클라이언트 측에서 다시 사용할 수 있게 하는 컴포넌트입니다.
 * HydrationBoundary를 사용하여 서버에서 가져온 쿼리 상태를 클라이언트에서 재활성화합니다.
 */
export const Hydrate = HydrationBoundary;

/* eslint-disable import/no-anonymous-default-export */
export default {};
