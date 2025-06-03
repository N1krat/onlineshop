<template>
    <nav class="navbar">
        <div class="top p-4 mx-12 mt-6 bg-gray-300 shadow-md shadow-gray-400 grid grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-10">
            <h1 class="text-2xl font-bold sm:col-span-9 md:col-span-9">Welcome to the admin panel!</h1>
            <button @click="$router.push('/login')" type="button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition ease-in-out duration-300 sm:col-span-1 md:col-span-1">Log out</button>
        </div>

        <div class="utility p-12 mx-12 mt-6 bg-gray-300 shadow-md shadow-gray-400">
            <p class="text-2xl font-bold">What will you choose to do?</p>
            
            <div class="adminActions grid grid-rows-1 grid-cols-4 sm:grid-cols-2 md:grid-cols-10">
                <div></div>
                <div class="col-span-3 sm:col-span-2 md:col-span-3">
                    <button @click="$router.push('/admin/products')" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition ease-in-out duration-300 col-span-1 md:col-span-2" >Show Products</button>
                </div>
                <div class="col-span-3 sm:col-span-2 md:col-span-3">
                    <button @click="$router.push('/admin/users')" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition ease-in-out duration-300 col-span-1 md:col-span-2">Show Users</button>
                </div>
                <div class="col-span-3 sm:col-span-2 md:col-span-3">
                    <button @click="$router.push('/admin/orders')" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition ease-in-out duration-300 col-span-1 md:col-span-2">Show Orders</button>
                </div>
            </div>
        </div>
    </nav>

    <div class="adminPages p-4 mx-12 mt-6 bg-gray-300 shadow-md shadow-gray-400">

        <router-view />

    </div>
</template>

<script>


export default {
  name: "AdminMain"
}
</script>
