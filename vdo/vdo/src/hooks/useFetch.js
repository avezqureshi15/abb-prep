import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url])

    return { data, loading, error };
}

export default useFetch;