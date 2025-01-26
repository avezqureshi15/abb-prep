import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const AddCountry = () => {
    const [country, setCountry] = useState({ id: '', name: '' });
    const [stored, setStoredValue] = useLocalStorage('countries', []);
    const [countries, setCountries] = useState(stored);
    const handleAddCountry = (e) => {
        e.preventDefault();
        const newValue = { id: Date.now(), name: country }
        setStoredValue([...countries, newValue])
        setCountries((prev) => ([...prev, newValue]));
    }
    return (
        <>
            <form onSubmit={handleAddCountry} >
                <input
                    placeholder='Enter the coutry name'
                    value={country.name}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button type='submit' >Submit</button>
            </form>
            {
                countries.map((item, index) => {
                    return (
                        <li key={index} >
                            {item.name}
                        </li>
                    )
                })
            }
        </>
    )
}

export default AddCountry