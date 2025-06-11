<template> 
<div class="all">
<Navbar></Navbar>
<div class="main p-12">
    <h2 class="text-3xl">Welcome: {{ username }}</h2>

    <div class="orders mt-10 mx-4 rounded-lg">
        <h2 class="text-2xl mt-20 pt-10 px-10  font-bold ">
            Your Orders
        </h2>
        
        <div class="ordersTable grid grid-cols-3 px-25">
            <table class="w-full text-sm text-left rtl:text-right text-gray-700 mt-5">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">Order ID</th>
                    <th scope="col" class="px-6 py-3">User ID</th>
                    <th scope="col" class="px-6 py-3">Product ID</th>
                    <th scope="col" class="px-6 py-3">Quantity</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                    v-for="order in orders"
                    :key="order.id"
                >
                    <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {{ order.id }}
                    </th>
                    <td class="px-6 py-4">{{ order.user_id }}</td>
                    <td class="px-6 py-4">{{ order.product_id }}</td>
                    <td class="px-6 py-4">{{ order.quantity }}</td>

                    <td class="px-6 py-4">
                        {{  order.action === 0 ? 'Declined' : order.action === 1 ? 'Pending' : 'Accepted'  }}
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
            const user = JSON.parse(userData);
            this.username = user.name;

            axios.get(`http://localhost:3000/orders?user_id=${user.id}`)
                .then(response => {
                    this.orders = response.data;
                })
        }
    }
};


</script>

<style>
.orders { 
    background-color: rgb(200, 198, 196);
}
</style>

