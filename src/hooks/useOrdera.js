// hooks/useProducts.js
import useSWR from "swr";
import { fetcher } from "../api/swrconfig";
import axiosInstance from "../api";

export const insertOrderDetails = async (orderData) => {
    try {
        const response = await axiosInstance.post('/order/createorder', orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getOrderDetails = async () => {
    try {
        const response = await axiosInstance.get('/order/getorder');        
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

