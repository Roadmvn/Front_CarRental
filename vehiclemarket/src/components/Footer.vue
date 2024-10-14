<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h2 class="text-2xl font-bold">VehicleMarket</h2>
          <p class="mt-2 text-gray-300">Trouvez votre véhicule idéal</p>
        </div>
        <div class="flex space-x-6">
          <router-link to="/about" class="text-gray-300 hover:text-white transition-colors duration-300">À propos</router-link>
          <router-link to="/contact" class="text-gray-300 hover:text-white transition-colors duration-300">Contact</router-link>
          <router-link to="/terms-of-service" class="text-gray-300 hover:text-white transition-colors duration-300">Conditions d'utilisation</router-link>
          <router-link to="/privacy-policy" class="text-gray-300 hover:text-white transition-colors duration-300">Politique de confidentialité</router-link>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
        <p>&copy; {{ currentYear }} VehicleMarket. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>