<template>
  <div class="p-2 flex items-center justify-between w-full">
    <p class="font-bold text-xl text-slate-600 flex items-center gap-2">
      <Icon name="mdi:checkbox-blank-circle" class="w-3 h-3" />
      <span><slot></slot></span>
    </p>
    <div v-if="showSearch || showRegister" class="flex items-center gap-2">
      <button
        v-if="showSearch"
        type="button"
        class="px-3 py-1.5 text-sm bg-slate-600 text-white rounded hover:bg-slate-700 flex items-center gap-1"
        @click="emit('search')"
      >
        <Icon name="mdi:magnify" class="w-4 h-4" />
        조회
      </button>
      <button
        v-if="showRegister"
        type="button"
        class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
        @click="emit('register')"
      >
        등록
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    showSearch?: boolean
    showRegister?: boolean
  }>(),
  {
    showSearch: false,
    showRegister: false,
  },
)

const emit = defineEmits<{
  search: []
  register: []
}>()
</script>
