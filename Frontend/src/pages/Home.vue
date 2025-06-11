<template>
    <div class="all">
        <Navbar />
        <ProductList @add-to-cart="addToCart" />
        <Cart :items="cart" @remove-item="removeFromCart" />

        <!-- Carousel Section -->
        <div class="section1">
            <div class="newCol p-3">
                <h1 class="text-6xl">New Products</h1>
                <p class="text-l" id="p1">Spring</p>
                <p class="text-l" id="p2">2025</p>
            </div>

            <div class="overflow-hidden mainImages">
                <div
                    ref="carousel"
                    class="flex transition-transform duration-300 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                >
                    <div
                        v-for="(product, index) in products.slice(0, 6)"
                        :key="index"
                        class="colImages min-w-1/2 px-2"
                    >
                        <div class="image h-[270px]">
                            <img
                                :src="product.image"
                                alt="product image"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="newcolButtons">
                <div class="buttons inline-flex space-x-3">
                    <button
                        @click="goToShop"
                        class="bg-white mr-20 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow"
                    >
                        <span class="mr-5">Go To Shop</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </button>
                    <button
                        class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        @click="prevSlide"
                    >
                        ◀
                    </button>
                    <button
                        class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        @click="nextSlide"
                    >
                        ▶
                    </button>
                </div>
            </div>
        </div>

        <!-- New Products -->
        <div class="section2 ">
            <div class="newProducts px-1 flex justify-between items-center">
                <h1 class="text-4xl m-0 p-0">New Products</h1>
                <router-link to="/" class="seeMoreLink">See More</router-link>
            </div>

            <div class="newProductsMain mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div
                    v-for="product in limitedProducts"
                    :key="product.id"
                    class="bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <img
                        v-if="product.image"
                        :src="product.image"
                        class="p-8 rounded-t-lg bg-gray-50 object-contain h-64 w-full"
                        alt="product image"
                    />
                    <div class="px-5 pb-5">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900">
                            {{ product.name }}
                        </h5>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-3xl font-bold text-gray-900">
                                {{ product.price }} MDL
                            </span>
                            <button
                                @click="addToCart(product)"
                                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Most Popular Products -->
        <div class="mostPopular mt-30 mx-4">
            <h2 class="text-5xl font-bold mx-20 mb-12">Our Most Popular Products</h2>
            <div class="popularProductsMain grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    v-for="product in limitedpopProducts"
                    :key="product.id"
                    class="bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                    <img
                        :src="product.image"
                        class="p-8 bg-gray-50 rounded-t-lg h-64 w-full object-contain"
                        alt="product image"
                    />
                    <div class="px-5 pb-5">
                        <h5 class="text-xl font-semibold tracking-tight text-black">
                            {{ product.name }}
                        </h5>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-3xl font-bold text-black">
                                {{ product.price }} MDL
                            </span>
                            <button
                                @click="addToCart(product)"
                                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="mt-20">
            <div class="footerDivs p-6">
                <div class="info text-xl p-3">Info</div>
                <div class="links text-xl p-3">Email: Platforma</div>
                <div class="contact text-xl p-3">Contact: 034343334</div>
                <div class="email text-xl p-3">Email: platforma@gmail.com</div>
            </div>
        </footer>
    </div>
</template>

<script>
import Navbar from "../widgets/NavbarMain.vue";

export default {
    name: "HomePage",
    components: {
        Navbar,
    },
};
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// State
const products = ref([]);
const cart = ref([]);
const currentIndex = ref(0);
const router = useRouter();

// Limiting product displays
const limitedProducts = computed(() => products.value.slice(0, 3));
const limitedpopProducts = computed(() => products.value.slice(0, 4));

// Carousel control
function nextSlide() {
    if (currentIndex.value < products.value.length - 1) currentIndex.value++;
}

function prevSlide() {
    if (currentIndex.value > 0) currentIndex.value--;
}

// Cart management
function addToCart(product) {
    const existing = cart.value.find((p) => p.id === product.id);
    if (!existing) {
        cart.value.push({ ...product, quantity: 1 });
    } else {
        existing.quantity++;
    }
}

function removeFromCart(productId) {
    cart.value = cart.value.filter((p) => p.id !== productId);
}

// Shop navigation
function goToShop() {
    router.push("/shop");
}

