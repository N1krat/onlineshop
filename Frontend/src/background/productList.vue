<template>
    <div>
        <h2 class="text-xl font-semibold mb-2">Products</h2>
        <div
            v-for="product in products"
            :key="product.id"
            class="mb-2 p-2 border rounded"
        >
            <div class="flex justify-between items-center">
                <div>
                    <p>{{ product.name }}</p>
                    <p class="text-sm text-gray-500">${{ product.price }}</p>
                </div>
                <button
                    @click="$emit('add-to-cart', product)"
                    class="px-2 py-1 bg-blue-500 text-white rounded"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 499 },
    { id: 3, name: "Headphones", price: 199 },
];
</script>
