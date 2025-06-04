<template>
  <h1 class="text-2xl font-bold mb-4">Users</h1>

  <div class="relative overflow-x-auto shadow-md shadow-gray-400 sm:rounded-lg bg-white">
    <table class="w-full text-sm text-left rtl:text-right text-gray-700">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">User ID</th>
          <th scope="col" class="px-6 py-3">Username</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
          v-for="userItem in users"
          :key="userItem.id"
        >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ userItem.id }}
          </th>
          <td class="px-6 py-4">{{ userItem.username }}</td>
          <td class="px-6 py-4">{{ userItem.email }}</td>
          <td class="px-6 py-4">
            <button
              @click="deleteUserFromDB(userItem.id)"
              class="py-1 px-2 text-sm shadow shadow-md-5 shadow-gray-400 focus:shadow-none font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-white transform transition-transform duration-300 hover:scale-105"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

export default {
  setup() {
    const users = ref([]);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/AdminPanelUsers');
        users.value = response.data;
        localStorage.setItem('users', JSON.stringify(users.value));
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    const deleteUserFromDB = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/AdminUsers/${id}`);
        console.log('User deleted successfully');
        fetchUsers(); // Refresh table
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    onMounted(fetchUsers);

    watch(users, (newUsers) => {
      localStorage.setItem('users', JSON.stringify(newUsers));
    }, { deep: true });

    return {
      users,
      deleteUserFromDB
    };
  }
};
</script>
