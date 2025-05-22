<script lang="ts" setup>
definePageMeta({
  layout: 'common',
})

const signUpForm = ref({
  loginId: '',
  loginPw: '',
  mobileNumber: '',
  name: '',
})

const isLoading = ref(false)

async function checkDuplicate(): Promise<boolean> {
  let checkResult: string | null = null
  isLoading.value = true

  if (!signUpForm.value.loginId) {
    alert('아이디를 입력해주세요')
    return false
  }

  try {
    const { data, error } = await useFetch<string>('/duplicateCheck', {
      baseURL: 'http://localhost:8080',
      method: 'get',
      query: {
        loginId: signUpForm.value.loginId,
      },
    })

    checkResult = data.value
  } catch (error) {
    alert('잠시 문제가 발생했습니다.')
    return false
  } finally {
    isLoading.value = false
  }

  if (checkResult === 'N') {
    alert('이미 존재하는 아이디 입니다')
    return false
  }
  alert('사용 가능한 아이디 입니다')
  return true
}

async function signUp() {
  if (!signUpForm.value.loginId) {
    alert('아이디를 입력해주세요')
    return
  } else if (!signUpForm.value.loginPw) {
    alert('비밀번호를 입력해주세요')
    return
  } else if (!signUpForm.value.mobileNumber) {
    alert('전화번호를 입력해주세요')
    return
  } else if (!signUpForm.value.name) {
    alert('이름을 입력해주세요')
    return
  }

  if (!(await checkDuplicate())) return false

  const { data, error } = await useFetch('http://localhost:8080/signUp', {
    method: 'post',
    body: signUpForm,
  })

  signUpForm.value.loginId = ''
  signUpForm.value.loginPw = ''
  signUpForm.value.mobileNumber = ''
  signUpForm.value.name = ''
}
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <label for="id">아이디</label>
    <AwesomeFormTextInput
      id="id"
      v-model="signUpForm.loginId"
      size="md"
      class="w-full md:w-2/3"
    />
    <AwesomeButton
      class="capitalize w-full md:w-auto"
      text="중복체크"
      type="secondary"
      size="md"
      :disable="isLoading"
      @click.prevent="checkDuplicate"
    /><br />
    <label for="password">비밀번호</label>
    <AwesomeFormTextInput
      id="password"
      v-model="signUpForm.loginPw"
      size="md"
      class="w-full md:w-2/3"
    /><br />
    <label for="password">이름</label>
    <AwesomeFormTextInput
      id="password"
      v-model="signUpForm.name"
      size="md"
      class="w-full md:w-2/3"
    /><br />
    <label for="password">전화번호</label>
    <AwesomeFormTextInput
      id="password"
      v-model="signUpForm.mobileNumber"
      size="md"
      class="w-full md:w-2/3"
    /><br />
    <AwesomeButton
      class="capitalize w-full md:w-auto"
      text="가입하기"
      type="secondary"
      size="md"
      @click.prevent="signUp"
    /><br />
  </div>

  <!-- <button @click="login" style="background-color: green">로그인</button> -->
</template>
