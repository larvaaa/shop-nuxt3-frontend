<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    variant?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
    size?: 'sm' | 'md' | 'lg'
    icon?: string
    iconPosition?: 'leading' | 'trailing'
    disabled?: boolean
  }>(),
  {
    variant: 'secondary',
    size: 'md',
    iconPosition: 'leading',
    disabled: false,
  },
)

const variantClass = computed(
  () =>
    ({
      primary: 'bg-[#0066FF] hover:bg-[#0050cb] text-white',
      secondary:
        'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      warning: 'bg-amber-500 hover:bg-amber-600 text-white',
      danger: 'bg-[#ba1a1a] hover:bg-red-700 text-white',
      info: 'bg-sky-500 hover:bg-sky-600 text-white',
    })[props.variant],
)

const sizeClass = computed(
  () =>
    ({
      sm: 'px-4 h-8 text-xs',
      md: 'px-6 h-10 text-xs',
      lg: 'px-8 h-12 text-sm',
    })[props.size],
)
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      variantClass,
      sizeClass,
      'rounded-lg font-semibold transition-all active:scale-[0.98]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'flex items-center gap-2',
    ]"
  >
    <Icon
      v-if="icon && iconPosition === 'leading'"
      :name="icon"
      class="w-4 h-4"
    />
    <slot />
    <Icon
      v-if="icon && iconPosition === 'trailing'"
      :name="icon"
      class="w-4 h-4"
    />
  </button>
</template>
