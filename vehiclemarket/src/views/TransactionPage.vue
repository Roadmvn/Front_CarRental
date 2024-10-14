<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVehicleStore } from '../stores/vehicle'
import { useUserStore } from '../stores/user'
import { useTransactionStore } from '../stores/transaction'

const route = useRoute()
const router = useRouter()
const vehicleStore = useVehicleStore()
const userStore = useUserStore()
const transactionStore = useTransactionStore()

const vehicle = ref(null)
const user = ref(null)
const transactionType = ref('')
const rentalDuration = ref(1)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const vehicleId = Number(route.params.id)
  transactionType.value = route.query.type as string

  try {
    vehicle.value = await vehicleStore.getListingById(vehicleId)
    user.value = await userStore.getCurrentUser()
    if (!vehicle.value || !user.value) {
      throw new Error("Impossible de charger les informations nécessaires")
    }
  } catch (err) {
    console.error('Erreur lors du chargement des données:', err)
    error.value = "Une erreur s'est produite lors du chargement des données"
  } finally {
    loading.value = false
  }
})

const totalPrice = computed(() => {
  if (!vehicle.value) return 0
  if (transactionType.value === 'rent') {
    return vehicle.value.price * rentalDuration.value
  }
  return vehicle.value.price
})

const confirmTransaction = async () => {
  if (!vehicle.value || !user.value) return

  try {
    await transactionStore.addTransaction({
      userId: user.value.id,
      vehicleId: vehicle.value.id,
      vehicleTitle: vehicle.value.title,
      type: transactionType.value === 'rent' ? 'rental' : 'purchase',
      amount: totalPrice.value,
      date: new Date().toISOString()
    })

    // Rediriger vers une page de confirmation ou le profil utilisateur
    router.push({ name: 'Profile', params: { message: 'Transaction réussie!' } })
  } catch (err) {
    console.error('Erreur lors de la transaction:', err)
    error.value = "Une erreur s'est produite lors de la transaction"
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-6">{{ transactionType === 'rent' ? 'Réserver' : 'Acheter' }} un véhicule</h1>

    <div v-if="loading" class="text-center">
      <p>Chargement en cours...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      {{ error }}
    </div>

    <div v-else-if="vehicle && user" class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-2xl font-bold">{{ vehicle.title }}</h2>
        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
          {{ transactionType === 'rent' ? 'Location' : 'Achat' }}
        </p>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Prix</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(vehicle.price) }}
              {{ transactionType === 'rent' ? '/ jour' : '' }}
            </dd>
          </div>
          <div v-if="transactionType === 'rent'" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Durée de location (jours)</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              <input v-model="rentalDuration" type="number" min="1" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600">
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Total</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice) }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
        <button @click="confirmTransaction" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Confirmer la {{ transactionType === 'rent' ? 'réservation' : 'l\'achat' }}
        </button>
      </div>
    </div>
  </div>
</template>