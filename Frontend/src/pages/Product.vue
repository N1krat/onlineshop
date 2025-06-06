<template>
    <navbar></navbar>
    <div class="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Image Section -->
        <div class="flex gap-4">
          <!-- Thumbnails -->
          <div class="flex flex-col gap-4">
            <img
              v-for="(img, index) in thumbnails"
              :key="index"
              :src="img"
              class="w-20 h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500"
              @click="swapImage(img)"
            />
          </div>
  
          <!-- Main Image -->
          <div class="flex-1">
            <img :src="mainImage" class="w-full max-h-[400px] object-cover rounded-xl border" />
          </div>
        </div>
  
        <!-- Product Details -->
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Awesome Product Name</h2>
          <p class="text-gray-600 mb-4">
            A short description highlighting what makes this product special.
          </p>
          <ul class="list-disc list-inside text-gray-700 mb-4">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <div class="text-xl font-semibold text-green-600 mb-4">$49.99</div>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import navbar from '../widgets/NavbarMain.vue'
  
  export default {
    name: "ProductPage",
    components: {
      navbar
    },
    data() {
      return {
        mainImage: "https://placehold.co/400x400",
        thumbnails: [
          "https://placehold.co/300x300",
          "https://placehold.co/300x300",
          "https://placehold.co/300x300",
          "https://placehold.co/300x300"
        ]
      }
    },
    methods: {
      swapImage(newSrc) {
        const currentMain = this.mainImage
        this.mainImage = newSrc
  
        // Optional: Swap back thumbnail to previous main image
        const index = this.thumbnails.findIndex(img => img === newSrc)
        if (index !== -1) {
            this.thumbnails[index] = currentMain
        }
      }
    }
  }
</script>
  
  <style scoped>
  </style>
  