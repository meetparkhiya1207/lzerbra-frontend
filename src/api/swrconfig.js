import axiosInstance from ".";

export const fetcher = (url) =>
    axiosInstance.get(url).then((res) => {
        return res.data;
    });

export const actionFetcher = async (url, { arg }) => {
    const res = await axiosInstance.post(url, arg);
    return res.data;
};
