export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('middleware :: ', to.path)

  const loginUrl = '/user/login'
  const skipPaths: string[] = ['/', loginUrl]
  const userStore = useUserStore()

  if (!userStore.authState.isLogin && !skipPaths.includes(to.path)) {
    let accessToken: string | null = null

    if (import.meta.server) {
      // hydration mismatch 방지하려면 서버사이드에서도 인증실패시 로그인페이지로 리다이렉트 처리
      accessToken = useCookie('accessToken').value ?? null
    }

    await userStore.refresh(accessToken)
    if (!userStore.authState.isLogin) {
      return navigateTo(loginUrl)
    }
  }
})
