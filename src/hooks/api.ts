import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = async (url: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error)
                console.log(error);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export const usePostData = async (url: string, payload: object) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const postData = async () => {
            try {
                const response = await axios.post(url, payload);
                setData(response?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error)
                console.log(error);
            }
        };
        postData();
    }, [url]);

    return { data, loading, error };
};

export const usePatchData = async (url: string, payload: object) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const patchData = async () => {
            try {
                const response = await axios.patch(url, payload);
                setData(response?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error)
                console.log(error);
            }
        };
        patchData();
    }, [url]);

    return { data, loading, error };
};

export const useDeleteData = async (url: string, id: number) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const deleteData = async () => {
            try {
                const response = await axios.delete(url + id);
                setData(response?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error)
                console.log(error);
            }
        };
        deleteData();
    }, [url]);

    return { data, loading, error };
};