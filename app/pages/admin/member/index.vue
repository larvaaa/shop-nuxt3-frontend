<script lang="ts" setup>
import type { Member } from '~~/types/user'

const props = defineProps<{
  screenName?: string
}>()

const searchForm = ref<Member>({
  name: '',
  loginId: '',
  mobileNumber: '',
})

const { getMemberList } = useMember()
const selectbox = ref([
  { name: '전체', value: '' },
  { name: '회원아이디', value: 'loginId' },
  { name: '회원명', value: 'name' },
  { name: '핸드폰번호', value: 'mobileNumber' },
])
const searchGubun = ref<keyof Member | ''>('')
const searchWord = ref('')

const { data, refresh: refreshList } = await getMemberList(searchForm)

const memberList = computed(() => {
  return data.value?.data ?? []
})

const search = () => {
  searchForm.value = {
    name: '',
    loginId: '',
    mobileNumber: '',
  }

  if (searchGubun.value) {
    const key = searchGubun.value as keyof Member
    searchForm.value[key] = searchWord.value
  }
  refreshList()
}
</script>

<template>
  <BoItemScreenHeader v-if="props.screenName">{{
    props.screenName
  }}</BoItemScreenHeader>
  <div class="border-2 mb-3 h-24 relative p-2">
    <div class="flex justify-start gap-4">
      <label class="px-2 flex items-center gap-2 w-1/3">
        <span class="w-2/5">검색구분:</span>
        <select v-model="searchGubun">
          <option
            v-for="item in selectbox"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </option>
        </select>
        <AwesomeFormTextInput
          v-model="searchWord"
          @keyup.enter="search"
          class="w-full"
          size="sm"
        />
      </label>
    </div>
    <AwesomeButton @click="search" size="sm" class="absolute right-1 bottom-1"
      >조회</AwesomeButton
    >
  </div>
  <table class="w-full border-2">
    <thead>
      <tr>
        <th class="border-2">회원아이디</th>
        <th class="border-2">회원명</th>
        <th class="border-2">핸드폰번호</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in memberList" :key="item.loginId">
        <td class="border-2">{{ item.loginId }}</td>
        <td class="border-2">{{ item.name }}</td>
        <td class="border-2">{{ item.mobileNumber }}</td>
      </tr>
    </tbody>
  </table>
</template>
