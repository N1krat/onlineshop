<template>
    <Navbar></Navbar>
    <div class="flex justify-center items-center h-screen" id ="register">
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 regForm">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="username" id="username" type="username" placeholder="Username">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" v-model="password" id="password" type="password" placeholder="******************">
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Sign In
        </button>
      </div>
    </form>
  </div>
</div>
</template>


<script>
import Navbar from '../../widgets/NavbarMain.vue'
export default {
    name: "RegisterPage",
    components: {
        Navbar
    },

    data(){
        return {
            username: "",
            password: ""
        };
    },

    mounted() {
        (() => {
            'use strict';
            const forms = document.querySelectorAll('.regForm');
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }, false);
            });
        })();
    },

    methods: {
        async registerUser(event) {
            event.preventDefault(); // Prevent default form submission

            if (!this.username || !this.email || !this.password || !this.agreeTerms) {
                this.message = 'All fields are required!';
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/register', {
                    username: this.username,
                    password: this.password,
                });
                this.message = response.data;
            } catch (error) {
                this.message = error.response?.data || 'Registration failed';
            }
        }
      }
}


</script>