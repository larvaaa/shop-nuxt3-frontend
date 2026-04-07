<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
<template>
  <button
    class="border rounded-md text-sm text-white bg-slate-500 border-slate-700 hover:bg-slate-400"
  >
    <slot></slot>
  </button>
</template>
