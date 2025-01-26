import { useEffect, useMemo, useState } from "react"
import { ICountry } from "../interfaces/country"
import useLocalStorage from "../hooks/useLocalStorage";
import useDebounce from "../hooks/useDebouce";
import useValidation from "../hooks/useValdation";

const AddCountry = () => {
    const [country, setCountry] = useState<string>('');
    const [countries, setCountries] = useLocalStorage<ICountry[]>('countries', []);
    const [filteredCountries, setFilteredCountries] = useState(countries)
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedQuery = useDebounce(searchTerm, 1000);

    //email
    // const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //special char
    const regex = /^[A-Za-z0-9\s]*$/
    const validationRules = {
        country: [
            {
                test: (value: string) => value.trim() != '', message: 'Name is required'
            },
            {
                test: (value: string) => value.length <= 10, message: 'Name must not be more than 10 characters long'
            },
            {
                test: (value: string) => value.length > 3, message: 'Name of the country must be more than 3 characters'
            },
            {
                test: (value: string) => regex.test(value), message: 'Name must not contain any special characters'
            }
        ]
    }
    const { errors, validateField, validateForm, setFieldRef } = useValidation(validationRules);
    const handleSubmit = () => {
        const isValid = validateForm({ country })
        if (!isValid) {
            return;
        }
        if (country.trim() != '') {
            let updatedCountries;
            if (isEdit) {
                updatedCountries = countries.map((entry: ICountry) => {
                    return entry.id === id ? { ...entry, name: country } : entry
                })
            } else {
                const newCountry: ICountry = { id: Date.now().toString(), name: country }
                updatedCountries = [...countries, newCountry]
            }
            setCountries(updatedCountries);
            setFilteredCountries(updatedCountries)
            setCountry('');
        }
    }
    const handleUpdateCountry = (item: ICountry) => {
        setIsEdit(true);
        setId(item.id);
        setCountry(item.name);
    }
    const handleRemove = (id: string) => {
        const updatedCountries = countries.filter((item: ICountry) => {
            return item.id !== id
        })
        setCountries(updatedCountries)
    }
    const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value.toLowerCase());
    }
    useEffect(() => {
        const filtered = countries.filter((item: ICountry) => {
            return item.name.toLowerCase().includes(debouncedQuery)
        })
        console.log(filtered)
        setFilteredCountries(filtered)
    }, [debouncedQuery, countries])
    const renderCountries = useMemo(() =>
        filteredCountries.map((item: ICountry) => (
            <>
                <li key={item.id} > {item.name} </li>
                <button onClick={() => handleUpdateCountry(item)} >Update Country</button>
                <button onClick={() => handleRemove(item.id)} >Remove Country</button>
            </>
        )
        )
        , [filteredCountries])


    return (
        <div>
            <input onChange={(event) => handleSearchTerm(event)} placeholder="Search Countries..." /> <br />
            <input value={country} ref={(el) => setFieldRef("country", el)} placeholder="Enter the name of country" onChange={(e) => { setCountry(e.target.value); validateField("country", e.target.value) }} />
            {errors.country && <p style={{ color: 'red' }} >{errors.country}</p>}
            <button onClick={handleSubmit} > {isEdit ? 'Update' : 'Add'} Country</button>
            <br />
            <ol>
                {renderCountries}
            </ol>
        </div>
    )
}

export default AddCountry