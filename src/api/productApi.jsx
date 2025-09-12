import axiosInstance from ".";

// ✅ Use import.meta.env in Vite
const API_URL = `/products`;

// ✅ Get all products
export const getProducts = async () => {    
  try {
    const res = await axiosInstance.get(API_URL);
    console.log("Fetched products:", res.data);
    return res.data; // backend mathi direct products ave
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// ✅ Get single products
export const getProductById = async (id) => {    
  try {
    const res = await axiosInstance.get(API_URL + `/${id}`);
    console.log("Fetched Single Products:", res.data);
    return res.data; // backend mathi direct products ave
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
