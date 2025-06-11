<template>
  <div class="all">
    <Navbar />
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-xs">
        <form
          @submit.prevent="loginUser"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************"
            />
          </div>
          <div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition ease-in-out duration-300"
              type="submit"
            >
              Log In
            </button>
          </div>
          <p v-if="errorMessage" class="text-red-500 text-xs mt-2">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../widgets/NavbarReg.vue";
import axios from "axios";

export default {
  name: "LoginPage",
  components: {
    Navbar,
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async loginUser() {
      this.errorMessage = "";
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });
        console.log("Login response:", response.data);

        // Save token
        localStorage.setItem("token", response.data.token);

        // Save user with 'name' key for consistency with Navbar
        localStorage.setItem(
          "user",
          JSON.stringify({ name: this.username })
        );

        alert("Login Successful!");

        if (this.username === "admin" && this.password === "admin") {
          this.$router.push("/admin");
        } else {
          this.$router.push("/user/" + this.username);
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed";
      }
    },
  },
};
</script>
