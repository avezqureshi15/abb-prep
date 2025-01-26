import React, { useMemo, useState } from 'react'

const PrUseMemo = () => {
    const generateNumbers = () => {
        const numbers = Array(30_000_000).fill(0).map((item, index) => ({
            index,
            isMagical: index === 29_999_999
        }))
        return numbers
    }

    const [counter, setCounter] = useState(0);


    const numbers = useMemo(() => generateNumbers(), [])

    const magicalNumber = useMemo(() => { return numbers.find((item) => item.isMagical) }, [])


    return (
        <>
            Magical number is {magicalNumber.index}
            {counter}
            <button onClick={() => setCounter(counter + 1)} >click me</button>
        </>
    )
}

export default PrUseMemo