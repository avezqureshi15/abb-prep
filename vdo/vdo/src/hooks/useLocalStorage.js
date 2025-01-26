import { useState } from 'react'
const useLocalStorage = (key, initalValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        let item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return initalValue;
    })

    const storeValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
    }

    return [storedValue, storeValue];
}

export default useLocalStorage;