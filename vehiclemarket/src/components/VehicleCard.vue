<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  id: number;
  title: string;
  price: number;
  image: string;
  year: number;
  mileage: number;
  fuelType: string;
  listingType: 'sale' | 'rent';
}>();

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(props.price);
});

const formattedMileage = computed(() => {
  return new Intl.NumberFormat('fr-FR').format(props.mileage);
});

const navigateToDetails = () => {
  router.push({ name: 'VehicleDetails', params: { id: props.id } });
};
</script>

<template>
  <div class="vehicle-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full">
    <div class="relative flex-shrink-0" style="height: 200px;">
      <img :src="image" :alt="title" class="w-full h-full object-cover">
      <div :class="[
        'absolute top-0 left-0 px-2 py-1 m-2 rounded-md text-sm font-semibold',
        listingType === 'rent' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
      ]">
        {{ listingType === 'rent' ? 'À louer' : 'À vendre' }}
      </div>
    </div>
    <div class="p-4 flex-grow flex flex-col justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
        <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          {{ listingType === 'rent' ? `${formattedPrice}/jour` : formattedPrice }}
        </p>
      </div>
      <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
        <span>{{ year }}</span>
        <span>{{ formattedMileage }} km</span>
        <span>{{ fuelType }}</span>
      </div>
    </div>
    <div class="p-4 bg-gray-50 dark:bg-gray-700">
      <button @click="navigateToDetails" class="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-600">
        Voir les détails
      </button>
    </div>
  </div>
</template>