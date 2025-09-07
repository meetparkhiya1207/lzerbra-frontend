import axios from "axios";

// ✅ Use import.meta.env in Vite
const API_URL = `${import.meta.env.VITE_BACKEND_API}/api/products`;

// ✅ Get all products
export const getProducts = async () => {
    console.log("API_URLAPI_URL",API_URL);
    
  try {
    const res = await axios.get(API_URL);
    console.log("Fetched products:", res.data);
    return res.data; // backend mathi direct products ave
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
