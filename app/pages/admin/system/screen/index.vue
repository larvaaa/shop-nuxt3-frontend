<template>
  <div>
    <table class="w-full border-2">
      <thead>
        <tr>
          <th class="border-2">화면아이디</th>
          <th class="border-2">화면명</th>
          <th class="border-2">화면경로</th>
          <th class="border-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in screenList" :key="item.id">
          <td class="border-2">{{ item.id }}</td>
          <td class="border-2">{{ item.name }}</td>
          <td class="border-2">{{ item.path }}</td>
          <td class="border-2">
            <button
              class="bg-slate-400 text-white rounded-md w-full"
              @click="selScreen(item)"
            >
              {{ props.isPopup ? '선택' : '수정' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { Screen } from '~~/utils/admin-menu-type'

onMounted(() => {})

const SCREEN_FORM_PATH = '/admin/system/screen/form'
const SCREEN_FORM_NAME = '화면수정'
const SCREEN_FORM_ID = '2'

const props = defineProps<{
  isPopup: boolean
}>()

const emits = defineEmits<{
  (e: 'setScreen', value: Screen): void
  (e: 'openScreen', value: Screen): void
}>()

getScreenList()

const screenList = ref<Screen[]>([])

async function getScreenList() {
  const response = await useCustomFetch<Screen[]>('/screen', {
    method: 'get',
  })

  screenList.value = response
}

function selScreen(item: Screen) {
  if (props.isPopup) {
    emits('setScreen', item)
  } else {
    const screen: Screen = {
      path: SCREEN_FORM_PATH,
      name: SCREEN_FORM_NAME,
      id: SCREEN_FORM_ID,
      params: {
        screenId: item.id!,
      },
    }
    emits('openScreen', screen)
  }
}
</script>
