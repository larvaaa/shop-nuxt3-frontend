import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

/**
 * 공통 옵션 생성기
 * $fetch와 useFetch에서 공통으로 사용하는 인터셉터와 설정을 정의합니다.
 */
function useCommonFetchOptions() {
  const { config, userStore } = useApiConfig()
  const headers = useRequestHeaders(['cookie'])

  return {
    baseURL: import.meta.server ? config.public.ssrBase : config.public.apiBase,

    // 1. 요청 인터셉터 (토큰 및 쿠키 주입)
    onRequest({ options }: any) {
      // Access Token 주입
      if (userStore.authState.accessToken) {
        options.headers = new Headers(options.headers)
        options.headers.set(
          'Authorization',
          `Bearer ${userStore.authState.accessToken}`,
        )
      }

      // SSR 시 쿠키 전달 (SSR -> API Server)
      if (import.meta.server) {
        if (headers.cookie) {
          options.headers.set('cookie', headers.cookie)
        }
      }
    },

    // 2. 에러 인터셉터 (401 토큰 만료 처리)
    async onResponseError({ response }: any) {
      if (response.status === 401) {
        const { tokenType, errorType } = response._data || {}

        if (tokenType === 'ACCESS' && errorType === 'EXPIRED') {
          await userStore.refreshAccessToken()
        } else if (tokenType === 'REFRESH' || errorType === 'EMPTY') {
          navigateTo('/login')
        }
      }
    },
  }
}

/**
 * 1. $api (customFetch)
 * - 용도: 이벤트 핸들러 (버튼 클릭 등)
 */
export async function customFetch<T = any>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1],
) {
  // 공통 옵션 가져오기
  const defaults = useCommonFetchOptions()

  // 사용자 옵션(opts)과 기본 옵션(defaults) 병합
  const params = defu(opts, defaults)

  try {
    // 첫 번째 시도
    return await $fetch<T>(request, params)
  } catch (error: any) {
    const isAccessTokenExpired =
      error.response?.status === 401 &&
      error.response?._data?.tokenType === 'ACCESS' &&
      error.response?._data?.errorType === 'EXPIRED'

    if (isAccessTokenExpired) {
      return await $fetch<T>(request, params)
    }

    throw error
  }
}

/**
 * 2. useApi (customUseFetch)
 * - 용도: 데이터 조회 (SSR, 초기 렌더링)
 */
export const customUseFetch: typeof useFetch = (request, opts?) => {
  const { userStore } = useApiConfig()
  // 공통 옵션 가져오기
  const defaults = useCommonFetchOptions()

  // ✨ 핵심: AccessToken이 변경되면 useFetch가 알아서 다시 실행되도록 감시(watch) 설정
  const reactiveOptions: UseFetchOptions<any> = {
    ...defaults,
    watch: [
      // 기존 사용자가 watch를 넣었을 수도 있으니 병합 고려 (간단한 예시로는 배열 추가)
      ...(opts?.watch || []),
      () => userStore.authState.accessToken,
    ],
    // watch: false,
  }

  // 사용자 옵션과 기본 옵션 병합
  const params = defu(opts, reactiveOptions)

  return useFetch(request, params as any)
}

/**
 * 내부 헬퍼 함수
 */
function useApiConfig() {
  const config = useRuntimeConfig()
  const userStore = useUserStore()
  return { config, userStore }
}
