import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const AddCity = () => {
    const [city, setCity] = useState('');
    const [localCountries, setLocalCountries] = useLocalStorage('countries', []);
    const [localCities, setLocalCities] = useLocalStorage('cities', []);
    console.log(localCountries)
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const handleAddCity = (e) => {
        e.preventDefault();
        if (city.trim() != '' && selectedCountry.trim() != '') {
            let updatedCities = [...localCities];
            const countryExist = localCities.find((item) => item.name == selectedCountry);
            const newCity = { id: Date.now(), name: city };
            if (countryExist) {
                updatedCities = updatedCities.map((entry) =>
                    entry.name === selectedCountry ?
                        { ...entry, cities: [...entry.cities, newCity] }
                        :
                        entry
                )
            } else {
                updatedCities.push(
                    {
                        name: selectedCountry,
                        cities: [newCity]
                    }
                )
            }
            setCities(updatedCities)
            setLocalCities(updatedCities)
            setCity('')
        }
    }
    return (
        <>
            <form
                onSubmit={handleAddCity}
            >
                <select
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    {
                        localCountries.map((item) => {
                            return (
                                <option
                                    value={item.name}
                                >
                                    {item.name}
                                </option>
                            )
                        })
                    }
                </select>
                <input
                    placeholder='Enter the name of the city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type='submit' >Submit</button>
            </form>
        </>
    )
}

export default AddCity