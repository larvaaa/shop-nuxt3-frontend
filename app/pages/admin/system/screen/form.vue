<template>
  <div class="flex justify-center items-center h-[80vh]">
    <form class="w-1/2">
      <label>
        <span>화면아이디</span>
        <AwesomeFormTextInput v-model="form.id" size="sm" disabled /> </label
      ><br />
      <label>
        <span>화면명</span>
        <AwesomeFormTextInput v-model="form.name" size="sm" /> </label
      ><br />
      <label>
        <span>화면경로</span>
        <AwesomeFormTextInput v-model="form.path" size="sm" /> </label
      ><br />
      <div>
        <span class="mr-2">사용여부</span><br />
        <label class="mr-5">
          <span class="mr-2">사용</span>
          <input v-model="form.useYn" type="radio" value="Y" />
        </label>
        <label>
          <span class="mr-2">미사용</span>
          <input v-model="form.useYn" type="radio" value="N" />
        </label>
      </div>
      <button
        class="w-full text-lg border-blue-500 border bg-blue-200 rounded-lg mt-5"
        @click.prevent="saveScreen"
      >
        저장
      </button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { screen } from '~/composables/useScreen'

const props = defineProps<{
  params?: Record<string, string>
}>()

const form = ref({
  id: '',
  name: '',
  path: '',
  useYn: 'Y',
})

async function saveScreen() {
  await useCustomFetch('/screen', {
    method: 'post',
    body: form.value,
  })
}

onMounted(async () => {
  if (props.params?.screenId) {
    await getScreen(props.params?.screenId)

    form.value.id = screen.value.id!
    form.value.name = screen.value.name!
    form.value.path = screen.value.path!
    form.value.useYn = screen.value.useYn!
  }
})
</script>
