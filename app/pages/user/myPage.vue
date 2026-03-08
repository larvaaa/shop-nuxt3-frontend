<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})

interface UserInfo {
  name: string
  mobileNumber: string
}
const userStore = useUserStore()
const userInfo: Ref<UserInfo> = ref({
  name: '',
  mobileNumber: '',
})

const { data } = await customUseFetch<UserInfo>(
  `/member-service/users/${userStore.authState.memberId}`,
  {
    method: 'get',
  },
)

watch(
  data,
  (newData) => {
    userInfo.value.name = newData?.name ?? ''
    userInfo.value.mobileNumber = newData?.mobileNumber ?? ''
  },
  { immediate: true },
)

onMounted(() => {})
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
