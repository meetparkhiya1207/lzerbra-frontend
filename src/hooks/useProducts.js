// hooks/useProducts.js
import useSWR from "swr";
import { fetcher } from "../api/swrconfig";

export const getAllProducts = () => {
    const { data, error, isLoading, mutate } = useSWR("/products", fetcher);

    return {
        products: data,
        isLoading,
        isError: error,
        mutate,
    };
};

export const getProductById = (id) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `/products/${id}` : null, // null = skip fetch if id not available
        fetcher
    );
    console.log("Data", data);

    return {
        product: data,
        isLoading,
        isError: error,
        mutate,
    };
};

