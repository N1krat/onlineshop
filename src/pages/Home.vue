<template>
  <!-- tipa navbar component -->
  <Navbar />
  
  <!-- main pagul propriuzis -->
      <!-- Main collections -->
      <div class="section1">
          <div class="newCol p-4">
            <h1 class="text-6xl">New Collection</h1>
            <p class="text-l" id="p1">Spring</p>
            <p class="text-l" id="p2">2025</p>
          </div>

          <div class="colImages">
            <div class="image">
              <img src="https://placehold.co/500x500" alt="placeholder image">
            </div>
          </div>

          <div class="colImages">
            <div class="image">
              <img src="https://placehold.co/500x500" alt="placeholder image">
            </div>
          </div>

          <div class="newcolButtons">
            <div class="buttons p-2"> 
              <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
                Go To Shop
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
      </div>

      <!-- New products -->
      <div class="section2 mt-20 mx-4">
        <div class="newProducts px-3 flex justify-between items-center">
          <h1 class="text-5xl">New Products</h1>
          <router-link to="/" class="seeMoreLink">See More</router-link>
        </div>

        <div class="newProductsMain">
          

<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/products/apple-watch.png" alt="product image" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
    </div>
</div>

        </div>


        <div class="nextProduct">3</div>
    
      </div>
      
</template> 

<script>
import Navbar from '../widgets/NavbarMain.vue';

export default {
  name: "HomePage",
  components: {
    Navbar
  }
  
}
</script>

<style>
/* section1 */
.section1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 15px;
    padding: 10px;
    color: white;
    margin-top: 10vh;
    margin-right: 10vh;
    margin-left: 10vh;
}
     
.newCol {
    color: rgb(67, 67, 67);
    grid-row: span 2 / span 2;
    padding-bottom: 100px;
}

.newCol h1 { 
  font-family: 'Beatrice Headline Trial', sans-serif;
  font-weight: bold;
}

#p1 { 
  font-family: 'Beatrice Deck Trial', sans-serif;
  font-weight: normal;
}

#p2 { 
  font-family: 'Beatrice Deck Trial', sans-serif;
  font-weight: normal;
}

.colImages {
    background-color: blue;
    grid-row: span 3 / span 3;
}

.newColButtons {
    background-color: green;
    grid-row: span 3 / span 3;
}

.newColButtons {
    display: flex;
    align-items: center;
    grid-row-start: 3;
    color: black;
  
}

.newColButtons button { 
  margin-right: 20px;
}

/* section2 */
.section2 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 15px;
    padding: 10px;
    margin-top: 10vh;
    margin-right: 10vh;
    margin-left: 10vh;
}
    
.newProducts {
    grid-column: span 4 / span 4;
}

.newProducts h1 { 
  font-family: 'Beatrice Headline Trial', sans-serif;
  font-weight: bold;
}

.seeMoreLink { 
  font-family: 'Beatrice Deck Trial', sans-serif;
  font-weight: normal;
}

.newProductsMain {
    grid-column: span 4 / span 4;
    grid-row-start: 2;
    background-color: bisque;
}

.nextProduct {
    grid-column: span 4 / span 4;
    grid-row-start: 3;
    background-color: rgb(169, 104, 25);
}
        

body {
  background: repeating-linear-gradient(
    0deg,
    #222 0px,
    #222 10px,
    #444 10px,
    #444 20px
  ),
  repeating-linear-gradient(
    90deg,
    #222 0px,
    #222 10px,
    #444 10px,
    #444 20px
  );
  background-size: 20px 20px;
}

body {
  background-image: url("public/Figma_51SJBfcZB1.png"); /* Use the uploaded image */
  background-size: cover; /* Adjust to fill the entire page */
  background-repeat: repeat; /* Repeat the texture */
  background-position: center;
}

        
</style>
