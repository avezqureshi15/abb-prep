import { useEffect, useState } from "react"
import { saveToLocal } from "../utility/localstorage";
import { ICountry } from "../interfaces/country";
import { COUNTRY } from "../utility/constants";

const AddCountry = () => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [country, setCountry] = useState<string>('');
    const handleAddCountry = () => {
        saveToLocal(COUNTRY, [...countries, { id: Date.now().toString(), name: country }])
        if (country.trim() !== '') {
            setCountries((prev) => [...prev, { id: Date.now().toString(), name: country }]);
        }
    }
    useEffect(() => {
        const localCountries = localStorage.getItem(COUNTRY);
        if (localCountries) {
            setCountries(JSON.parse(localCountries) || []);
        }
    }, [])
    return (
        <div>
            <input onChange={(e) => setCountry(e.target.value)} placeholder="Enter the country name: " />
            <button onClick={handleAddCountry} >Add Country</button>
            <div>
                <ul>
                    {
                        countries.map((country, index) => {
                            return (
                                <li key={index} >{country.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default AddCountry