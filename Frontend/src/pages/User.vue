<template> 
<div class="all">
<Navbar></Navbar>
<div class="main p-12">
    <h2 class="text-3xl">Welcome: {{ username }}</h2>

    <div class="orders mt-10 mx-4 rounded-lg">
        <h2 class="text-2xl font-bold mx-20 mb-10">
            Your Orders
        </h2>
        
        <div class="ordersTable grid grid-cols-3 px-25">
            
        
        
        </div>

        </div>
    </div>
</div>
</template>

<script>
import Navbar from "../widgets/NavbarUser.vue";

export default {
    name: "UserPage",
    components: {
        Navbar,
    },
    data() {
  return {
    username: ''
  }
},

    mounted() {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            this.username = user.name;
        }
}

};


</script>

<style>
.orders { 
    background-color: rgb(200, 198, 196);
}
</style>

