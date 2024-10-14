<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { ref, watchEffect } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})

// Initialiser le mode sombre en fonction de la préférence enregistrée
isDarkMode.value = localStorage.getItem('darkMode') === 'true'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <Navbar :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">VehicleMarket</h1>
      </div>
    </header>
    <main class="flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <RouterView v-slot="{ Component }">
          <Suspense>
            <component :is="Component" />
            <template #fallback>
              <div class="flex justify-center items-center h-64">
                <p class="text-gray-500 dark:text-gray-400">Chargement...</p>
              </div>
            </template>
          </Suspense>
        </RouterView>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ajoutez ces styles pour une transition en douceur lors du changement de mode */
.dark .transition-colors,
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>