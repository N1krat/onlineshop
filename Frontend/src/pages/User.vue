<template> 
<div class="all">
<Navbar></Navbar>
<div class="main p-12">
    <h2 class="text-3xl">Welcome: {{username}}</h2>

    <div class="orders mt-10 mx-4 rounded-lg">
        <h2 class="text-2xl font-bold mx-20 mb-10">
            Your Orders
        </h2>
        
        <div class="ordersDiv grid grid-cols-3 px-25">

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
                            Apple Watch Series 7 GPS, Aluminium Case, Starlight
                            Sport
                        </h5>
                    </a>
                    <br />
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
                            Apple Watch Series 7 GPS, Aluminium Case, Starlight
                            Sport
                        </h5>
                    </a>
                    <br />
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
                            Apple Watch Series 7 GPS, Aluminium Case, Starlight
                            Sport
                        </h5>
                    </a>
                    <br/>
                </div>
            </div>


            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from "../widgets/NavbarMain.vue";

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
            this.username = user.username;
        }
}

};


</script>

<style>
.orders { 
    background-color: rgb(200, 198, 196);
}
</style>