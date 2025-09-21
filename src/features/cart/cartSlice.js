import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((i) => i.product_id === item.product_id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }

      state.totalQuantity += item.quantity || 1;
      state.totalPrice += item.price * (item.quantity || 1);
      state.isDrawerOpen = true;

    },
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.cartItems.find((x) => x.product_id === id);

      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => i.product_id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => i.product_id !== id);
      }
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, closeDrawer, openDrawer } = cartSlice.actions;

export default cartSlice.reducer;
