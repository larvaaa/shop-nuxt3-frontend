<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-800 text-white py-4 shadow">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <h1 class="text-xl font-bold">관리자 페이지</h1>
      </div>
    </header>
    <div class="flex flex-1">
      <LayoutAdminSideBar :menus="menus" @open-tab="openTab" />
      <main
        class="flex-1 flex items-center justify-center w-full h-full overflow-auto mt-[30px]"
      >
        <div
          v-if="tabs.length"
          class="w-[calc(100%-50px)] h-[calc(100%-50px)] px-2 py-2 sm:px-0"
        >
          <TabGroup as="div" :selected-index="selectedTab" @change="changeTab">
            <TabList
              class="flex space-x-1 rounded-t-xl p-1 border-[2px] border-slate-400 bg-white"
            >
              <Tab
                v-for="(tab, index) in tabs"
                v-slot="{ selected }"
                :key="tab.menuId"
                class="flex items-center rounded-xl bg-slate-300"
              >
                <button
                  :class="[
                    'w-full rounded-xl py-2.5 mx-2 text-md font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-slate-500 text-white shadow'
                      : ' text-blue-700 hover:bg-slate-400',
                  ]"
                >
                  {{ tab.menuName }}
                </button>
                <Icon
                  name="lucide:x"
                  class="w-8 h-8 text-gray-600 hover:text-red-500 inline"
                  @click="closeTab(index)"
                />
              </Tab>
            </TabList>

            <TabPanels class="border-x-[2px] border-b-[2px] border-slate-400">
              <TabPanel
                v-for="tab in tabs"
                :key="tab.menuId"
                :unmount="false"
                :class="[
                  'bg-white p-3',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                ]"
              >
                <component
                  :is="tab.route"
                  :is-popup="false"
                  :params="tab.params"
                  @open-screen="openTab"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import type { Screen } from '~~/utils/admin-menu-type'

// selectMenus()

definePageMeta({ layout: false })
const tabs = ref<MenuItem[]>([])

// 현재 선택된 탭
const selectedTab = ref(0)

// 탭 열기
const openTab = async (item: MenuItem | Screen) => {
  let menu: MenuItem = {} as MenuItem
  // 메뉴열기
  if (Object.keys(item).includes('menuId')) {
    menu = item as MenuItem
    const findedTabIndex = tabs.value.findIndex(
      (tab) => tab.route === menu.route,
    )
    if (findedTabIndex > -1) {
      // 탭 포커스
      selectedTab.value = findedTabIndex
      return
    }
    // 화면열기
  } else {
    const screen = item as Screen
    menu.menuName = screen.name
    menu.screenId = screen.id
    menu.route = defineAsyncComponent(() => import('../' + screen.path))
    menu.params = screen.params

    const findedTabIndex = tabs.value.findIndex(
      (tab) => tab.screenId === screen.id,
    )
    if (findedTabIndex > -1) {
      // 탭 포커스
      selectedTab.value = findedTabIndex
      return
    }
  }

  // 탭 추가
  tabs.value.push(menu)
  await nextTick()
  selectedTab.value = tabs.value.length - 1
}

const closeTab = (index: number) => {
  tabs.value.splice(index, 1)
  changeTab(tabs.value.length - 1)
}

// 탭 변경 이벤트
const changeTab = (index: number) => {
  selectedTab.value = index
}

const menus = ref<MenuItem[]>([])

async function selectMenus() {
  // const response = await $fetch<MenuItem[]>('/admin/system/menu', {
  const response = await $fetch<MenuItem[]>('/admin/system/menu', {
    baseURL: 'http://localhost:8080',
    method: 'get',
    headers: {
      authorization: `Bearer ${useUserStore().authState.accessToken}`,
    },
  })

  response.forEach((item) => {
    if (item.screenPath) {
      item.route = defineAsyncComponent(() => import('../' + item.screenPath))
    }
  })

  // menus.value = response.data?.value || []
  menus.value = response
}

onMounted(async () => {
  await selectMenus()
})
</script>

<style scoped>
/* 필요시 커스텀 스타일 추가 */
</style>
