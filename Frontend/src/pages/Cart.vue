<template> 
    <navbar></navbar>
        <div class="grid grid-cols-3 grid-rows-1 gap-3">
            <div class="main col-span-2 p-12 mr-10 mt-2 mx-10 bg-gray-300 shadow-md shadow-gray-400 ">
                <div class="col-span-3">
                    <h1 class="text-4xl font-bold">Products in your cart</h1>
                </div>
                <div class="products grid  gap-3  p-3 ">
                    <div class="product bg-blue-400 shadow-md shadow-gray-400" v-for="i in 3">
                        <img src="https://placehold.co/350x350">
                        <h2>Product</h2>
                        <h3>Price</h3>
                    </div>
                </div>
            </div>
    
    
            <div class="checkOut p-12 mr-10 mt-2 bg-gray-300 shadow-md shadow-gray-400 ">
                <h1 class="text-4xl font-bold">Your checkout</h1>
                <p>Total price: </p>
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
    
    </script>
    
    <style> 
    
    </style>
    
    