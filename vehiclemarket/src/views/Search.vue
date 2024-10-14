<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VehicleCard from '../components/VehicleCard.vue'
import { useVehicleStore } from '../stores/vehicle'

const route = useRoute()
const router = useRouter()
const vehicleStore = useVehicleStore()

const searchQuery = ref('')
const minPrice = ref(0)
const maxPrice = ref(100000)
const brand = ref('')
const model = ref('')
const yearMin = ref(1900)
const yearMax = ref(new Date().getFullYear())
const mileageMin = ref(0)
const mileageMax = ref(500000)
const fuelType = ref('')
const searchType = ref('all')

const fuelTypes = ['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL']
const brands = ['Audi', 'BMW', 'Citroën', 'Ford', 'Mercedes', 'Peugeot', 'Renault', 'Toyota', 'Volkswagen']

const filteredListings = computed(() => {
  return vehicleStore.getListings().filter(listing => {
    const matchesQuery = listing.brand.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         listing.model.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesPrice = listing.price >= minPrice.value && listing.price <= maxPrice.value
    const matchesBrand = brand.value === '' || listing.brand.toLowerCase() === brand.value.toLowerCase()
    const matchesModel = model.value === '' || listing.model.toLowerCase() === model.value.toLowerCase()
    const matchesYear = listing.year >= yearMin.value && listing.year <= yearMax.value
    const matchesMileage = listing.mileage >= mileageMin.value && listing.mileage <= mileageMax.value
    const matchesFuelType = fuelType.value === '' || listing.fuelType === fuelType.value
    const matchesListingType = searchType.value === 'all' || listing.listingType === searchType.value

    return matchesQuery && matchesPrice && matchesBrand && matchesModel && 
           matchesYear && matchesMileage && matchesFuelType && matchesListingType
  })
})

const updateSearchParams = () => {
  router.push({
    query: {
      q: searchQuery.value,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      brand: brand.value,
      model: model.value,
      yearMin: yearMin.value,
      yearMax: yearMax.value,
      mileageMin: mileageMin.value,
      mileageMax: mileageMax.value,
      fuelType: fuelType.value,
      type: searchType.value
    }
  })
}

onMounted(() => {
  // Set initial values from route query parameters
  searchQuery.value = route.query.q as string || ''
  minPrice.value = Number(route.query.minPrice) || 0
  maxPrice.value = Number(route.query.maxPrice) || 100000
  brand.value = route.query.brand as string || ''
  model.value = route.query.model as string || ''
  yearMin.value = Number(route.query.yearMin) || 1900
  yearMax.value = Number(route.query.yearMax) || new Date().getFullYear()
  mileageMin.value = Number(route.query.mileageMin) || 0
  mileageMax.value = Number(route.query.mileageMax) || 500000
  fuelType.value = route.query.fuelType as string || ''
  searchType.value = route.query.type as string || 'all'
})

watch([searchQuery, minPrice, maxPrice, brand, model, yearMin, yearMax, mileageMin, mileageMax, fuelType, searchType], () => {
  updateSearchParams()
})
</script>

<template>
  <div class="search-page bg-gray-100 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
        Résultats de recherche
      </h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters -->
        <div class="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filtres</h3>
          <div class="space-y-4">
            <div>
              <label for="searchQuery" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Recherche</label>
              <input v-model="searchQuery" type="text" id="searchQuery" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="minPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Prix minimum</label>
              <input v-model="minPrice" type="number" id="minPrice" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="maxPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Prix maximum</label>
              <input v-model="maxPrice" type="number" id="maxPrice" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            </div>
            <div>
              <label for="brand" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Marque</label>
              <select v-model="brand" id="brand" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Toutes les marques</option>
                <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
              </select>
            </div>
            <div>
              <label for="fuelType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type de carburant</label>
              <select v-model="fuelType" id="fuelType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Tous les types</option>
                <option v-for="type in fuelTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <div>
              <label for="searchType" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type d'annonce</label>
              <select v-model="searchType" id="searchType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="all">Tous</option>
                <option value="sale">À vendre</option>
                <option value="rent">À louer</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Search Results -->
        <div class="lg:col-span-3">
          <div v-if="filteredListings.length === 0" class="text-center py-12">
            <p class="text-xl text-gray-600 dark:text-gray-400">Aucun résultat trouvé pour votre recherche.</p>
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <VehicleCard v-for="vehicle in filteredListings" :key="vehicle.id" v-bind="vehicle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>