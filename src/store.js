import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage by default
import { persistStore, persistReducer } from "redux-persist";

import cartReducer from "./features/cart/cartSlice";
import likedReducer from "./features/liked/likedSlice";
import productsSlice from "./features/products/productsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  liked: likedReducer,
  products: productsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist async storage ma issues avoid
    }),
});

export const persistor = persistStore(store);
