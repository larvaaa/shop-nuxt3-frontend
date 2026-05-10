<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
  title?: string
  message: string
  subMessage?: string
  confirmText?: string
  cancelText?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const title = computed(() => props.title ?? '알림')
const confirmText = computed(() => props.confirmText ?? '확인')
const cancelText = computed(() => props.cancelText ?? '취소')

const onConfirm = () => {
  emits('confirm')
  emits('update:modelValue', false)
}

const onCancel = () => {
  emits('cancel')
  emits('update:modelValue', false)
}
</script>

<template>
  <HeadlessDialog :open="modelValue" @close="() => {}">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <HeadlessDialogPanel
        class="w-full max-w-[400px] bg-white rounded-xl border border-[#c2c6d8] shadow-lg overflow-hidden"
      >
        <div class="px-6 pt-6 pb-4 flex items-center gap-2">
          <Icon name="mdi:information" class="w-7 h-7 text-[#0066ff]" />
          <HeadlessDialogTitle class="text-xl font-semibold text-[#191b24]">
            {{ title }}
          </HeadlessDialogTitle>
        </div>
        <div class="px-6 pb-8">
          <p class="text-base text-[#424656]">{{ message }}</p>
          <p v-if="subMessage" class="mt-1 text-[13px] text-[#727687]">
            {{ subMessage }}
          </p>
        </div>
        <div
          class="flex justify-end gap-4 px-6 py-6 bg-[#f2f3ff] border-t border-[#c2c6d8]"
        >
          <button
            type="button"
            class="px-6 h-10 rounded-lg border border-[#727687] text-[#5c5f61] text-xs font-semibold hover:bg-[#e1e2ee] transition-colors"
            @click="onCancel"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="px-6 h-10 rounded-lg bg-[#0066ff] text-white text-xs font-semibold hover:bg-[#0050cb] transition-colors shadow-sm"
            @click="onConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </HeadlessDialogPanel>
    </div>
  </HeadlessDialog>
</template>
