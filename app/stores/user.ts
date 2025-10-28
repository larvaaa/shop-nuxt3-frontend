import { defineStore } from 'pinia'

interface LoginResponse {
  accessToken: string
  memberId: number | null
  memberName: string
  isLogin: boolean
}

export const useUserStore = defineStore('user', () => {
  const authState = ref<LoginResponse>({
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
      const response = await $fetch<LoginResponse>('/login', {
        baseURL: 'http://localhost:8080',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: form,
        credentials: 'include',
      })

      const route = useRoute()
      if ('setup' in route.query) {
        throw new Error('error in setup')
      }

      authState.value.memberId = response?.memberId ?? null
      authState.value.memberName = response?.memberName ?? ''
      authState.value.isLogin = response?.isLogin ?? false
      authState.value.accessToken = response?.accessToken ?? ''
    } catch {
      alert('문제가 발생해서 복구중입니다.')
    }

    return authState.value.isLogin
  }

  const refresh = async (accessToken: string = '') => {
    const { data, error } = await useFetch<LoginResponse>(
      '/login',
      {
        baseURL: 'http://localhost:8080',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          cookie: `accessToken=${accessToken}`,
        },
        credentials: 'include',
      },

      // refreshToken 쿠키는 안 보낼수 있으면 보내지 않는다.
    )

    authState.value.memberId = data.value?.memberId ?? null
    authState.value.memberName = data.value?.memberName ?? ''
    authState.value.isLogin = data.value?.isLogin ?? false
    authState.value.accessToken = data.value?.accessToken ?? ''

    return authState.value.isLogin
  }

  const logout = () => {
    authState.value.memberName = ''
    authState.value.isLogin = false
  }

  return { login, logout, refresh, authState }
})
