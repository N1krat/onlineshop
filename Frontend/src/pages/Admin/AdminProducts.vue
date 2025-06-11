<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <h1 class="text-2xl col-span-2 mx-10 font-bold">Our products</h1>
      <div class="flex justify-end">
        <button
          @click="showAddModal = true"
          class="mr-6 inline-block py-1 px-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
        >
          Add a product
        </button>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md shadow-gray-400 sm:rounded-lg bg-white">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th class="px-6 py-3">Product ID</th>
            <th class="px-6 py-3">Product name</th>
            <th class="px-6 py-3">Price</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3">Category</th>
            <th class="px-6 py-3">Image</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="productItem in products"
            :key="productItem.id"
            class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
          >
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ productItem.id }}</th>
            <td class="px-6 py-4">{{ productItem.name }}</td>
            <td class="px-6 py-4">{{ productItem.price }}</td>
            <td class="px-6 py-4">{{ productItem.description }}</td>
            <td class="px-6 py-4">{{ productItem.Category }}</td>

            <td class="px-6 py-4">
              <button
                @click="showImages(productItem.id)"
                class="py-1 px-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Show Images
              </button>
            </td>
            <td class="px-6 py-4">
              <button
                @click="deleteProduct(productItem.id)"
                class="mr-5 py-1 px-3 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                @click="openEditModal(productItem)"
                class="py-1 px-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Images Modal -->
    <div
      v-if="showImagesModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <h3 class="text-xl mb-4 font-semibold">Product Images</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <img
            v-for="(img, index) in currentProductImages"
            :key="index"
            :src="img"
            alt="Product Image"
            class="object-contain rounded shadow"
            style="max-height: 200px; width: 100%;"
          />
        </div>
        <button
          @click="showImagesModal = false"
          class="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
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
            <label class="block mb-1 font-medium">Category</label>
            <input v-model="newProduct.category" type="text" required class="w-full border rounded px-2 py-1"></input>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Description</label>
            <textarea v-model="newProduct.description" required class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Image</label>
            <input
              type="file"
              multiple
              @change="handleFiles"
              class="w-full border rounded px-2 py-1 bg-blue-500 text-white cursor-pointer"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add</button>
          </div>
        </form>
      </div>
    </div>

    <!-- edit product -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-xl mb-4 font-bold">Edit a product</h2>
        <form @submit.prevent="saveEditedData">
          <div class="mb-3">
            <label class="block mb-1 font-medium">Name</label>
            <input v-model="editedProduct.name" type="text" required class="w-full border rounded px-2 py-1"></input>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Price</label>
            <input v-model.number="editedProduct.price" type="number" min="0" step="0.01" required class="w-full border rounded px-2 py-1" />
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Category</label>
            <input v-model="editedProduct.category" type="text" required class="w-full border rounded px-2 py-1"></input>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Description</label>
            <textarea v-model="editedProduct.description" required class="w-full border rounded px-2 py-1"></textarea>
          </div>
          <div class="mb-3">
            <label class="block mb-1 font-medium">Image</label>
            <input
              type="file"
              multiple
              @change="handleFiles"
              class="w-full border rounded px-2 py-1 bg-blue-500 text-white cursor-pointer"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="showEditModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button @click="saveEditedData" type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
          </div>
        </form>
      </div>
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
    const showEditModal = ref(false);
    const selectedImages = ref([]);
    const editedProduct = ref({
      id: null,
      name: '',
      price: 0,
      description: '',

    });

    const newProduct = ref({
      name: '',
      price: 0,
      description: '',
    });

    const showImagesModal = ref(false);
    const currentProductImages = ref([]);

    // Load products from backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/products');
        products.value = res.data;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    const handleFiles = (event) => {
      selectedImages.value = [...event.target.files];
    };

    // Show images modal, load images for product
    const showImages = async (productId) => {
      try {


        const res = await axios.get(`http://localhost:3000/uploads/${productId}`);

        currentProductImages.value = res.data
        .filter(img => img.image)
        .map(img => `http://localhost:3000/uploads/${img.image}`);

        showImagesModal.value = true;
      } catch (error) {
        console.error('Error loading product images:', error);
      }
    };

    // Add new product
    const addProduct = async () => {
      try {
        const formData = new FormData();
          formData.append('name', newProduct.value.name);
          formData.append('price', newProduct.value.price);
          formData.append('category', newProduct.value.category);
          formData.append('description', newProduct.value.description);

        selectedImages.value.forEach(file => {
            formData.append('images', file);
        });

        await axios.post('http://localhost:3000/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        showAddModal.value = false;
        newProduct.value = { name: '', price: 0, description: '' };
        selectedImages.value = [];
        fetchProducts();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };

    // edit a product
    const openEditModal = (productItem) => {
      editedProduct.value = { ...productItem }; // clone to avoid modifying the original directly
      showEditModal.value = true;
    };

    const saveEditedData = async () => {
      try {
        console.log(editedProduct.value);
        const id = editedProduct.value.id;
        await axios.put(`http://localhost:3000/products/${id}`, editedProduct.value)

        showEditModal.value = false;
        window.location.reload();
      } catch (error) {
        console.error('Error', error);
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
      showImagesModal,
      currentProductImages,
      handleFiles,
      showImages,
      addProduct,
      deleteProduct,
      showEditModal,
      editedProduct,
      openEditModal,
      saveEditedData,

    };
  },
};
</script>
