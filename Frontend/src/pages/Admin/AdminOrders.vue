<template>
    <h1 class="text-2xl col-span-2 mx-10 font-bold">Orders</h1>

    <div
        class="relative overflow-x-auto shadow-md shadow-gray-400 sm:rounded-lg bg-white"
    >
        <table class="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">Order ID</th>
                    <th scope="col" class="px-6 py-3">User</th>
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
                    <td class="px-6 py-4">{{ order.username }}</td>
                    <td class="px-6 py-4">{{ order.product_name }}</td>
                    <td class="px-6 py-4">{{ order.quantity }}</td>

                    <td class="px-6 py-4">
                        <select
                            v-model="order.action"
                            @change="updateOrderStatus(order)"
                            :class="[
                                'rounded shadow shadow-md shadow-gray-400 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white',
                                getStatusClass(order.action),
                            ]"
                        >
                            <option value="2">Accepted</option>
                            <option value="1">Pending</option>
                            <option value="0">Declined</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AdminOrders",
    data() {
        return {
            orders: [],
        };
    },
    mounted() {
        axios
            .get("http://localhost:3000/orders/extended")
            .then((response) => {
                this.orders = response.data;
            })
            .catch((error) => {
                console.error("Failed to fetch extended orders:", error);
            });
    },
    methods: {
        getStatusClass(action) {
            switch (parseInt(action)) {
                case 2:
                    return "bg-green-200 text-green-900";
                case 1:
                    return "bg-yellow-200 text-yellow-900";
                case 0:
                    return "bg-red-200 text-red-900";
                default:
                    return "bg-gray-200";
            }
        },
        updateOrderStatus(order) {
            console.log("Updating order:", order);
            axios
                .put(`http://localhost:3000/orders/${order.order_id}`, {
                    action: order.action,
                })
                .then(() => {
                    console.log(`Order ${order.order_id} updated successfully.`);
                })
                .catch((error) => {
                    console.error("Failed to update order:", error);
                });
        },
    },
};
</script>

<style></style>
