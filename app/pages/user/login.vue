<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})

const userStore = useUserStore()

const loginForm: Ref<{ loginId: string; loginPw: string }> = ref({
  loginId: '',
  loginPw: '',
})

async function login() {
  if (!loginForm.value.loginId) {
    alert('아이디를 입력하세요')
    return
  } else if (!loginForm.value.loginPw) {
    alert('비밀번호를 입력하세요')
    return
  }

  const isLogin: boolean = await userStore.login(loginForm.value)

  if (!isLogin) {
    alert('아이디, 비밀번호를 다시 확인해주세요')
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <label for="loginId">아이디</label>
    <AwesomeFormTextInput
      id="loginId"
      v-model="loginForm.loginId"
      size="md"
      class="w-full md:w-2/3"
    />
    <br /><br />
    <label for="loginPw">비밀번호</label>
    <AwesomeFormTextInput
      id="loginPw"
      v-model="loginForm.loginPw"
      size="md"
      class="w-full md:w-2/3"
    />
    <br /><br />
    <AwesomeButton
      class="capitalize w-full md:w-auto"
      text="로그인"
      type="secondary"
      size="md"
      @click.prevent="login"
    />
    <br /><br /><br /><br /><br />
    <AwesomeButton
      class="capitalize w-full md:w-auto"
      text="회원가입"
      type="secondary"
      size="md"
      to="/user/signUp"
    />
  </div>
</template>
