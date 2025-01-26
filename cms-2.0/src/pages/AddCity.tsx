import { useState } from "react"
import { ICities, ICity } from "../interfaces/city";
import useLocalStorage from "../hooks/useLocalStorage";
import { ICountry } from "../interfaces/country";

const AddCity = () => {
    const [city, setCity] = useState<string>('');
    const [cities, setCities] = useLocalStorage<ICities[]>('cities', []);
    const [localCountries] = useLocalStorage('countries', []);
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleAddCity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city && selectedCountry) {
            const newCity: ICity = { id: Date.now().toString(), name: city };
            const isCountry = cities.find((item: ICities) => item?.country?.name == selectedCountry);
            let updatedCities = [...cities];
            if (isCountry) {
                updatedCities = updatedCities.map((entry: ICities) => {
                    return entry.country.name === selectedCountry ? { ...entry, cities: [...entry.cities, newCity] } : entry
                })
                console.log(updatedCities)
            } else {
                const country = localCountries.find((item: ICountry) => item.name === selectedCountry);
                updatedCities.push({
                    country,
                    cities: [newCity]
                })
            }
            setCities(updatedCities);
            setCity('');
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleAddCity(e)} >
                <select
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option disabled selected>Select a country</option>
                    {
                        localCountries.map((item: ICountry) => {
                            return (
                                <option key={item.id} > {item.name} </option>
                            )
                        })
                    }
                </select>
                <input
                    placeholder="Enter the name of city"
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit" >Add City</button>
            </form>
        </div>
    )
}

export default AddCity