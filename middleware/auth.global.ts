export default defineNuxtRouteMiddleware(async (to, from) => {
  const loginUrl = '/user/login'
  const skipPaths: string[] = ['/', loginUrl, '/user/signUp']
  const userStore = useUserStore()

  // if (skipPaths.includes(to.path)) return

  if (userStore.authState.isLogin && to.path === loginUrl) {
    return navigateTo('/')
  }

  if (!userStore.authState.isLogin) {
    // if (to.path === loginUrl) return

    // ssr시 사용자 정보 복구 시도(csr은 무시)
    if (import.meta.server) {
      const accessToken = useCookie('accessToken')
      if (accessToken.value) {
        try {
          await userStore.getAuthState()
        } catch (error: any) {
          // accessToken.value = null
        }
      }
    }

    // 사용자 정보가 없거나 예외 경로가 아닐경우 로그인페이지로 리다이렉트 처리
    if (!userStore.authState.isLogin && !skipPaths.includes(to.path)) {
      return navigateTo(loginUrl)
    }
    // TODO: 로그인이 필요한 페이지일 경우만 리다이렉트
  }
})
