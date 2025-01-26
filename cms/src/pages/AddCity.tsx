import { useEffect, useState } from "react";
import { saveToLocal } from "../utility/localstorage";
import { ICities } from "../interfaces/city";
import { ICountry } from "../interfaces/country";
import { CITY, COUNTRY } from "../utility/constants";

const AddCity = () => {
    const [cities, setCities] = useState<ICities[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [city, setCity] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    useEffect(() => {
        const localCountries = localStorage.getItem(COUNTRY);
        const localCities = localStorage.getItem(CITY);

        if (localCountries) setCountries(JSON.parse(localCountries) || []);
        if (localCities) setCities(JSON.parse(localCities) || []);
    }, []);

    const handleAddCity = () => {
        if (city.trim() && selectedCountry) {
            const newCity = { id: Date.now().toString(), name: city };
            const countryExists = cities.find(entry => entry.country.name === selectedCountry);

            let updatedCities = [...cities];
            if (countryExists) {
                updatedCities = updatedCities.map((entry) =>
                    entry.country.name === selectedCountry
                        ? { ...entry, cities: [...entry.cities, newCity] }
                        : entry
                );
            } else {
                updatedCities.push({
                    country: { name: selectedCountry, id: Date.now().toString() },
                    cities: [newCity]
                });
            }

            saveToLocal(CITY, updatedCities);
            setCities(updatedCities);
            setCity("");
        }
    };

    return (
        <div>
            <select onChange={(e) => setSelectedCountry(e.target.value)}>
                <option value="" disabled selected>
                    Select a country
                </option>
                {countries.map((country, index) => (
                    <option value={country.name} key={index}>
                        {country.name}
                    </option>
                ))}
            </select>
            <input
                placeholder="Enter the city name: "
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleAddCity}>Add City</button>
        </div>
    );
};

export default AddCity;
