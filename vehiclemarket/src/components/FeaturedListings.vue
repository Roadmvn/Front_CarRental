<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVehicleStore } from '../stores/vehicle'
import VehicleCard from './VehicleCard.vue'

const vehicleStore = useVehicleStore()
const featuredListings = ref([])

onMounted(() => {
  featuredListings.value = vehicleStore.getListings()
})
</script>

<template>
  <div class="featured-listings bg-gray-100 dark:bg-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">Annonces en vedette</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <VehicleCard v-for="listing in featuredListings" :key="listing.id" v-bind="listing" />
      </div>
    </div>
  </div>
</template>