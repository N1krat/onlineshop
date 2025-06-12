<template>
    <div class="all">
        <navbar></navbar>

        <div class="grid grid-cols-3 grid-rows-1 gap-3">
            <div
                class="main col-span-2 p-12 mr-10 mt-2 mx-10 bg-gray-300 shadow-md shadow-gray-400"
            >
                <div class="col-span-3">
                    <h1 class="text-4xl font-bold">Products in your cart</h1>
                </div>
                <div class="products grid gap-3 p-3">
                    <div
                        class="product bg-blue-400 shadow-md shadow-gray-400"
                        v-for="item in cart"
                        :key="item.id"
                    >
                        <img :src="item.image" />
                        <h2>{{ item.name }}</h2>
                        <h3>{{ item.price }}</h3>
                    </div>
                </div>
            </div>

            <div
                class="checkOut p-12 mr-10 mt-2 bg-gray-300 shadow-md shadow-gray-400"
            >
                <h1 class="text-4xl font-bold">Your checkout</h1>
                <p>Total price: {{ totalPrice }} $</p>
                <p>
                    Total items:
                    {{ cart.reduce((sum, item) => sum + item.quantity, 0) }}
                </p>
                <br />

                <p v-for="item in cart">
                    {{ item.quantity }} x {{ item.name }}
                </p>

                <button
                    @click="placeOrder"
                    class="bg-green-500 text-white rounded-lg p-2 mt-4 hover:bg-green-600 transition"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from "../widgets/NavbarMain.vue";

export default {
    name: "CartPage",
    components: {
        navbar,
    },
};
</script>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

const cart = ref([]);
const cartKey = ref("");
const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

onMounted(async () => {
    const token = localStorage.getItem("token");

    if (token) {
        cartKey.value = `cart_${token}`;
    } else {
        cartKey.value = "cart_guest";
    }

    localStorage.setItem("cartKey", cartKey.value);

    const savedCart = localStorage.getItem(cartKey.value);
    if (savedCart) {
        cart.value = JSON.parse(savedCart);
        console.log("📦 Cart loaded from localStorage:", cart.value);
    }

    const products = await fetch("http://localhost:3000/products");
    const productsJson = await products.json();
    cart.value.forEach((item) => {
        const product = productsJson.find((p) => p.id === item.id);
        if (product) {
            item.image = product.image;
        }
    });
});

watch(
    cart,
    (newCart) => {
        if (cartKey.value) {
            localStorage.setItem(cartKey.value, JSON.stringify(newCart));
        }
    },
    { deep: true },
);

const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Trebuie să fii logat pentru a face o comandă.");
        return;
    }

    const orderPayload = {
        userToken: token,
        items: cart.value.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
        })),
    };

    try {
        console.log("Order payload:", orderPayload);

        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderPayload),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        localStorage.removeItem(cartKey.value);
        localStorage.removeItem("cart");

        alert("Comanda a fost trimisă cu succes!");
        window.location.reload();
    } catch (err) {
        console.error("❌ Eroare la trimiterea comenzii:", err);
        alert("A apărut o eroare la trimiterea comenzii. Încearcă din nou.");
    }
};

</script>

<style></style>

