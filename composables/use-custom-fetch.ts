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
        console.log('인증 실패: 401 Unauthorized')

        const { tokenType, failCode } = response._data || {}
        console.log('tokenType:', tokenType, ',', 'failCode', failCode)

        if (tokenType === 'ACCESS') {
          switch (failCode) {
            case 'EXPIRED':
              // 토큰 갱신 시도
              // console.log('headers: ', headers)
              await userStore.refreshAccessToken()

              /**
               * 💡 중요: 여기서 '원래 요청 재시도' 로직이 빠져 있습니다.
               * $fetch의 경우 단순히 refresh만 하면 원래 요청은 실패한 채로 끝납니다.
               * 재시도 로직이 필요하다면 추가 구현이 필요합니다.
               */
              break
            case 'INVALID_SIGNATURE':
              break
            case 'MALFORMED':
              break
            case 'UNSUPPORTED':
              break
            case 'EMPTY':
              navigateTo('/login')
              break
            case 'UNKNOWN':
              break
            default:
              break
          }
        } else if (tokenType === 'REFRESH') {
          // 리프레시 토큰 문제 발생 시 즉시 로그인 페이지로
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
    // 401 에러가 발생했고, 토큰 갱신이 성공했다면 (onResponseError가 먼저 실행됨)
    // 에러 객체의 속성을 확인하여 "만료"였던 경우에만 재시도
    const isExpired = error.response?._data?.failCode === 'EXPIRED'

    if (error.response?.status === 401 && isExpired) {
      console.log('♻️ 토큰 갱신 후 요청 재시도...')
      // 재시도 시에는 갱신된 토큰이 onRequest에서 자동으로 들어갑니다.
      return await $fetch<T>(request, params)
    }

    // 그 외의 에러는 그대로 던짐
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
