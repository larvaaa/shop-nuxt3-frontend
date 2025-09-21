<template>
  <aside
    class="w-[10vw] bg-white rounded-r shadow min-h-screen py-6 flex-shrink-0"
  >
    <nav>
      <ul class="space-y-2 relative">
        <template v-for="menu in menus" :key="menu.menuId">
          <li v-if="menu.menuLevel == 1 || opens.includes(menu.parentId!)">
            <button
              class="w-full text-left py-2 rounded hover:bg-blue-100 text-gray-700 font-bold flex items-center relative"
              :class="menuFontWeight[menu.menuLevel]"
              :style="{
                paddingLeft: `${(menu.menuLevel - 1) * 18 + 16}px`,
              }"
              @click="toggle(menu)"
            >
              <span class="block">
                {{ menu.menuName }}
              </span>
              <span
                v-if="hasChildren(menu.menuId, menu.menuLevel + 1)"
                class="ml-2"
                :class="{ 'rotate-90 duration-300': isExtend(menu.menuId) }"
                >{{ '>' }}</span
              >
            </button>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
const props = defineProps<{
  menus: MenuItem[]
}>()

const emits = defineEmits<{
  (e: 'openTab', value: MenuItem): void
}>()

// 열려있는 메뉴목록
const opens = ref<string[]>([])

// 메뉴 레벨별 폰트 스타일
const menuFontWeight: { [key: number]: string } = {
  1: 'font-bold text-[1.4rem]',
  2: 'font-bold',
  3: 'font-normal',
}

// 하위 메뉴가 열려있는지 여부
const isExtend = (parnedId: string) => {
  return opens.value.some((openId) => {
    const openMenu = props.menus.find((menu) => menu.menuId === openId)
    return openMenu?.parentId === parnedId
  })
}

// 자식 메뉴가 있는지 확인
function hasChildren(menuId: string | number, level: number) {
  return props.menus.some((m) => m.menuLevel === level && m.parentId === menuId)
}

// 하위 메뉴를 열고 닫음
function toggle(menu: MenuItem) {
  if (!opens.value.includes(menu.menuId)) {
    // extend
    opens.value.push(menu.menuId)
  } else {
    // collapse
    let removeId = menu.menuId
    const removeList = [...removeId]

    while (removeList.length) {
      removeId = removeList.pop()!
      opens.value = opens.value.filter((item) => item !== removeId)

      const children = props.menus.filter((item) => item.parentId === removeId)
      children.forEach((item) => {
        if (opens.value.includes(item.menuId)) {
          removeList.push(item.menuId)
        }
      })
    }
  }

  // 경로가 있을경우 화면 open
  if (menu.route) {
    emits('openTab', menu)
  }
}
</script>
