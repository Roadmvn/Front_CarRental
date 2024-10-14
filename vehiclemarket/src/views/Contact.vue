<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const submitForm = () => {
  // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
  console.log('Formulaire soumis', { name: name.value, email: email.value, message: message.value })
  // Réinitialiser le formulaire après soumission
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-6">Contactez-nous</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p class="mb-4">Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter. Notre équipe est là pour vous aider.</p>
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Adresse</h2>
          <p>123 Rue du Commerce<br>75001 Paris, France</p>
        </div>
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Téléphone</h2>
          <p>+33 1 23 45 67 89</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-2">Email</h2>
          <p>contact@vehiclemarket.com</p>
        </div>
      </div>
      <div>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
            <input v-model="name" type="text" id="name" name="name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input v-model="email" type="email" id="email" name="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea v-model="message" id="message" name="message" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          </div>
          <div>
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>