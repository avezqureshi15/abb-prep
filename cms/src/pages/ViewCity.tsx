import { useState, useEffect } from "react";
import { ICities } from "../interfaces/city";
import { ICountry } from "../interfaces/country";
import { CITY, COUNTRY } from "../utility/constants";
import { saveToLocal } from "../utility/localstorage";

const ViewCity = () => {
    const [cities, setCities] = useState<ICities[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [countryCities, setCountryCities] = useState<ICities | null>(null);

    useEffect(() => {
        const localCountries = localStorage.getItem(COUNTRY);
        const localCities = localStorage.getItem(CITY);

        if (localCountries) setCountries(JSON.parse(localCountries) || []);
        if (localCities) setCities(JSON.parse(localCities) || []);
    }, []);

    // Handle deleting a city
    const handleDeleteCity = (cityId: string) => {
        if (selectedCountry && cityId) {
            const updatedCities = cities.map((entry) => {
                if (entry.country.name === selectedCountry) {
                    // Remove the city with the given ID
                    entry.cities = entry.cities.filter(city => city.id !== cityId);
                }
                return entry;
            });

            // Update local storage and state
            saveToLocal(CITY, updatedCities);
            setCities(updatedCities);
        }
    };

    // Handle country change
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        setSelectedCountry(country);

        // Find the selected country's cities
        const selectedCountryCities = cities.find(entry => entry.country.name === country);
        setCountryCities(selectedCountryCities || null);
    };

    return (
        <div>
            {/* Country Dropdown */}
            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="" disabled>Select a country</option>
                {countries.map((country, index) => (
                    <option value={country.name} key={index}>
                        {country.name}
                    </option>
                ))}
            </select>

            {/* Display Cities */}
            {countryCities ? (
                <div>
                    <h3>Cities in {selectedCountry}:</h3>
                    <ul>
                        {countryCities.cities.map((city) => (
                            <li key={city.id}>
                                {city.name}
                                <button onClick={() => handleDeleteCity(city.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                selectedCountry && <p>No cities available for {selectedCountry}.</p>
            )}
        </div>
    );
};

export default ViewCity;
