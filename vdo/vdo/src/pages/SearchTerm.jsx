import React, { useState } from 'react';
import useDebounce from './useDebounce';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce after 500ms

    useEffect(() => {
        if (debouncedSearchTerm) {
            console.log("API call with:", debouncedSearchTerm);
            // Make API call here
        }
    }, [debouncedSearchTerm]);

    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
        />
    );
};

export default SearchComponent;
