import { useCallback, useState } from "react"
import CallbackChild from "./CallbackChild"

const Callback = () => {
    const [test, setTest] = useState('hello');
    const [counter, setCounter] = useState(0);
    const hello = 'o my god'
    const handleChange = useCallback(() => {
        setTest('I am changed')
    }, [])

    return (
        <div>
            {counter}
            <CallbackChild hello={hello} handleChange={handleChange} test={test} />
            <button onClick={() => setCounter(counter + 1)} >Click Me</button>
        </div>
    )
}

export default Callback



// useCallback is a React hook that memoizes a function, ensuring it gets recreated only when its dependencies change.It’s primarily used to prevent unnecessary re - creation of functions, especially when those functions are passed as props to child components, which could trigger unwanted re - renders.This optimization is helpful in scenarios involving complex components or performance - sensitive applications.