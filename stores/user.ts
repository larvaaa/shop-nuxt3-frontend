interface LoginResponse {
  memberName: string
  isLogin: boolean
}

export const useUserStore = defineStore('user', () => {
  const authState = ref<LoginResponse>({
    memberName: '',
    isLogin: false,
  })

  const login = async (loginForm: { loginId: string; loginPw: string }) => {
    const response = await useFetch<LoginResponse>('/login', {
      baseURL: 'http://localhost:8080',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: loginForm,
      credentials: 'include',
    })

    authState.value.memberName = response.data.value?.memberName ?? ''
    authState.value.isLogin = response.data.value?.isLogin ?? false

    return response.data.value?.isLogin
  }

  const logout = () => {
    authState.value.memberName = ''
    authState.value.isLogin = false
  }

  return { login, logout, authState }
})
