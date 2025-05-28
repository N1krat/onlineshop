<template>
  <Navbar></Navbar>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-xs">
      <form @submit.prevent="registerUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input 
            v-model="username" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Username">
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input v-model="email" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="youremail@example.com">
          <p v-if="!isValidEmail" class="text-red-500 text-xs italic">Please enter a valid email address.</p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input 
            v-model="password" 
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            placeholder="******************">
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../../widgets/NavbarReg.vue'
import axios from 'axios';

export default {
  name: "RegisterPage",
  components: {
    Navbar
  },
  data() {
    return {
      username: "",
      email: "", 
      password: ""
    };
  },
  computed: {
    isValidEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.email).toLowerCase());
    }
  },
  methods: {
    async registerUser() {
      try {
        if (!this.isValidEmail) {
          return;
        }
        const response = await axios.post("http://localhost:3000/register", {
          username: this.username,
          email: this.email,
          password: this.password
        });
        localStorage.setItem("user", JSON.stringify({ username: this.username }));
        console.log("Upload successful:", response.data);
        this.$router.push("/user");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
};
</script>
