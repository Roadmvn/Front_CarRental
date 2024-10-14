<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VehicleCard from '../components/VehicleCard.vue'
import { useVehicleStore } from '../stores/vehicle'
import { useUserStore } from '../stores/user'
import { useTransactionStore } from '../stores/transaction'

const vehicleStore = useVehicleStore()
const userStore = useUserStore()
const transactionStore = useTransactionStore()

const user = ref(null)
const favorites = ref([])
const transactions = ref([])

onMounted(async () => {
  // Simuler la récupération des données de l'utilisateur connecté
  user.value = await userStore.getCurrentUser()
  if (user.value) {
    favorites.value = vehicleStore.getFavoritesByUserId(user.value.id)
    transactions.value = await transactionStore.getTransactionsByUserId(user.value.id)
  }
})

const updateProfile = () => {
  if (user.value) {
    // Implémenter la logique de mise à jour du profil
    console.log('Mise à jour du profil :', user.value)
  }
}

const removeFavorite = async (vehicleId: number) => {
  if (user.value) {
    vehicleStore.removeFavorite(user.value.id, vehicleId)
    favorites.value = vehicleStore.getFavoritesByUserId(user.value.id)
  }
}
</script>

<template>
  <div v-if="user" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profil utilisateur</h2>
    
    <!-- Informations personnelles -->
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Informations personnelles</h3>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Nom d'utilisateur</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {{ user.username }}
            </dd>
          </div>
          <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">Adresse e-mail</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {{ user.email }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
        <button @click="updateProfile" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Mettre à jour le profil
        </button>
      </div>
    </div>

    <!-- Favoris -->
    <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Vos favoris</h3>
    <div v-if="favorites.length === 0" class="text-gray-500 dark:text-gray-400">
      Vous n'avez pas encore de favoris.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="favorite in favorites" :key="favorite.id" class="relative">
        <VehicleCard v-bind="favorite" />
        <button @click="removeFavorite(favorite.id)" class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Transactions -->
    <h3 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Vos transactions</h3>
    <div v-if="transactions.length === 0" class="text-gray-500 dark:text-gray-400">
      Vous n'avez pas encore effectué de transactions.
    </div>
    <div v-else class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="transaction in transactions" :key="transaction.id" class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-indigo-600 truncate">
              {{ transaction.vehicleTitle }}
            </p>
            <div class="ml-2 flex-shrink-0 flex">
              <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="transaction.type === 'purchase' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                {{ transaction.type === 'purchase' ? 'Achat' : 'Location' }}
              </p>
            </div>
          </div>
          <div class="mt-2 sm:flex sm:justify-between">
            <div class="sm:flex">
              <p class="flex items-center text-sm text-gray-500 dark:text-gray-300">
                {{ new Date(transaction.date).toLocaleDateString() }}
              </p>
            </div>
            <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300 sm:mt-0">
              <p>
                {{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(transaction.amount) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <p class="text-center text-gray-500 dark:text-gray-400">Chargement du profil utilisateur...</p>
  </div>
</template>