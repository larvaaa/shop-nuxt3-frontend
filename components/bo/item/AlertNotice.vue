<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
  title?: string
  message: string
  confirmText?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const title = computed(() => props.title ?? '안내')
const confirmText = computed(() => props.confirmText ?? '확인')

const onConfirm = () => {
  emits('confirm')
  emits('update:modelValue', false)
}
</script>

<template>
  <HeadlessDialog :open="modelValue" @close="() => {}">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <HeadlessDialogPanel
        class="w-full max-w-sm bg-white rounded-xl border border-[#c2c6d8] shadow-lg overflow-hidden flex flex-col items-center p-6"
      >
        <div class="mb-6">
          <div
            class="w-12 h-12 rounded-full bg-[#dae1ff] flex items-center justify-center"
          >
            <Icon name="mdi:check-circle" class="w-7 h-7 text-[#0050cb]" />
          </div>
        </div>
        <HeadlessDialogTitle
          class="text-xl font-semibold text-[#191b24] mb-2"
        >
          {{ title }}
        </HeadlessDialogTitle>
        <p class="text-sm text-[#424656] text-center mb-8">{{ message }}</p>
        <button
          type="button"
          class="w-full bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold py-3 px-8 rounded-lg transition-colors"
          @click="onConfirm"
        >
          {{ confirmText }}
        </button>
      </HeadlessDialogPanel>
    </div>
  </HeadlessDialog>
</template>
