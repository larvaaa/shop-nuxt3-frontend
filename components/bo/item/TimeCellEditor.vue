<script lang="ts" setup>
import type { ICellEditorParams } from 'ag-grid-community'

const props = defineProps<{ params: ICellEditorParams<any, string> }>()

const raw = props.params.value ?? '00:00'
const [rawHour, rawMinute] = raw.includes(':')
  ? raw.split(':')
  : [raw.slice(0, 2), raw.slice(2, 4)]
const selectedHour = ref(rawHour ?? '00')
const selectedMinute = ref(rawMinute ?? '00')

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, '0'),
)

function getValue(): string {
  return `${selectedHour.value}:${selectedMinute.value}`
}
function isPopup(): boolean {
  return true
}

defineExpose({ getValue, isPopup })
</script>

<template>
  <div class="flex items-center gap-1 p-1 bg-white border rounded shadow">
    <select v-model="selectedHour" class="border rounded px-1 py-0.5 text-sm">
      <option v-for="h in hours" :key="h" :value="h">{{ h }}</option>
    </select>
    <span class="text-sm font-bold">:</span>
    <select v-model="selectedMinute" class="border rounded px-1 py-0.5 text-sm">
      <option v-for="m in minutes" :key="m" :value="m">{{ m }}</option>
    </select>
  </div>
</template>
