import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage"
import { ICities, ICity } from "../interfaces/city";
import { ICountry } from "../interfaces/country";

const ViewCity = () => {
    const [cities, setCities] = useLocalStorage('cities', []);
    const [countries] = useLocalStorage('countries', []);
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const countryCities = useMemo(() => {
        const selectedCities = cities.find((item: ICities) =>
            item.country.name === selectedCountry
        )
        return selectedCities ? selectedCities.cities : []
    }, [selectedCountry, cities])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    }
    const handleRemove = (id: string) => {
        const updatedCitiesArray = countryCities.filter((item: ICity) => {
            return item.id !== id
        });

        const updatedCities = cities.map((entry: ICities) => {
            return entry.country.name === selectedCountry ? { ...entry, cities: updatedCitiesArray } : entry
        })
        setCities(updatedCities);
    }
    return (
        <>
            <select onChange={(event) => handleSelectChange(event)} >
                <option disabled selected >Select the country</option>
                {
                    countries.length == 0 ? 'No countries available' :
                        countries?.map((item: ICountry) => {
                            return (
                                <option key={item.id} >
                                    {item.name}
                                </option>
                            )
                        })
                }
            </select>
            <div>
                {
                    countryCities.length == 0 ? 'No Cities Available' :
                        countryCities.map((item: ICity) => {
                            return (
                                <li key={item.id} >
                                    {item.name} <button onClick={() => handleRemove(item.id)} >Remove</button>
                                </li>
                            )
                        })
                }
            </div>

        </>
    )
}

export default ViewCity