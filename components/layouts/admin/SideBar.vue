<template>
  <aside
    class="w-[165px] bg-white rounded-r shadow min-h-screen py-6 flex-shrink-0"
  >
    <nav>
      <ul class="space-y-2 relative">
        <template v-for="menu in props.menus" :key="menu.menuId">
          <li v-if="opens.includes(menu.menuId)">
            <button
              class="w-full text-left py-2 rounded hover:bg-slate-200 text-gray-700 font-bold flex items-center relative"
              :class="menuFontWeight[menu.level!]"
              :style="{
                paddingLeft: `${(menu.level! - 1) * 18 + 16}px`,
              }"
              @click="toggle(menu)"
            >
              <span class="block">
                {{ menu.menuName }}
              </span>
              <span
                v-if="hasChildren(menu.menuId, menu.level! + 1)"
                class="ml-2"
                :class="
                  isExtend(menu.menuId)
                    ? 'rotate-90 duration-200'
                    : 'rotate-0 duration-200'
                "
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
  return props.menus.some((m) => m.level === level && m.parentId === menuId)
}

// 하위 메뉴를 열고 닫음
function toggle(menu: MenuItem) {
  const targetId = menu.menuId

  if (!isExtend(targetId)) {
    // 확대
    const openId = targetId

    props.menus.forEach((menu) => {
      if (menu.parentId === openId) opens.value.push(menu.menuId)
    })

    opens.value.push(menu.menuId)
  } else {
    // 축소
    let removeId = targetId
    const removeList = [removeId]

    while (removeList.length) {
      removeId = removeList.pop()!
      if (removeId !== targetId) {
        opens.value = opens.value.filter((item) => item !== removeId)
      }

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

watch(
  () => props.menus,
  () => {
    props.menus.forEach((menu) => {
      if (menu.level === 1) opens.value.push(menu.menuId)
    })
  },
  { deep: true },
)
</script>
