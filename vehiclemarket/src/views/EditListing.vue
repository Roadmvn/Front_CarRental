<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVehicleStore } from '../stores/vehicle'

const route = useRoute()
const router = useRouter()
const vehicleStore = useVehicleStore()

const vehicle = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const vehicleId = Number(route.params.id)
  try {
    vehicle.value = await vehicleStore.getListingById(vehicleId)
    if (!vehicle.value) {
      error.value = "Véhicule non trouvé"
    }
  } catch (err) {
    console.error('Erreur lors du chargement des détails du véhicule:', err)
    error.value = "Une erreur s'est produite lors du chargement des détails du véhicule"
  } finally {
    loading.value = false
  }
})

const updateListing = async () => {
  if (vehicle.value) {
    try {
      await vehicleStore.updateListing(vehicle.value.id, vehicle.value)
      router.push({ name: 'VehicleDetails', params: { id: vehicle.value.id } })
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'annonce:', err)
      error.value = "Une erreur s'est produite lors de la mise à jour de l'annonce"
    }
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-6">Modifier l'annonce</h1>

    <div v-if="loading" class="text-center">
      <p class="text-gray-500 dark:text-gray-400">Chargement des détails du véhicule...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      {{ error }}
    </div>

    <form v-else-if="vehicle" @submit.prevent="updateListing" class="space-y-6">
      <!-- Ajoutez ici les champs de formulaire pour modifier les détails du véhicule -->
      <!-- Par exemple : -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre</label>
        <input v-model="vehicle.title" type="text" id="title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      </div>

      <div>
        <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Prix</label>
        <input v-model="vehicle.price" type="number" id="price" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea v-model="vehicle.description" id="description" rows="3" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
      </div>

      <div>
        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Mettre à jour l'annonce
        </button>
      </div>
    </form>
  </div>
</template>