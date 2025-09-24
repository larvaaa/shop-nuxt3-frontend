<template>
  <div class="flex h-[80vh] justify-around">
    <div class="flex-1 border-gray-200 border-2 mr-5 p-5">
      <ul>
        <li
          v-for="(menu, index) in menus"
          :key="menu.menuId"
          class="py-2"
          :class="[
            paddingClass(menu.menuLevel!),
            { 'text-lg text-blue font-medium': index === selectedMenu },
            'hover:text-indigo-400',
          ]"
        >
          <a href="#" @click.prevent="((form = menu), (selectedMenu = index))">
            {{ menu.menuName }}
          </a>
          <button class="ml-2 border-2 w-[1.5rem]">+</button>
        </li>
      </ul>
    </div>
    <div class="flex-1 border-gray-200 border-2 p-5">
      <form>
        <label class="block mb-4"
          ><span class="inline-block w-[5rem]">메뉴 아이디</span>
          <input
            v-model="form.menuId"
            type="text"
            class="border border-gray-400 p-1 rounded-lg"
            disabled
          />
        </label>
        <label class="block mb-4"
          ><span class="inline-block w-[5rem]">메뉴명</span>
          <input
            v-model="form.menuName"
            type="text"
            class="border border-gray-400 p-1 rounded-lg"
          />
        </label>
        <label class="block mb-4"
          ><span class="inline-block w-[5rem]">메뉴레벨</span>
          <input
            v-model="form.menuLevel"
            type="text"
            class="border border-gray-400 p-1 rounded-lg"
          />
        </label>
        <label class="block mb-4"
          ><span class="inline-block w-[5rem]">메뉴순서</span>
          <input
            v-model="form.order"
            type="text"
            class="border border-gray-400 p-1 rounded-lg"
        /></label>
        <label class="block mb-4"
          ><span class="inline-block w-[5rem]">화면 아이디</span>
          <input
            v-model="form.screenId"
            type="text"
            class="border border-gray-400 p-1 rounded-lg"
            disabled
        /></label>
        <label class="block mb-4"
          ><span class="inline-block w-[5rem]">화면명</span>
          <input
            v-model="form.screenName"
            type="text"
            class="border border-gray-400 p-1 rounded-lg"
            disabled
        /></label>
        <div class="mb-4">
          <span class="inline-block w-[5rem]">사용여부</span>
          <label class="mr-[1rem]"
            ><span class="mr-[0.5rem]">사용</span
            ><input
              v-model="form.useYn"
              type="radio"
              value="Y"
              class="border border-gray-400 p-1 rounded-lg"
            />
          </label>
          <label>
            <span class="mr-[0.5rem]">미사용</span>
            <input
              v-model="form.useYn"
              type="radio"
              value="N"
              class="border border-gray-400 p-1 rounded-lg"
          /></label>
        </div>
        <div class="flex justify-around mt-20">
          <button
            class="w-16 text-lg border-blue-500 border bg-blue-200 rounded-lg"
            @click.prevent=""
          >
            저장
          </button>
          <button
            class="w-16 text-lg border-red-500 border bg-red-400 rounded-lg"
            @click.prevent=""
          >
            삭제
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 메뉴 레벨에 따라서 왼쪽 패딩
const paddingClass = (level: number) => {
  return {
    'pl-[calc(1rem_*_1)]': level === 1,
    'pl-[calc(1rem_*_2)]': level === 2,
    'pl-[calc(1rem_*_3)]': level === 3,
  }
}

// 선택된 메뉴
const selectedMenu = ref()

// 메뉴 form
const form = ref<MenuItem>({
  menuName: '',
  menuId: '',
  menuLevel: undefined,
  parentId: '',
  screenId: '',
  screenName: '',
  order: undefined,
  useYn: 'Y',
})

const menus = ref<MenuItem[]>([
  { menuId: '3', menuName: '시스템 관리', menuLevel: 1, useYn: 'Y' },
  {
    menuId: '9',
    menuName: '메뉴 관리',
    menuLevel: 2,
    parentId: '3',
    useYn: 'Y',
  },
  {
    menuId: '11',
    menuName: '메뉴 등록',
    menuLevel: 3,
    parentId: '9',
    route: defineAsyncComponent(
      () => import('~/pages/admin/system/menu/form.vue'),
    ),
    useYn: 'Y',
  },
  {
    menuId: '12',
    menuName: '메뉴 목록',
    menuLevel: 3,
    parentId: '9',
    route: defineAsyncComponent(
      () => import('~/pages/admin/system/menu/index.vue'),
    ),
    useYn: 'Y',
  },
  {
    menuId: '10',
    menuName: '화면 관리',
    menuLevel: 2,
    parentId: '3',
    useYn: 'Y',
  },
  { menuId: '1', menuName: '상품 관리', menuLevel: 1, useYn: 'Y' },
  {
    menuId: '4',
    menuName: '상품 목록',
    menuLevel: 2,
    parentId: '1',
    useYn: 'Y',
  },
  {
    menuId: '6',
    menuName: '상품 상세 목록',
    menuLevel: 3,
    parentId: '4',
    useYn: 'Y',
  },
  {
    menuId: '5',
    menuName: '상품 등록',
    menuLevel: 2,
    parentId: '1',
    route: defineAsyncComponent(() => import('~/pages/admin/product/form.vue')),
    useYn: 'Y',
  },
  { menuId: '2', menuName: '회원 관리', menuLevel: 1, useYn: 'Y' },
  {
    menuId: '7',
    menuName: '회원 목록',
    menuLevel: 2,
    parentId: '2',
    useYn: 'Y',
  },
  {
    menuId: '8',
    menuName: '회원 등급',
    menuLevel: 2,
    parentId: '2',
    useYn: 'Y',
  },
])
</script>
