import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        "access_token": "leasfund.com"
                    }
                });
                setData(response?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error)
                console.log(error, "error");
            }
        };
        fetchData();
    }, [url]);

    console.log(url, 'datas');

    return { data, loading, error };
};

export const usePostData = (url: string, payload: object) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const postData = async () => {
        try {
            const response = await axios.post(url, payload, {
                headers: {
                    "access_token": "leasfund.com"
                }
            });
            setData(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
            console.log(error);
        }
    };

    return { data, loading, error, postData };
};

export const usePatchData = (url: string, payload: object) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const patchData = async () => {
        try {
            const response = await axios.put(url, payload, {
                headers: {
                    "access_token": "leasfund.com"
                }
            });
            setData(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
            console.log(error);
        }
    };

    return { data, loading, error, patchData };
};

export const useDeleteData = (url: string, id: number) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const deleteData = async () => {
        try {
            const response = await axios.delete(url + id, {
                headers: {
                    "access_token": "leasfund.com"
                }
            });
            setData(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
            console.log(error);
        }
    }

    return { data, loading, error, deleteData };
};