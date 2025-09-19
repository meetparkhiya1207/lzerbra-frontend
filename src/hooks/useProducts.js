// hooks/useProducts.js
import useSWR from "swr";
import { fetcher } from "../api/swrconfig";

export const getAllProducts = (shouldFetch = true) => {
    const { data, error, isLoading, mutate } = useSWR(
        shouldFetch ? "/products" : null, 
        fetcher
    );

    return {
        products: data,
        isLoading,
        isError: error,
        mutate,
    };
};

export const getProductById = (id) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `/products/${id}` : null,
        fetcher
    );

    return {
        product: data,
        isLoading,
        isError: error,
        mutate,
    };
};

