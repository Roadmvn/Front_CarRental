<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVehicleStore } from '../stores/vehicle'

const router = useRouter()
const vehicleStore = useVehicleStore()

const listing = reactive({
  listingType: 'sale',
  vehicleType: '',
  brand: '',
  model: '',
  year: null,
  mileage: null,
  price: null,
  description: '',
  fuelType: '',
  images: [],
})

const fuelTypes = ['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL']
const errors = ref({})

const validateForm = () => {
  errors.value = {}
  if (!listing.vehicleType) errors.value.vehicleType = 'Le type de véhicule est requis'
  if (!listing.brand) errors.value.brand = 'La marque est requise'
  if (!listing.model) errors.value.model = 'Le modèle est requis'
  if (!listing.year) errors.value.year = "L'année est requise"
  if (!listing.mileage) errors.value.mileage = 'Le kilométrage est requis'
  if (!listing.price) errors.value.price = 'Le prix est requis'
  if (!listing.fuelType) errors.value.fuelType = 'Le type de carburant est requis'
  if (listing.images.length === 0) errors.value.images = 'Au moins une image est requise'
  return Object.keys(errors.value).length === 0
}

const createListing = () => {
  if (validateForm()) {
    const newListing = {
      ...listing,
      id: Date.now(), // Génère un ID unique basé sur le timestamp
      createdAt: new Date().toISOString(),
    }
    vehicleStore.addListing(newListing)
    router.push('/')
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files) {
    listing.images = Array.from(files)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Créer une annonce</h2>
      <form @submit.prevent="createListing" class="space-y-6">
        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="listingType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type d'annonce</label>
            <select v-model="listing.listingType" id="listingType" name="listingType" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="sale">À vendre</option>
              <option value="rent">À louer</option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label for="vehicleType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type de véhicule</label>
            <input v-model="listing.vehicleType" type="text" name="vehicleType" id="vehicleType" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{ 'border-red-500': errors.vehicleType }" placeholder="ex: Voiture, Moto, Camion">
            <p v-if="errors.vehicleType" class="mt-2 text-sm text-red-600">{{ errors.vehicleType }}</p>
          </div>

          <div class="sm:col-span-3">
            <label for="brand" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Marque</label>
            <input v-model="listing.brand" type="text" name="brand" id="brand" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{ 'border-red-500': errors.brand }" placeholder="ex: Toyota, BMW, Honda">
            <p v-if="errors.brand" class="mt-2 text-sm text-red-600">{{ errors.brand }}</p>
          </div>

          <div class="sm:col-span-3">
            <label for="model" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Modèle</label>
            <input v-model="listing.model" type="text" name="model" id="model" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{ 'border-red-500': errors.model }" placeholder="ex: Corolla, Série 3, Civic">
            <p v-if="errors.model" class="mt-2 text-sm text-red-600">{{ errors.model }}</p>
          </div>

          <div class="sm:col-span-2">
            <label for="year" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Année</label>
            <input v-model="listing.year" type="number" name="year" id="year" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{ 'border-red-500': errors.year }" placeholder="ex: 2022">
            <p v-if="errors.year" class="mt-2 text-sm text-red-600">{{ errors.year }}</p>
          </div>

          <div class="sm:col-span-2">
            <label for="mileage" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kilométrage</label>
            <input v-model="listing.mileage" type="number" name="mileage" id="mileage" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{ 'border-red-500': errors.mileage }" placeholder="ex: 50000">
            <p v-if="errors.mileage" class="mt-2 text-sm text-red-600">{{ errors.mileage }}</p>
          </div>

          <div class="sm:col-span-2">
            <label :for="listing.listingType === 'rent' ? 'rentalPrice' : 'price'" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ listing.listingType === 'rent' ? 'Prix de location (par jour)' : 'Prix de vente' }}
            </label>
            <input v-model="listing.price" type="number" :name="listing.listingType === 'rent' ? 'rentalPrice' : 'price'" :id="listing.listingType === 'rent' ? 'rentalPrice' : 'price'" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" :class="{ 'border-red-500': errors.price }" :placeholder="listing.listingType === 'rent' ? 'ex: 50' : 'ex: 15000'">
            <p v-if="errors.price" class="mt-2 text-sm text-red-600">{{ errors.price }}</p>
          </div>

          <div class="sm:col-span-3">
            <label for="fuelType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type de carburant</label>
            <select v-model="listing.fuelType" id="fuelType" name="fuelType" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" :class="{ 'border-red-500': errors.fuelType }">
              <option value="">Sélectionnez un type de carburant</option>
              <option v-for="type in fuelTypes" :key="type" :value="type">{{ type }}</option>
            </select>
            <p v-if="errors.fuelType" class="mt-2 text-sm text-red-600">{{ errors.fuelType }}</p>
          </div>

          <div class="sm:col-span-6">
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea v-model="listing.description" id="description" name="description" rows="3" class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md" placeholder="Décrivez votre véhicule en détail..."></textarea>
          </div>

          <div class="sm:col-span-6">
            <label for="images" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Images</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="images" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Télécharger des fichiers</span>
                    <input id="images" name="images" type="file" class="sr-only" multiple @change="handleImageUpload">
                  </label>
                  <p class="pl-1">ou glisser-déposer</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
              </div>
            </div>
            <p v-if="errors.images" class="mt-2 text-sm text-red-600">{{ errors.images }}</p>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Créer l'annonce
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>