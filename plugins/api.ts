export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  // 1. 커스텀 $fetch 인스턴스 생성
  const api = $fetch.create({
    // 🚀 요청 도메인 설정
    baseURL: config.public.apiBase,

    // 🍪 요청 전 인터셉터 (예: 헤더에 인증 토큰 추가)
    onRequest({ options, request, response, error }) {
      // 서버와 클라이언트 양쪽에서 쿠키 접근 가능 (SSR 대응)
      const accessToken = useUserStore().authState.accessToken

      // 요청 헤더 설정
      options.headers = options.headers || {}

      // 인증 토큰이 있다면 Authorization 헤더 추가
      if (accessToken) {
        options.headers.set('Authorization', `Bearer ${accessToken}`)
      }

      // **추가 팁: 서버 사이드에서 클라이언트의 쿠키를 API 서버로 전달**
      // SSR 시에만 클라이언트로부터 온 쿠키를 API 서버에 전달할 수 있습니다.
      if (import.meta.server) {
        const headers = useRequestHeaders(['cookie'])
        if (headers.cookie) {
          options.headers.set('cookie', headers.cookie)
        }
      }
    },

    // ❌ 응답 오류 인터셉터 (예: 401 Unauthorized 시 로그아웃 처리)
    onResponseError({ response }) {
      if (response.status === 401) {
        // 예: 사용자 세션 클리어 및 로그인 페이지로 리다이렉트
        console.error('인증 실패: 401 Unauthorized')
        // navigateTo('/login') // 실제 환경에서는 적절한 인증 로직 구현
      }
    },
  })

  // 2. Nuxt App에 '$api' 이름으로 커스텀 인스턴스 주입
  return {
    provide: {
      api, // 이제 this.$api 또는 useNuxtApp().$api로 접근 가능
    },
  }
})
