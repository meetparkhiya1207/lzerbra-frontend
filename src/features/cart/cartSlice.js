import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }

      state.totalQuantity += item.quantity || 1;
      state.totalPrice += item.price * (item.quantity || 1);
    },
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.cartItems.find((x) => x.id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
