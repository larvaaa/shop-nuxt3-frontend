<script lang="ts" setup>
import type { Screen } from '~~/utils/admin-menu-type'

const props = defineProps<{
  isPopup: boolean
  screenName?: string
}>()

const emits = defineEmits<{
  (e: 'setScreen', value: Screen): void
  (e: 'openTab', value: Screen): void
}>()

const searchForm = ref({
  name: '',
  path: '',
  useYn: 'Y',
})
const SCREEN_FORM_PATH = '/admin/system/screen/form'
const SCREEN_FORM_NAME = '화면수정'
const SCREEN_FORM_ID = '2'

const { getScreenList, deleteScreen } = useScreen()
// const screenList = ref<Screen[]>([])

const { data: screenList, refresh: refreshList } = await getScreenList(
  searchForm.value,
)

const handleModBtn = (item: Screen) => {
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
    emits('openTab', screen)
  }
}

const handelDelBtn = async (item: Screen) => {
  await deleteScreen(item)
  alert('success')
  refreshList()
}
</script>

<template>
  <div>
    <LayoutPageScreenTitle v-if="props.screenName">{{
      props.screenName
    }}</LayoutPageScreenTitle>
    <div class="border-2 mb-3 h-24 relative p-2">
      <div class="flex justify-start gap-5">
        <label class="px-2 flex items-center gap-2 w-1/3">
          <span class="w-1/5">화면명:</span>
          <AwesomeFormTextInput
            @keyup.enter="refreshList"
            class="w-full"
            size="sm"
            v-model="searchForm.name"
          />
        </label>
        <span>
          <span>사용여부: </span>
          <label class="mr-3">
            <input type="radio" value="Y" v-model="searchForm.useYn" />
            <span class="ml-1">Y</span>
          </label>
          <label class="mr-3">
            <input type="radio" value="N" v-model="searchForm.useYn" />
            <span class="ml-1">N</span>
          </label>
        </span>
      </div>
      <AwesomeButton
        @click="refreshList"
        size="sm"
        class="absolute right-1 bottom-1"
        >조회</AwesomeButton
      >
    </div>
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
              @click="handleModBtn(item)"
            >
              {{ props.isPopup ? '선택' : '수정' }}
            </button>
          </td>
          <td class="border-2">
            <button
              class="bg-slate-400 text-white rounded-md w-full"
              @click="handelDelBtn(item)"
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
