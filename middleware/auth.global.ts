export default defineNuxtRouteMiddleware(async (to, from) => {
  return

  const loginUrl = '/user/login'
  const skipPaths: string[] = ['/', loginUrl]
  const userStore = useUserStore()

  if (!userStore.authState.isLogin && !skipPaths.includes(to.path)) {
    let accessToken: string = ''

    if (import.meta.server) {
      // hydration mismatch 방지하려면 서버사이드에서도 인증실패시 로그인페이지로 리다이렉트 처리
      // 서버사이드에서는 useCookie를 사용해 직접 쿠키값을 전달해야 한다
      accessToken = useCookie('accessToken').value ?? ''
    }

    await userStore.refresh(accessToken)
    if (!userStore.authState.isLogin) {
      return navigateTo(loginUrl)
    }
  }
})
