<template> 
<navbar></navbar>

    <div class="main p-12 m-12 bg-gray-300 shadow-md shadow-gray-400">
        <h1 class="text-3xl font-bold">Your cart:</h1>
        <ul>
            <li v-for="item in cart.items" :key="item.id">
                {{ item.name }} - Quantity: {{ item.quantity }} - Price: ${{ item.price }}
            </li>
        </ul>
        <p class="font-semibold">Total: ${{ cart.total }}</p>
    </div>

</template> 

<script>
import navbar from '../widgets/NavbarMain.vue'
export default { 
    name: "CartPage",
    components: {
        navbar
    }
}
</script>
<script setup>
import { useCartStore } from '../features/stores/cart.js';
const cart = useCartStore();
</script>

<style> 

</style>

