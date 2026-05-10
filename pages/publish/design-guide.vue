<script setup lang="ts">
definePageMeta({ layout: false })

const activeTab = ref<'버튼' | '컬러' | '폼'>('버튼')
const tabs = ['버튼', '컬러', '폼'] as const

const primaryButtons = [
  { state: 'Default', label: 'Default', disabled: false },
  { state: 'Hover', label: 'Hovered', disabled: false },
  { state: 'Active', label: 'Pressed', disabled: false },
  { state: 'Disabled', label: 'Disabled', disabled: true },
]

const secondaryButtons = [
  { state: 'Default', label: 'Default', disabled: false },
  { state: 'Hover', label: 'Hovered', disabled: false },
  { state: 'Active', label: 'Pressed', disabled: false },
  { state: 'Disabled', label: 'Disabled', disabled: true },
]

const buttonSizes = [
  { size: 'sm' as const, label: 'Small', height: '32px' },
  { size: 'md' as const, label: 'Medium', height: '40px' },
  { size: 'lg' as const, label: 'Large', height: '48px' },
]

const semanticButtons = [
  {
    variant: 'success' as const,
    label: 'Approve Shipment',
    icon: 'mdi:check-circle',
  },
  { variant: 'warning' as const, label: 'Issue Alert', icon: 'mdi:alert' },
  { variant: 'danger' as const, label: 'Cancel Order', icon: 'mdi:cancel' },
  { variant: 'info' as const, label: 'View Details', icon: 'mdi:information' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-10">
    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Design Guide</h1>

      <!-- 탭 -->
      <div class="flex gap-1 border-b border-gray-200 mb-8">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="px-5 py-2 text-sm font-semibold rounded-t transition-colors"
          :class="
            activeTab === tab
              ? 'bg-white border border-b-white border-gray-200 -mb-px text-[#0066FF]'
              : 'text-gray-400 hover:text-gray-600'
          "
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- 버튼 탭 -->
      <div v-if="activeTab === '버튼'">
        <h2 class="text-lg font-bold text-gray-800 mb-1">Primary Buttons</h2>
        <p class="text-sm text-gray-500 mb-4">
          Primary action buttons using the brand blue (#0066FF).
        </p>
        <div
          v-for="item in primaryButtons"
          :key="item.state"
          class="flex items-center justify-between py-2"
        >
          <BoItemSearchButton variant="primary" :disabled="item.disabled">
            {{ item.label }}
          </BoItemSearchButton>
          <span class="text-xs text-gray-400 uppercase tracking-widest">{{
            item.state
          }}</span>
        </div>

        <h2 class="text-lg font-bold text-gray-800 mt-10 mb-1">
          Secondary Buttons
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Used for alternative actions or supporting navigation.
        </p>
        <div
          v-for="item in secondaryButtons"
          :key="item.state"
          class="flex items-center justify-between py-2"
        >
          <BoItemSearchButton variant="secondary" :disabled="item.disabled">
            {{ item.label }}
          </BoItemSearchButton>
          <span class="text-xs text-gray-400 uppercase tracking-widest">{{
            item.state
          }}</span>
        </div>

        <h2 class="text-lg font-bold text-gray-800 mt-10 mb-1">
          Button Scaling
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Standardized sizing for consistent vertical rhythm.
        </p>
        <div
          v-for="item in buttonSizes"
          :key="item.size"
          class="flex items-center justify-between py-2"
        >
          <BoItemSearchButton variant="primary" :size="item.size">
            {{ item.label }}
          </BoItemSearchButton>
          <span class="text-xs text-gray-400">{{ item.height }}</span>
        </div>

        <h2 class="text-lg font-bold text-gray-800 mt-10 mb-1">
          Semantic Buttons
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Communication focused variants for specific intent contexts.
        </p>
        <div
          v-for="item in semanticButtons"
          :key="item.variant"
          class="flex items-center justify-between py-2"
        >
          <BoItemSearchButton :variant="item.variant" :icon="item.icon">
            {{ item.label }}
          </BoItemSearchButton>
          <span class="text-xs text-gray-400 uppercase tracking-widest">{{
            item.variant
          }}</span>
        </div>
      </div>

      <!-- 컬러 탭 -->
      <div v-if="activeTab === '컬러'">
        <h2 class="text-lg font-bold text-gray-800 mb-1">Brand Colors</h2>
        <p class="text-sm text-gray-500 mb-4">Primary brand color palette.</p>
        <div class="flex items-center gap-4 py-2">
          <div class="w-12 h-12 rounded-lg bg-[#0066FF]"></div>
          <div>
            <p class="text-sm font-semibold text-gray-700">Primary</p>
            <p class="text-xs text-gray-400">#0066FF</p>
          </div>
        </div>
      </div>

      <!-- 폼 탭 -->
      <div v-if="activeTab === '폼'">
        <h2 class="text-lg font-bold text-gray-800 mb-1">Text Input</h2>
        <p class="text-sm text-gray-500 mb-4">Standard text input field.</p>
        <div class="py-2">
          <input
            type="text"
            placeholder="입력하세요"
            class="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-colors"
          />
        </div>
      </div>
    </div>
  </div>
</template>
