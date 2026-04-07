<script lang="ts" setup>
import type { Screen } from '~~/utils/admin-menu-type'
const props = defineProps<{
  params?: Record<string, string>
  tabIndex: number
  screenName: string
}>()
const emits = defineEmits<{
  (e: 'closeTab', value: number): void
}>()
const { getScreen, saveScreen } = useScreen()
const form = ref<Screen>({
  id: '',
  name: '',
  path: '',
  useYn: 'Y',
})

if (props.params?.screenId) {
  const { data } = await getScreen(props.params?.screenId)
  if (data.value) {
    form.value = { ...data.value }
  }
}

const handleSaveBtn = async (form: Screen) => {
  const res = await saveScreen(form)
  alert(res.message)
  emits('closeTab', props.tabIndex)
}
</script>

<template>
  <BoItemScreenHeader>{{ props.screenName }}</BoItemScreenHeader>
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
        @click.prevent="handleSaveBtn(form)"
      >
        저장
      </button>
    </form>
  </div>
</template>
