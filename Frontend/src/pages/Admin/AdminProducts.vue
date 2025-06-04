<template> 
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <h1 class="text-2xl col-span-2 mx-10 font-bold">Our products</h1>
      <div class="flex justify-end">
        <button
          @click="showAddModal = true"
          class="mr-6 inline-block py-1 px-2 text-sm shadow shadow-md-5 shadow-gray-400 focus:shadow-none font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-white transform transition-transform duration-300 hover:scale-105"
        >
          Add a product
        </button>
      </div>
    </div>
  
    <div class="relative overflow-x-auto shadow-md shadow-gray-400 sm:rounded-lg bg-white">
      <table class="w-full text-sm text-left rtl:text-right text-gray-700">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Product ID</th>
            <th scope="col" class="px-6 py-3">Product name</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Image</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
            v-for="productItem in products"
            :key="productItem.id"
          >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ productItem.id }}
            </th>
            <td class="px-6 py-4">{{ productItem.name }}</td>
            <td class="px-6 py-4">{{ productItem.price }}</td>
            <td class="px-6 py-4">{{ productItem.description }}</td>
            <td class="px-6 py-4">
              <button
                @click="showImage(productItem.image)"
                class="py-1 px-2 text-sm shadow shadow-md-5 shadow-gray-400 focus:shadow-none font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white transform transition-transform duration-300 hover:scale-105"
              >
                Show Image
              </button>
            </td>
            <td class="px-6 py-4">
              <button
                @click="deleteProduct(productItem.id)"
                class="py-1 px-2 text-sm shadow shadow-md-5 shadow-gray-400 focus:shadow-none font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-white transform transition-transform duration-300 hover:scale-105"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <!-- Add Product Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-xl mb-4 font-bold">Add a new product</h2>
        <form @submit.prevent="addProduct">
          <div class="mb-3">
            <label class="block mb-1 font-medium">Name</label>
            <input v-model="newProduct.name" type="text" required class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Price</label>
            <input v-model.number="newProduct.price" type="number" min="0" step="0.01" required class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Description</label>
            <textarea v-model="newProduct.description" required class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Image URL</label>
            <input v-model="newProduct.image" type="text" required class="w-full border rounded px-2 py-1" />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: "AdminProducts",
    setup() {
      const products = ref([]);
      const showAddModal = ref(false);
  
      const newProduct = ref({
        name: '',
        price: 0,
        description: '',
        image: ''
      });
  
      // Load products from backend
      const fetchProducts = async () => {
        try {
          const res = await axios.get('http://localhost:3000/products');
          products.value = res.data;
        } catch (error) {
          console.error('Error loading products:', error);
        }
      };
  
      // Show image in a simple alert for demo (can be improved)
      const showImage = (url) => {
        window.open(url, '_blank');
      };
  
      // Add a new product
      const addProduct = async () => {
        try {
          await axios.post('http://localhost:3000/products', newProduct.value);
          showAddModal.value = false;
          // Reset form
          newProduct.value = { name: '', price: 0, description: '', image: '' };
          // Refresh list
          fetchProducts();
        } catch (error) {
          console.error('Error adding product:', error);
        }
      };
  
      // Delete product by id
      const deleteProduct = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/products/${id}`);
          fetchProducts();
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
  
      onMounted(() => {
        fetchProducts();
      });
  
      return {
        products,
        showAddModal,
        newProduct,
        showImage,
        addProduct,
        deleteProduct
      };
    }
  };
  </script>
  
  <style scoped>
  /* Simple modal styling already done inline in template */
  </style>
  