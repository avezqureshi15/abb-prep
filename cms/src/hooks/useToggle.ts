import { useState } from "react"

const useToggle = (intialState: boolean = false): [boolean, () => void] => {
    const [state, setState] = useState(intialState);
    const toggle = () => setState((prev) => !prev);
    return [state, toggle];
}

export default useToggle