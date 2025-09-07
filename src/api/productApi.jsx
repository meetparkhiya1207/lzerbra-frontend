import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_API}/api/products`;

// ✅ Get all products
export const getProducts = async () => {
    console.log("runnnnnnnnnn");
    
  try {
    const res = await axios.get(API_URL);
    return res.data; // backend mathi direct products ave
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
