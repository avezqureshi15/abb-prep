import { useState } from "react"
import useDebouce from "../hooks/useDebounce";

const Debounce = () => {
    const [query, setQuery] = useState("");
    const debounceQuery = useDebouce(query, 500);
    return (
        <>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to Search..." />
            <p>Debounced Value : {debounceQuery}</p>
        </>
    )
}

export default Debounce