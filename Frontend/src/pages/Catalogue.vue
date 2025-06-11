<template>
    <div class="all">
        <Navbar></Navbar>

        <div class="parent m-15 p-4">
            <div class="toDiv">
                <h2 class="text-4xl">Our Products</h2>
            </div>

            <div class="p-4 max-w-screen-lg mx-auto">
                <!-- 🔍 Search -->
                <input
                    v-model="searchTerm"
                    placeholder="Caută produs..."
                    class="border p-2 w-full mb-4 rounded"
                />

                <!-- 🏷️ Categorie -->
                <select
                    v-model="selectedCategory"
                    class="border p-2 w-full mb-4 rounded"
                >
                    <option value="">Toate categoriile</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                        {{ cat }}
                    </option>
                </select>

                <!-- 💸 Preț -->
                <div class="mb-4">
                    <label>Preț maxim: {{ maxPrice }} lei</label>
                    <input
                        type="range"
                        v-model="maxPrice"
                        min="0"
                        :max="priceLimit"
                        class="w-full"
                    />
                </div>

                <!-- 📦 Produse -->
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                        v-for="product in filteredProducts"
                        :key="product.id"
                        class="border p-4 rounded shadow"
                    >
                        <h2 class="text-lg font-bold">{{ product.name }}</h2>
                        <p>{{ product.category }} - {{ product.price }} lei</p>
                    </div>
                </div>
            </div>

            <div class="products p-2">
                <div class="products p-2 w-full">
                    <div
                        v-for="product in filteredProducts"
                        :key="product.id"
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6"
                    >
                        <div
                            class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                        >
                            <router-link :to="`/product/${product.id}`">
                                <img
                                    class="pt-8 object-contain w-full h-[300px] rounded-xl"
                                    :src="product.image"
                                    alt="product image"
                                />
                            </router-link>
                            <div class="px-5 pb-5">
                                <router-link :to="`/product/${product.id}`">
                                    <h5
                                        class="mt-4 mx-4 mr-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                                    >
                                        {{ product.name }}
                                    </h5>
                                </router-link>
                                <div
                                    class="flex items-center justify-between mt-2"
                                >
                                    <span
                                        class="text-3xl font-bold text-gray-900 dark:text-white"
                                        >${{ product.price }}</span
                                    >
                                    <router-link
                                        to="/cart"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add to cart
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../widgets/NavbarMain.vue";
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import axios from "axios";

export default {
    name: "CataloguePage",
    components: {
        Navbar,
    },
    setup() {
        const products = ref([]);
        onMounted(async () => {
            try {
                const productResponse = await axios.get(
                    "http://localhost:3000/products",
                );
                const fetchedProducts = productResponse.data;
                console.log("📦 Fetched products:", fetchedProducts);
                const productsWithImages = await Promise.all(
                    fetchedProducts.map(async (product) => {
                        try {
                            const res = await axios.get(
                                `http://localhost:3000/uploads/${product.id}`,
                            );
                            // Dacă există cel puțin o imagine, ia doar prima
                            const firstImage =
                                res.data.length > 0 ? res.data[0].image : null;
                            product.image = firstImage
                                ? `http://localhost:3000/uploads/${firstImage}`
                                : null;
                        } catch (err) {
                            console.error(
                                `Error fetching image for product ${product.id}:`,
                                err,
                            );
                            product.image = null;
                        }
                        console.log(product);
                        return product;
                    }),
                );

                products.value = productsWithImages;
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        });

        const searchTerm = ref("");
        const selectedCategory = ref("");
        const maxPrice = ref(10000); // default

        // 🏷️ Categorii distincte
        const categories = computed(() => {
            return [...new Set(products.value.map((p) => p.category))];
        });

        // 🔢 Preț maxim automat
        const priceLimit = computed(() =>
            Math.max(...products.value.map((p) => p.price)),
        );

        // 🧠 Filtru final
        const filteredProducts = computed(() => {
            return products.value.filter((p) => {
                const nameMatch = p.name
                    ?.toLowerCase()
                    .includes(searchTerm.value.toLowerCase());

                const categoryMatch =
                    !selectedCategory.value ||
                    p.category?.toLowerCase() ===
                        selectedCategory.value.toLowerCase();

                const priceMatch = p.price <= maxPrice.value;

                return nameMatch && categoryMatch && priceMatch;
            });
        });

        watch(filteredProducts, (newVal) => {
            console.log("🎯 Filtered products:", newVal);
        });

        onBeforeUnmount(() => {
            products.value = [];
        });

        return {
            products,
            filteredProducts,
            searchTerm,
            selectedCategory,
            maxPrice,
            categories,
            priceLimit,
        };
    },
};
</script>

<style>
.parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 8px;
}

.toDiv {
    grid-column: span 4 / span 4;
}

.filters {
    grid-row: span 4 / span 4;
    grid-row-start: 2;
}

.products {
    grid-column: span 3 / span 3;
    grid-row: span 4 / span 4;
    grid-row-start: 2;

    padding: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
}
</style>
