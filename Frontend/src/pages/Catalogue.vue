<template>
<div class="all">
<Navbar></Navbar>


<div class="parent m-15 p-4">
    <div class="toDiv">
        <h2 class="text-4xl">Our Products</h2>
    </div>
    
    <div class="filters">

        <form class=" border-t border-gray-200">
            <h3 class="sr-only">Categories</h3>
            <ul role="list" class="px-2 py-3 font-medium text-gray-900">
              <li>
                <a href="#" class="block px-2 py-3">Laptops</a>
              </li>
              <li>
                <a href="#" class="block px-2 py-3">Phones</a>
              </li>
              <li>
                <a href="#" class="block px-2 py-3">Headphones</a>
              </li>
              <li>
                <a href="#" class="block px-2 py-3">Chargers</a>
              </li>
              <li>
                <a href="#" class="block px-2 py-3">Accessories</a>
              </li>
            </ul>

            
              
          </form>

    </div>

    <div class="products p-2">
                
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <div v-for="product in products" :key="product.id" class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <router-link :to="`/product/${product.id}`">
      <img class="p-8 rounded-t-lg" :src="product.image" alt="product image" />
    </router-link>
    <div class="px-5 pb-5">
      <router-link :to="`/product/${product.id}`">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {{ product.name }}
        </h5>
      </router-link>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
        <router-link to="/cart" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add to cart
        </router-link>
      </div>
    </div>
  </div>
</div>


    </div>
</div>
</div> 

</template>

<script>
import Navbar from '../widgets/NavbarMain.vue'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import axios from 'axios'; 

export default { 
    name: "CataloguePage",
    components: { 
        Navbar,
    },
    setup() {
        const products = ref([]);

        onMounted(() => {
          axios.get('http://localhost:3000/products')
            .then(response => {
              products.value = response.data;
            })
            .catch(error => {
              console.error('Error fetching products:', error);
            });
        });

        onBeforeUnmount(() => {
          products.value = [];
        });

        return {
            products
        };
    },
}

</script>

<style>

.parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 8px;
}
    
.toDiv {
    grid-column: span 4 / span 4;
}

.filters {
    grid-row: span 4 / span 4;
    grid-row-start: 2;
}

.products {
    grid-column: span 3 / span 3;
    grid-row: span 4 / span 4;
    grid-row-start: 2;

    padding: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    
}
        
</style>
