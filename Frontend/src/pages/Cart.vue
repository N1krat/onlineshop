
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

<template>
    <navbar></navbar>
    <template>
        <div class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Cart</h2>
            <div v-if="items.length === 0">Cart is empty.</div>
            <div v-else>
                <div
                    v-for="item in items"
                    :key="item.id"
                    class="mb-2 p-2 border rounded"
                >
                    <div class="flex justify-between items-center">
                        <div>{{ item.name }} (x{{ item.quantity }})</div>
                        <button
                            @click="$emit('remove-item', item.id)"
                            class="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <p class="mt-2 font-bold">Total: ${{ total }}</p>
            </div>
        </div>
    </template>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
    items: Array,
});


const total = computed(() =>
    props.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);
</script>
<script>

import navbar from '../widgets/NavbarMain.vue'
export default { 

import navbar from "../widgets/NavbarMain.vue";

export default {

    name: "CartPage",
    components: {
        navbar,
    },
};
</script>
<script setup>
import { useCartStore } from '../features/stores/cart.js';
const cart = useCartStore();
</script>


<style> 

</style>