// On mount
onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:3000/products");
        const fetchedProducts = response.data;

        const productsWithImages = await Promise.all(
            fetchedProducts.map(async (product) => {
                try {
                    const res = await axios.get(`http://localhost:3000/uploads/${product.id}`);
                    const firstImage = res.data.length > 0 ? res.data[0].image : null;
                    product.image = firstImage
                        ? `http://localhost:3000/uploads/${firstImage}`
                        : null;
                } catch (err) {
                    console.error(`Error fetching image for product ${product.id}:`, err);
                    product.image = null;
                }
                return product;
            })
        );

        products.value = productsWithImages;

        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            cart.value = JSON.parse(savedCart);
        }
    } catch (err) {
        console.error("Error fetching products:", err);
    }
});

// Persist cart
watch(cart, (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
}, { deep: true });

// Cleanup
onBeforeUnmount(() => {
    products.value = [];
});
</script>

<style>
/* section1 */
.section1 {
    display: grid;
    grid-template-columns: 1fr 2fr; /* Two columns: text/buttons on the left, images on the right */
    grid-template-rows: auto auto auto; /* Define three rows */
    gap: 15px;
    padding: 10px;
    color: white;
    margin-top: 1vh;
    margin-right: 10vh;
    margin-left: 10vh;
}

.newCol {
    color: rgb(67, 67, 67);
    grid-column: 1; /* Place in the first column */
    grid-row: 1 / span 2; /* Spanning two rows */
    padding-bottom: 100px;
}

.newCol h1 {
    font-family: "Beatrice Headline Trial", sans-serif;
    font-weight: bold;
}

#p1 {
    font-family: "Beatrice Deck Trial", sans-serif;
    font-weight: normal;
}

#p2 {
    font-family: "Beatrice Deck Trial", sans-serif;
    font-weight: normal;
}
.mainImages {
    grid-column: 2; /* Move images to the right column */
    grid-row: 1 / span 3;
}
.newColButtons {
    grid-column: 1; /* Place buttons on the left */
    grid-row: 3; /* Below header and text */
    display: flex;
    align-items: center;
}
.newColButtons button {
    margin-right: 20px;
}

/* section2 */
.section2 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 10px;
    margin-right: 10vh;
    margin-left: 10vh;
}

.newProducts {
    grid-column: span 4 / span 4;
}

.newProducts h1 {
    font-family: "Beatrice Headline Trial", sans-serif;
    font-weight: bold;
}

.seeMoreLink {
    font-family: "Beatrice Deck Trial", sans-serif;
    font-weight: normal;
}

.newProductsMain {
    grid-column: span 4 / span 4;
    grid-row-start: 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

body {
    background:
        repeating-linear-gradient(
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

    font-family: "Beatrice Deck Trial", sans-serif;
    font-weight: normal;
}

body {
    background-image: url("/Figma_51SJBfcZB1.png"); /* Use the uploaded image */
    background-size: cover; /* Adjust to fill the entire page */
    background-repeat: repeat; /* Repeat the texture */
    background-position: center;
}

/* popular products */
.popularProductsMain {
    grid-column: span 4 / span 4;
    grid-row-start: 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1vw;
}

/* footer */

footer {
    margin-top: 10vh;
    font-family: "Beatrice Deck Trial", sans-serif;
    font-weight: normal;
    text-align: center;
    background-color: beige;
    width: 100%;
}

.footerDivs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
}

.links {
    grid-column-start: 1;
    grid-row-start: 2;
}

.contact {
    grid-column-start: 2;
    grid-row-start: 1;
}


/* Carousel images */
.colImages .image {
  width: 100%;       /* full width of parent */
  height: 450px;     /* fixed height */
  overflow: hidden;  /* crop overflow */
}

.colImages img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* cover area without stretching */
}

/* Product list images (New Products & Most Popular) */
.newProductsMain img,
.popularProductsMain img {
  width: 100%;
  height: 350px;      /* fixed height */
  object-fit: cover;  /* maintain aspect ratio and crop */
  border-radius: 0.5rem; /* rounded corners matching your design */
  background-color: #f9fafb; /* fallback bg for images with transparency */
} 

.newProductsMain img,
.popularProductsMain img {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* subtle shadow effect */
}




</style>








      
