<script lang="ts" setup>
interface Item {
  id: number
  name: string
  price: number
  color: string
}

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
})

const emit = defineEmits(['buttonClick'])

function buttonClick(item: Item) {
  emit('buttonClick', item)
}
</script>

<template>
  <LayoutPageHeader>
    <LayoutPageTitle :text="`${props.title}`" class="capitalize" />
  </LayoutPageHeader>
  <template v-for="item in props.items" :key="item.id">
    <LayoutPageSection>
      <LayoutPageSectionTitle :text="item.name" />
      <div class="flex">
        {{ item.price }}, {{ item.color }}
        <AwesomeButton
          class="w-full md:w-auto capitalize"
          size="sm"
          type="secondary"
          @click.prevent="buttonClick(item)"
        >
          {{ props.buttonText }}
        </AwesomeButton>
      </div>
    </LayoutPageSection>
  </template>
</template>
