import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ViewCity = () => {
    const [selectedCountry, setSelectedCountry] = useState('India')
    const [localCountries, setLocalCountries] = useLocalStorage('countries', []);
    const [localCities, setLocalCities] = useLocalStorage('cities', []);
    const [countryCities, setCountryCities] = useState([]);
    console.log(localCities)
    const handleChangeCountry = (e) => {
        const { value } = e.target;
        setSelectedCountry(value)
        const countryValue = localCities.find((item) => item.name === value);
        setCountryCities(countryValue?.cities || [])
        console.log(countryValue?.cities)
    }
    const handleRemove = (id) => {
        const updatedCities = localCities.map((item) => {
            if (item.name === selectedCountry) {
                return {
                    ...item,
                    cities: item.cities.filter((item) => item.id != id)
                }
            }
        })
        setCountryCities(updatedCities)
        setLocalCities(updatedCities)
    }
    return (
        <>
            <select
                onChange={handleChangeCountry}
            >
                {
                    localCountries.map((item) => {
                        return (
                            <option>
                                {item.name}
                            </option>
                        )
                    })
                }
            </select>
            {
                countryCities.map((item) => {
                    return (
                        <>
                            <li>{item.name}</li>
                            <button onClick={() => handleRemove(item.id)} >Remove</button>
                        </>
                    )
                })
            }
        </>
    )
}

export default ViewCity