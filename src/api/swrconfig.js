import axiosInstance from ".";

export const fetcher = (url) =>
    axiosInstance.get(url).then((res) => {
        console.log("resres", res);
        return res.data;
    });
