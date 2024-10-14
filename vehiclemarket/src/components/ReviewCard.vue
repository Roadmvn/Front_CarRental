<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rating: number
  comment: string
  date: string
  authorName: string
}>()

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="ml-1 text-sm font-medium text-gray-900 dark:text-white">{{ rating }}/5</span>
        </div>
        <div class="ml-4">
          <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ authorName }}</h4>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ formattedDate }}</p>
        </div>
      </div>
      <p class="mt-4 text-sm text-gray-700 dark:text-gray-300">{{ comment }}</p>
    </div>
  </div>
</template>