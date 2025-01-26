import React, { useState } from 'react'

const UseMemo = () => {

    const [counter, setCounter] = useState(0);
    const generateNumbers = () => {
        const numbers = Array(20_00_00).fill(0).map((item, index) => ({
            index,
            isMagical: index === 19_00_00
        }))
        return numbers;
    }

    const numbers = generateNumbers();
    const magicalNumber = numbers.find((item) => item.isMagical);



    return (
        <>
            Magical Number : {magicalNumber};
            {counter};
            <button onClick={() => setCounter(counter + 1)} >Click me</button>
        </>
    )
}

export default UseMemo