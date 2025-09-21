<script lang="ts" setup>
definePageMeta({ layout: 'page' })
useHead({ title: 'Blank Page' })

interface Item {
  id: number
  name: string
  price: number
  color: string
}

const items = ref<Item[]>([
  { id: 1, name: 'chair', price: 10000, color: 'red' },
  { id: 2, name: 'desk', price: 20000, color: 'blue' },
  { id: 3, name: 'bed', price: 10000, color: 'green' },
  { id: 4, name: 'table', price: 10000, color: 'pink' },
])

const itemCount = computed(() => {
  return items.value.length
})

const basket: Ref<Item[]> = ref<Item[]>([])

function addBasket(addedItem: Item) {
  const exist = basket.value.some((item) => item.id === addedItem.id)
  if (!exist) basket.value.push(addedItem)
}

function removeBasket(removedItem: Item) {
  basket.value = basket.value.filter((item) => item.id !== removedItem.id)
}

const basketCount = computed(() => {
  return basket.value.length
})
</script>

<template>
  <LayoutPageWrapper class="flex flex-row">
    <div class="basis-1/2">
      <ItemList
        :title="`상품 목록 (${itemCount}개)`"
        button-text="상품 추가"
        :items="items"
        @button-click="addBasket"
      ></ItemList>
    </div>
    <div class="basis-1/2">
      <ItemList
        :title="`장바구니 목록 (${basketCount}개)`"
        button-text="상품 제거"
        :items="basket"
        @button-click="removeBasket"
      >
      </ItemList>
    </div>
  </LayoutPageWrapper>
</template>
