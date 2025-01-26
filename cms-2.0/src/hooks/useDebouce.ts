import { useEffect, useState } from "react"

const useDebounce = (searchTerm: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string>('');
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchTerm);
        }, delay)
        return () => {
            clearTimeout(handler);
        }
    }, [delay, searchTerm])

    return debouncedValue;
}

export default useDebounce;

