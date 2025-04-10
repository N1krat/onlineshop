<template>
  <nav class="p-1">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
      <img src="https://placehold.co/75x75">
      <div class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-transparent">
        
        <ul class="flex flex-col p-2 mt-2 font-medium border border-gray-100 rounded-full md:flex-row md:gap-2 md:mt-0 md:border-0 md:bg-white dark:bg-transparent dark:border-gray-700">
        <li>
          <router-link to="/" class="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 hover:text-black dark:hover:bg-transparent dark:border-gray-700">Home</router-link>
        </li>
        <li class="text-black">
          Catalogue
        </li>
        <li>
          <router-link to="/login" class="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 hover:text-black dark:hover:bg-transparent dark:border-gray-700">Login</router-link>
        </li>
        <li>
          <router-link to="/register" class="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 hover:text-black md:dark:hover:text-blue-500 dark:hover:bg-transparent dark:border-gray-700">Register</router-link>
        </li>
      </ul>
      </div>


      <div class="relative hidden md:block w-[400px]">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
          </svg>
        </div>
        <input type="text" id="search-navbar" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300" placeholder="Search...">
      </div>


      <ul class="flex flex-col p-2 mt-2 font-medium border border-gray-100 rounded-full md:flex-row md:gap-2 md:mt-0 md:border-0">
        <li>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
            <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 3.22l-.61-.62a5.5 5.5 0 0 0-7.78 7.77L10 18.06l8.39-8.39a5.5 5.5 0 0 0-7.78-7.77z"/></svg>
          </button>
        </li>
        <li>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Cart
          </button>
        </li>
        <li>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>

</style>

