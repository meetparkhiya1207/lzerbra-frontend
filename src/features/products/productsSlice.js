import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addAllProductData: (state, action) => {
      console.log("action.payloadaction.payload",action);
      
     state.productsList = action.payload;
    },
   
  },
});

export const { addAllProductData } = productsSlice.actions;

export default productsSlice.reducer;
