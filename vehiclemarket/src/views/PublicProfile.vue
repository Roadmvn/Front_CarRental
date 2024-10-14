<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useReviewStore } from '../stores/review'
import { useVehicleStore } from '../stores/vehicle'
import VehicleCard from '../components/VehicleCard.vue'
import ReviewCard from '../components/ReviewCard.vue'

const route = useRoute()
const userStore = useUserStore()
const reviewStore = useReviewStore()
const vehicleStore = useVehicleStore()

const user = ref(null)
const reviews = ref([])
const newReview = ref({ rating: 0, comment: '' })

onMounted(async () => {
  const userId = Number(route.params.id)
  user.value = await userStore.getUserById(userId)
  reviews.value = await reviewStore.getReviewsForUser(userId)
})

const userListings = computed(() => {
  if (!user.value) return []
  return vehicleStore.getListings().filter(listing => listing.sellerId === user.value.id)
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const submitReview = async () => {
  if (newReview.value.rating && newReview.value.comment) {
    await reviewStore.addReview({
      userId: user.value.id,
      ...newReview.value,
      date: new Date().toISOString()
    })
    reviews.value = await reviewStore.getReviewsForUser(user.value.id)
    newReview.value = { rating: 0, comment: '' }
  }
}
</script>

<template>
  <div v-if="user" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
          {{ user.username }}
        </h2>
        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">Profil public</p>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ user.email }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Membre depuis</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ new Date(user.createdAt).toLocaleDateString() }}</dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Note moyenne</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ averageRating }} / 5 ({{ reviews.length }} avis)</dd>
          </div>
        </dl>
      </div>
    </div>

    <h3 class="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Annonces de {{ user.username }}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <VehicleCard v-for="listing in userListings" :key="listing.id" v-bind="listing" />
    </div>

    <h3 class="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Avis sur {{ user.username }}</h3>
    <div class="space-y-4">
      <ReviewCard v-for="review in reviews" :key="review.id" v-bind="review" />
    </div>

    <h4 class="text-lg font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Laisser un avis</h4>
    <form @submit.prevent="submitReview" class="space-y-4">
      <div>
        <label for="rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Note</label>
        <select v-model="newReview.rating" id="rating" required class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option value="1">1 étoile</option>
          <option value="2">2 étoiles</option>
          <option value="3">3 étoiles</option>
          <option value="4">4 étoiles</option>
          <option value="5">5 étoiles</option>
        </select>
      </div>
      <div>
        <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Commentaire</label>
        <textarea v-model="newReview.comment" id="comment" rows="3" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
      </div>
      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Soumettre l'avis
      </button>
    </form>
  </div>
</template>