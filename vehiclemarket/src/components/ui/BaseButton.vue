<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>();

const buttonClasses = computed(() => {
  return [
    'rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'bg-blue-600 hover:bg-blue-700 text-white': props.variant === 'primary',
      'bg-gray-200 hover:bg-gray-300 text-gray-800': props.variant === 'secondary',
      'bg-red-600 hover:bg-red-700 text-white': props.variant === 'danger',
      'px-2 py-1 text-sm': props.size === 'small',
      'px-4 py-2': props.size === 'medium',
      'px-6 py-3 text-lg': props.size === 'large',
      'opacity-50 cursor-not-allowed': props.disabled,
    },
  ];
});
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>