<template>
    <!-- tipa navbar component -->
    <div class="all">
        <Navbar />
        <ProductList @add-to-cart="addToCart" />
        <Cart :items="cart" @remove-item="removeFromCart" />
        <!-- main pagul propriuzis -->
        <!-- Main collections -->
        <div class="section1">
            <div class="newCol p-3">
                <h1 class="text-6xl">New Devices</h1>
                <p class="text-l" id="p1">Spring</p>
                <p class="text-l" id="p2">2025</p>
            </div>

            <div class="overflow-hidden mainImages">
                <div
                    ref="carousel"
                    class="flex transition-transform duration-300 ease-in-out"
                >
                    <div class="colImages min-w-1/2 px-2">
                        <div class="image">
                            <img
                                src="../assets/images/iphone16.png"
                                alt="placeholder image"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div class="colImages min-w-1/2 px-2">
                        <div class="image h-[270px]">
                            <img
                                src="../assets/images/macbook.jpg"
                                alt="placeholder image"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <!-- Repeat 4 more times (total 6) -->
                    <div class="colImages min-w-1/2 px-2">
                        <div class="image">
                            <img
                                src="../assets/images/iphone16.png"
                                alt="placeholder image"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div class="colImages min-w-1/2 px-2">
                        <div class="image">
                            <img
                                src="../assets/images/macbook.jpg"
                                alt="placeholder image"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div class="colImages min-w-1/2 px-2">
                        <div class="image">
                            <img
                                src="../assets/images/iphone16.png"
                                alt="placeholder image"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div class="colImages min-w-1/2 px-2">
                        <div class="image">
                            <img
                                src="../assets/images/macbook.jpg"
                                alt="placeholder image"
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </button>

                    <button
                        class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        @click="prevSlide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        @click="nextSlide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- New products -->
        <div class="section2 mb-10">
            <div
                class="newProducts px-1 flex justify-between items-center mb-2"
            >
                <h1 class="text-4xl">New Products</h1>
                <router-link to="/" class="seeMoreLink">See More</router-link>
            </div>

            <div class="newProductsMain" style="margin-top: -12vh">
                <div class="w-full max-w-sm rounded-lg dark:border-gray-700">
                    <router-link to="/catalogue">
                        <img
                            class="p-8 rounded-t-lg bg-gray-50"
                            src="https://flowbite.com/docs/images/products/apple-watch.png"
                            alt="product image"
                        />
                    </router-link>
                    <div class="px-5 pb-5 pt-4">
                        <router-link to="/catalogue">
                            <h5
                                class="text-xl font-semibold tracking-tight text-black dark:text-black"
                            >
                                Apple Watch Series 7 GPS, Aluminium Case,
                                Starlight Sport
                            </h5>
                        </router-link>
                        <br />
                        <div class="flex items-center justify-between">
                            <span
                                class="text-3xl font-bold text-black dark:text-black"
                                >$599</span
                            >
                            <a
                                href="#"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Add to cart</a
                            >
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-sm rounded-lg dark:border-gray-700">
                    <router-link to="/catalogue">
                        <img
                            class="p-8 rounded-t-lg bg-gray-50"
                            src="https://flowbite.com/docs/images/products/apple-watch.png"
                            alt="product image"
                        />
                    </router-link>
                    <div class="px-5 pb-5">
                        <router-link to="/catalogue">
                            <h5
                                class="text-xl font-semibold tracking-tight text-black dark:text-black"
                            >
                                Apple Watch Series 7 GPS, Aluminium Case,
                                Starlight Sport
                            </h5>
                        </router-link>
                        <br />
                        <div class="flex items-center justify-between">
                            <span
                                class="text-3xl font-bold text-black dark:text-black"
                                >$599</span
                            >
                            <a
                                href="#"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Add to cart</a
                            >
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-sm rounded-lg dark:border-gray-700">
                    <a href="#">
                        <img
                            class="p-8 rounded-t-lg bg-gray-50"
                            src="https://flowbite.com/docs/images/products/apple-watch.png"
                            alt="product image"
                        />
                    </a>
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5
                                class="text-xl font-semibold tracking-tight text-black dark:text-black"
                            >
                                Apple Watch Series 7 GPS, Aluminium Case,
                                Starlight Sport
                            </h5>
                        </a>
                        <br />
                        <div class="flex items-center justify-between">
                            <span
                                class="text-3xl font-bold text-black dark:text-black"
                                >$599</span
                            >
                            <a
                                href="#"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Add to cart</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mostPopular mt-30 mx-4">
            <h2 class="text-5xl font-bold mx-20 mb-40">
                Our Most Popular Products
            </h2>

            <div class="popularProductsMain" style="margin-top: -12vh">
                <div class="w-full max-w-sm rounded-lg dark:border-gray-700">
                    <a href="#">
                        <img
                            class="p-8 rounded-t-lg bg-gray-50"
                            src="https://flowbite.com/docs/images/products/apple-watch.png"
                            alt="product image"
                        />
                    </a>
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5
                                class="text-xl font-semibold tracking-tight text-black dark:text-black"
                            >
                                Apple Watch Series 7 GPS, Aluminium Case,
                                Starlight Sport
                            </h5>
                        </a>
                        <br />
                        <div class="flex items-center justify-between">
                            <span
                                class="text-3xl font-bold text-black dark:text-black"
                                >$599</span
                            >
                            <a
                                href="#"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Add to cart</a
                            >
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-sm rounded-lg dark:border-gray-700">
                    <a href="#">
                        <img
                            class="p-8 rounded-t-lg bg-gray-50"
                            src="https://flowbite.com/docs/images/products/apple-watch.png"
                            alt="product image"
                        />
                    </a>
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5
                                class="text-xl font-semibold tracking-tight text-black dark:text-black"
                            >
                                Apple Watch Series 7 GPS, Aluminium Case,
                                Starlight Sport
                            </h5>
                        </a>
                        <br />
                        <div class="flex items-center justify-between">
                            <span
                                class="text-3xl font-bold text-black dark:text-black"
                                >$599</span
                            >
                            <a
                                href="#"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >Add to cart</a
                            >
                        </div>
                    </div>
                </div>

                <div
                    v-for="product in products"
                    :key="product.id"
                    class="w-full max-w-sm rounded-lg dark:border-gray-700"
                >
                    <a href="#">
                        <img
                            class="p-8 rounded-t-lg bg-gray-50"
                            src="https://flowbite.com/docs/images/products/apple-watch.png"
                            alt="product image"
                        />``
                    </a>
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5
                                class="text-xl font-semibold tracking-tight text-black dark:text-black"
                            >
                                {{ product.name }}
                            </h5>
                        </a>
                        <br />
                        <div class="flex items-center justify-between">
                            <span
                                class="text-3xl font-bold text-black dark:text-black"
                                >{{ product.price }}</span
                            >
                            <button
                                @click="addToCart(product)"
                                href="#"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="mt-20">
            <div class="footerDivs p-6">
                <div class="info text-xl p-3">Info</div>
                <div class="links text-xl p-3">Email</div>
                <div class="contact text-xl p-3">Contact</div>
                <div class="logo">
                    <span class="text-xl p-3">Our brand</span>
                </div>
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
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import axios from "axios";

// Cart state (reactive)
const products = ref([]);
const cart = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:3000/products");
        products.value = response.data;
        console.log("Products loaded:", products.value);
    } catch (err) {
        console.error("Error fetching products:", err);
    }
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart.value = JSON.parse(savedCart);
    }
});
watch(
    cart,
    (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
    },
    { deep: true },
);

// Add product to cart
function addToCart(product) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Trebuie să fii logat pentru a adăuga în coș.");
        return;
    }

    const cartKey = `cart_${token}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = storedCart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(storedCart));
    console.log("Cart updated:", storedCart);
}

// Carousel logic
const carousel = ref(null);
let currentIndex = 0;

const prevSlide = () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarouselPosition();
    }
};

const nextSlide = () => {
    const maxIndex = 6 - 2; // total slides - visible items
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarouselPosition();
    }
};

const updateCarouselPosition = () => {
    const slideWidth = carousel.value.offsetWidth / 2; // assuming 2 visible slides
    carousel.value.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
};

// Button to go to shop
function goToShop() {
    window.location.href = "/catalogue";
}
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
    gap: 1vw;
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
    margin-top: 20px;
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
</style>
