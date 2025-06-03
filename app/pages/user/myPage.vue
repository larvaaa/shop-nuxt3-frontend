<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})

const userStore = useUserStore()

interface UserInfoIF {
  name: string
  mobileNumber: string
}

const userInfo: Ref<UserInfoIF> = ref({
  name: '',
  mobileNumber: '',
})

async function getUserInfo() {
  const id: number = userStore.authState.memberId!

  const { data, error } = await useFetch<UserInfoIF>(`/users/${id}`, {
    baseURL: 'http://localhost:8080',
    method: 'get',
    headers: {
      authorization: `Bearer ${userStore.authState.accessToken}`,
    },
  })

  userInfo.value.name = data.value?.name ?? ''
  userInfo.value.mobileNumber = data.value?.mobileNumber ?? ''
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <label for="password">이름</label>
    <AwesomeFormTextInput
      id="password"
      v-model="userInfo.name"
      size="md"
      class="w-full md:w-2/3"
    /><br />
    <label for="password">전화번호</label>
    <AwesomeFormTextInput
      id="password"
      v-model="userInfo.mobileNumber"
      size="md"
      class="w-full md:w-2/3"
    /><br />
  </div>

  <!-- <button @click="login" style="background-color: green">로그인</button> -->
</template>
