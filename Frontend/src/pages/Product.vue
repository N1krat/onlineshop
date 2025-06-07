<template>
    <div class="all">
    <navbar></navbar>
    <div class="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Image Section -->
        <div class="flex gap-4">
          <!-- Thumbnails -->
          <div class="flex flex-col gap-4">
            <img
              v-for="(img, index) in currentProductImages.slice(1)"
              :key="index"
              :src="img"
              class="w-20 h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500"
              @click="swapImage(index + 1)"
            />
          </div>
  
          <!-- Main Image -->
          <div class="flex-1">
            <img v-if="currentProductImages?.[0]" :src="currentProductImages?.[0]" class="w-full max-h-[400px] object-cover rounded-xl border" />
          </div>
        </div>
  
        <!-- Product Details -->
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ currentProduct?.name }}</h2>
          <p class="text-gray-600 mb-4">
            {{ currentProduct?.description }}
          </p>
          <div class="text-xl font-semibold text-green-600 mb-4">{{ currentProduct?.price }} MDL</div>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import navbar from '../widgets/NavbarMain.vue'
  import axios from 'axios';
  export default {
    name: "ProductPage",
    components: {
      navbar
    },
    data() {
      return {
        currentProductImages: []
      }
    },
    methods: {
      swapImage(index) {
        const temp = this.currentProductImages[0]

        this.currentProductImages[0] = this.currentProductImages[index]; 
        this.currentProductImages[index] = temp
      },
    },
    async mounted() {
      const productId = this.$route.params.id;
      try {
        const resImg = await axios.get(`http://localhost:3000/uploads/${productId}`);
        const resProd = await axios.get(`http://localhost:3000/products/${productId}`);
        this.currentProductImages = (resImg.data || []).filter(img => img.image).map(img => `http://localhost:3000/uploads/${img.image}`);
        this.currentProduct = resProd.data; 
      } catch (error) {
        console.error('Error loading product images:', error);
      }
    }
  }
</script>
  
  <style scoped>
  </style>

