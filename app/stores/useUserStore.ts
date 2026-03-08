import { defineStore } from 'pinia'
import { appendResponseHeader } from 'h3'
import type { LoginResponse, AuthState } from '~~/types/user'

export const useUserStore = defineStore('user', () => {
  const config = useRuntimeConfig()
  const headers = useRequestHeaders(['cookie'])
  const event = useRequestEvent() // 현재 요청 이벤트(event)를 가져옵니다.

  const authState = ref<AuthState>({
    accessToken: '',
    memberId: null,
    memberName: '',
    isLogin: false,
  })

  const login = async (loginForm: { loginId: string; loginPw: string }) => {
    const form = {
      loginId: loginForm.loginId.trim(),
      loginPw: loginForm.loginPw.trim(),
    }

    try {
      const response = await customFetch<LoginResponse>(
        '/member-service/login',
        {
          method: 'post',
          body: form,
          credentials: 'include',
        },
      )

      const route = useRoute()
      if ('setup' in route.query) {
        throw new Error('error in setup')
      }

      updateCommonProperties(authState.value, response)
    } catch {
      alert('문제가 발생해서 복구중입니다.')
    }

    return authState.value.isLogin
  }

  const getAuthState = async () => {
    console.log('getUserInfo 요청(useFetch)')
    const { data } = await customUseFetch<LoginResponse>(
      '/member-service/login',
      {
        method: 'get',
        credentials: 'include',
      },
    )

    updateCommonProperties(authState.value, data.value!)
  }

  const logout = () => {
    authState.value.memberName = ''
    authState.value.isLogin = false
  }

  const refreshAccessToken = async () => {
    console.log('토큰갱신 요청')
    const fetchOptions: any = {
      method: 'POST',
      headers: {},
    }

    // 서버 사이드이고, 전달받은 헤더가 있다면 추가
    if (import.meta.server && headers) {
      fetchOptions.headers = { ...headers }
    }

    const baseURL = config.public.apiBase
    try {
      const response = await $fetch.raw<LoginResponse>(
        `${baseURL}/member-service/accessToken`,
        fetchOptions,
      )
      updateCommonProperties(authState.value, response._data!)

      if (import.meta.server) {
        // 백엔드 응답에서 'set-cookie' 헤더를 꺼냅니다.
        // (배열일 수도 있고 문자열일 수도 있음)
        const cookies = response.headers.get('set-cookie')

        if (cookies) {
          // 쿠키가 여러 개일 수 있으므로 배열 처리를 해줍니다.
          // split-cookie 라이브러리가 내장되어 있어 보통 자동으로 처리되지만,
          // 확실하게 하기 위해 appendResponseHeader를 씁니다.
          appendResponseHeader(event!, 'set-cookie', cookies)
        }
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  return { login, logout, getAuthState, refreshAccessToken, authState }
})
