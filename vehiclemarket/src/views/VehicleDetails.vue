<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVehicleStore } from '../stores/vehicle'
import { useUserStore } from '../stores/user'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const route = useRoute()
const router = useRouter()
const vehicleStore = useVehicleStore()
const userStore = useUserStore()

const vehicle = ref(null)
const seller = ref(null)
const loading = ref(true)
const error = ref(null)
const currentUserIsOwner = ref(false)

onMounted(async () => {
  const vehicleId = Number(route.params.id)
  try {
    const foundVehicle = vehicleStore.getListings().find(v => v.id === vehicleId)
    if (foundVehicle) {
      vehicle.value = foundVehicle
      seller.value = await userStore.getUserById(vehicle.value.sellerId)
      const currentUser = await userStore.getCurrentUser()
      currentUserIsOwner.value = currentUser && currentUser.id === vehicle.value.sellerId
    } else {
      error.value = "Véhicule non trouvé"
    }
  } catch (err) {
    console.error('Erreur lors du chargement des détails du véhicule:', err)
    error.value = "Une erreur s'est produite lors du chargement des détails du véhicule"
  } finally {
    loading.value = false
  }
})

const formattedPrice = computed(() => {
  if (!vehicle.value) return ''
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(vehicle.value.price)
})

const formattedMileage = computed(() => {
  if (!vehicle.value) return ''
  return new Intl.NumberFormat('fr-FR').format(vehicle.value.mileage)
})

const contactSeller = () => {
  if (seller.value) {
    router.push({ name: 'PublicProfile', params: { id: seller.value.id } })
  }
}

const initiateTransaction = (type: 'rent' | 'buy') => {
  if (vehicle.value) {
    router.push({ 
      name: 'Transaction', 
      params: { id: vehicle.value.id },
      query: { type: type === 'rent' ? 'rent' : 'buy' }
    })
  }
}

const editListing = () => {
  if (vehicle.value) {
    router.push({ name: 'EditListing', params: { id: vehicle.value.id } })
  }
}

const deleteListing = async () => {
  if (vehicle.value && confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
    try {
      await vehicleStore.deleteListing(vehicle.value.id)
      router.push({ name: 'Profile', params: { message: 'Annonce supprimée avec succès' } })
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'annonce:', err)
      error.value = "Une erreur s'est produite lors de la suppression de l'annonce"
    }
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="loading" class="text-center">
      <p class="text-gray-500 dark:text-gray-400">Chargement des détails du véhicule...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      {{ error }}
    </div>

    <div v-else-if="vehicle" class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
          {{ vehicle.title }}
        </h2>
        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          {{ vehicle.listingType === 'rent' ? 'À louer' : 'À vendre' }}
        </p>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700">
        <Carousel :items-to-show="1" :wrap-around="true">
          <Slide v-for="(image, index) in vehicle.images" :key="index">
            <div class="carousel__item">
              <img :src="image" :alt="vehicle.title" class="w-full h-64 object-cover">
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Prix</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {{ formattedPrice }}
              <span v-if="vehicle.listingType === 'rent'"> / jour</span>
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Marque</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ vehicle.brand }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Modèle</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ vehicle.model }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Année</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ vehicle.year }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Kilométrage</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ formattedMileage }} km</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Type de carburant</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ vehicle.fuelType }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{ vehicle.description }}</dd>
          </div>
        </dl>
      </div>
      <div class="px-4 py-5 sm:px-6">
        <div class="mt-8 flex justify-between">
          <button v-if="!currentUserIsOwner" @click="contactSeller" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Contacter le vendeur
          </button>
          <button v-if="!currentUserIsOwner && vehicle.listingType === 'rent'" @click="initiateTransaction('rent')" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Réserver
          </button>
          <button v-if="!currentUserIsOwner && vehicle.listingType === 'sale'" @click="initiateTransaction('buy')" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Acheter
          </button>
          <div v-if="currentUserIsOwner" class="space-x-2">
            <button @click="editListing" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Modifier l'annonce
            </button>
            <button @click="deleteListing" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Supprimer l'annonce
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>