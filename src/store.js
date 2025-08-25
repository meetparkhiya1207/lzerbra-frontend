import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import likedReducer from "./features/liked/likedSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  liked: likedReducer,

});

export const store = configureStore({
  reducer: rootReducer,
});
