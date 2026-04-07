<template>
  <Dialog :open="isOpen">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true">
      <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel class="w-[60vw] rounded bg-white relative h-[60vh] p-5">
          <DialogTitle as="h1"><slot name="title"></slot></DialogTitle>

          <slot></slot>

          <AwesomeButton
            class="w-[100px] absolute right-5 bottom-5"
            size="sm"
            type="opposite"
            @click="isOpen = false"
            >닫기</AwesomeButton
          >
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})
</script>
