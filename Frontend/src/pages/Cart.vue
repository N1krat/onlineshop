<template> 
<div class="all">
    <navbar></navbar>

        <div class="grid grid-cols-3 grid-rows-1 gap-3">
            <div class="main col-span-2 p-12 mr-10 mt-2 mx-10 bg-gray-300 shadow-md shadow-gray-400 ">
                <div class="col-span-3">
                    <h1 class="text-4xl font-bold">Products in your cart</h1>
                </div>
                <div class="products grid  gap-3  p-3 ">
                    <div class="product bg-blue-400 shadow-md shadow-gray-400"  v-for="item in cart" :key="item.id">
                        <img src="https://placehold.co/350x350">
                        <h2>{{item.name}}</h2>
                        <h3>{{ item.price }}</h3>
                    </div>
                </div>
            </div>
    
            <div class="checkOut p-12 mr-10 mt-2 bg-gray-300 shadow-md shadow-gray-400">
                <h1 class="text-4xl font-bold">Your checkout</h1>
                <p>Total price: {{ totalPrice }} $ </p>
            </div>
        </div>
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
import { ref, onMounted, computed } from 'vue'

const cart = ref([])

const totalPrice = computed(() => 
    cart.value.reduce((sum,item) => sum + item.price * item.quantity, 0)
)

onMounted(() => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cart.value = JSON.parse(savedCart)
    console.log('📦 Cart loaded on Cart.vue:', cart.value)
  }
})
</script>
    
    <style> 
    
    </style>
    
    