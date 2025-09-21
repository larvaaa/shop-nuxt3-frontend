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
        class="flex-1 flex items-center justify-center w-full h-full overflow-auto"
        style="margin-top: 30px"
      >
        <div
          v-if="tabs.length"
          class="w-[calc(100%-50px)] h-[calc(100%-50px)] px-2 py-2 sm:px-0"
        >
          <TabGroup as="div" :selected-index="selectedTab" @change="changeTab">
            <TabList
              class="flex space-x-1 rounded-t-xl p-1 border-[2px] border-slate-400 bg-white"
            >
              <Tab v-for="tab in tabs" v-slot="{ selected }" :key="tab.menuId">
                <button
                  :class="[
                    'w-full rounded-xl py-2.5 mr-[3rem] text-md font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-slate-500 text-white shadow'
                      : 'bg-slate-300 text-blue-700 hover:bg-slate-400',
                  ]"
                >
                  {{ tab.menuName }}
                </button>
              </Tab>
            </TabList>

            <TabPanels class="border-x-[2px] border-b-[2px] border-slate-400">
              <TabPanel
                v-for="tab in tabs"
                :key="tab.menuId"
                :class="[
                  'bg-white p-3',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                ]"
              >
                <component :is="tab.route" />
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
import Publish1 from '../pages/publish/publish1.vue' // app 디렉토리 외부의 파일은 상대결로로 참조가능

const tabs = ref<MenuItem[]>([
  // {
  //   menuId: '1',
  //   menuName: 'tab1',
  //   menuLevel: 2,
  // },
])

// 현재 선택된 탭
const selectedTab = ref(0)

// 탭 열기
const openTab = async (menu: MenuItem) => {
  if (tabs.value.some((tab) => tab.menuId === menu.menuId)) return
  tabs.value.push(menu)
  await nextTick()
  selectedTab.value = tabs.value.length - 1
}

// 탭 변경 이벤트
const changeTab = (index: number) => {
  selectedTab.value = index
}

const menus = ref<MenuItem[]>([
  { menuId: '3', menuName: '시스템 관리', menuLevel: 1 },
  {
    menuId: '9',
    menuName: '메뉴 관리',
    menuLevel: 2,
    parentId: '3',
  },
  {
    menuId: '11',
    menuName: '메뉴 등록',
    menuLevel: 3,
    parentId: '9',
    route: defineAsyncComponent(
      () => import('~/pages/admin/system/menu/form.vue'),
    ),
  },
  {
    menuId: '12',
    menuName: '메뉴 목록',
    menuLevel: 3,
    parentId: '9',
    route: defineAsyncComponent(
      () => import('~/pages/admin/system/menu/index.vue'),
    ),
  },
  {
    menuId: '10',
    menuName: '화면 관리',
    menuLevel: 2,
    parentId: '3',
  },
  { menuId: '1', menuName: '상품 관리', menuLevel: 1 },
  {
    menuId: '4',
    menuName: '상품 목록',
    menuLevel: 2,
    parentId: '1',
  },
  {
    menuId: '6',
    menuName: '상품 상세 목록',
    menuLevel: 3,
    parentId: '4',
  },
  {
    menuId: '5',
    menuName: '상품 등록',
    menuLevel: 2,
    parentId: '1',
    route: defineAsyncComponent(() => import('~/pages/admin/product/form.vue')),
  },
  { menuId: '2', menuName: '회원 관리', menuLevel: 1 },
  {
    menuId: '7',
    menuName: '회원 목록',
    menuLevel: 2,
    parentId: '2',
  },
  {
    menuId: '8',
    menuName: '회원 등급',
    menuLevel: 2,
    parentId: '2',
  },
])
</script>

<style scoped>
/* 필요시 커스텀 스타일 추가 */
</style>
