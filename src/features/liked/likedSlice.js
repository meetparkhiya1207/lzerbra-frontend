import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedProducts: [],
};

const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    addLiked: (state, action) => {
      const item = action.payload;
      if (!state.likedProducts.find((i) => i.id === item.id)) {
        state.likedProducts.push(item);
      }
    },
    removeLiked: (state, action) => {
      const id = action.payload;
      state.likedProducts = state.likedProducts.filter((i) => i.id !== id);
    },
  },
});

export const { addLiked, removeLiked } = likedSlice.actions;
export default likedSlice.reducer;
