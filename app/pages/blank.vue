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

function removeBasket(id: number) {
  basket.value = basket.value.filter((item) => item.id !== id)
}

const basketCount = computed(() => {
  return basket.value.length
})
</script>

<template>
  <LayoutPageWrapper class="flex flex-row">
    <div class="basis-1/2">
      <LayoutPageHeader>
        <LayoutPageTitle
          :text="`상품 목록 (${itemCount}개)`"
          class="capitalize"
        />
      </LayoutPageHeader>
      <template v-for="item in items" :key="item.id">
        <LayoutPageSection>
          <LayoutPageSectionTitle :text="item.name" />
          <div class="flex">
            {{ item.price }}, {{ item.color }}
            <AwesomeButton
              class="w-full md:w-auto capitalize"
              size="sm"
              type="secondary"
              @click.prevent="addBasket(item)"
            >
              상품 추가
            </AwesomeButton>
          </div>
        </LayoutPageSection>
      </template>
    </div>
    <div class="basis-1/2">
      <LayoutPageHeader>
        <LayoutPageTitle
          :text="`장바구니 목록 (${basketCount}개)`"
          class="capitalize"
        />
      </LayoutPageHeader>

      <template v-for="item in basket" :key="item.id">
        <LayoutPageSection>
          <LayoutPageSectionTitle :text="item.name" />
          <div class="flex">
            {{ item.price }}, {{ item.color }}
            <AwesomeButton
              class="w-full md:w-auto capitalize"
              size="sm"
              type="secondary"
              @click.prevent="removeBasket(item.id)"
            >
              상품 제거
            </AwesomeButton>
          </div>
        </LayoutPageSection>
      </template>
    </div>
  </LayoutPageWrapper>
</template>
