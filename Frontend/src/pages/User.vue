<template>
    <div class="all">
        <Navbar></Navbar>
        <div class="main p-12">
            <h2 class="text-3xl">Welcome: {{ username }}</h2>

            <div class="orders mt-10 mx-4 rounded-lg">
                <h2 class="text-2xl mt-20 pt-10 px-10 font-bold">
                    Your Orders
                </h2>

                <div class="ordersTable grid grid-cols-3 px-25">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-700 mt-5 mb-10">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">Order ID</th>
                                <th scope="col" class="px-6 py-3">Product</th>
                                <th scope="col" class="px-6 py-3">Quantity</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                v-for="order in orders"
                                :key="order.order_id"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {{ order.order_id }}
                                </th>
                                <td class="px-6 py-4">{{ order.product_name }}</td>
                                <td class="px-6 py-4">{{ order.quantity }}</td>
                                <td class="px-6 py-4">
                                    {{ order.action === 0 ? 'Declined' : order.action === 1 ? 'Pending' : 'Accepted' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../widgets/NavbarUser.vue";
import axios from "axios";

export default {
    name: "UserPage",
    components: {
        Navbar,
    },
    data() {
        return {
            username: '',
            orders: []
        }
    },

    mounted() {
        const userData = localStorage.getItem("user");
        if (userData) {
            const username = JSON.parse(userData).name;
            this.username = username;

            // 1. Get user ID from username
            axios.get(`http://localhost:3000/users/${username}`)
                .then(res => {
                    const userId = res.data.id;

                    // 2. Get all extended orders and filter only this user's
                    return axios.get(`http://localhost:3000/orders/extended`)
                        .then(response => {
                            this.orders = response.data.filter(order => order.user_id === userId);
                        });
                })
                .catch(error => {
                    console.error("Error loading orders:", error);
                });
        }
    }

};
</script>

<style>
.orders { 
    background-color: rgb(200, 198, 196);
}
</style>

