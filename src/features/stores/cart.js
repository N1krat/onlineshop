import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const state = reactive({
    items: [],
  });

  function addToCart(product) {
    const existingItem = state.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.items.push({ ...product, quantity: 1 });
    }
  }

  function removeItem(id) {
    state.items = state.items.filter((item) => item.id !== id);
  }

  function clearCart() {
    state.items = [];
  }

  const total = computed(() =>
    state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  return {
    items: state.items,
    addToCart,
    removeItem,
    clearCart,
    total,
  };
});
