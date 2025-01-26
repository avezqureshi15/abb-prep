import { useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return initialValue
    })


    const storeValue = (newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
    }

    return [storedValue, storeValue];
}

export default useLocalStorage;