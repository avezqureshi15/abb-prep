import { useState, useMemo } from "react";

const UseMemoExample = () => {
    const generateLargeArray = () => {
        const nums = Array(30_000_000)
            .fill(0)
            .map((_, index) => ({
                index,
                isMagical: index === 29_999_999,
            }));
        return nums;
    };

    const numbers = useMemo(() => generateLargeArray(), []);

    const [count, setCount] = useState(0);

    // Find the magical number (computationally expensive operation)
    const magicalNumber = useMemo(() => {
        console.log("Finding the magical number...");
        return numbers.find((item) => item.isMagical);
    }, [numbers]);

    // const magicalNumber = numbers.find((item) => item.isMagical);


    return (
        <div>
            <h1>UseMemo Example </h1>
            < p > Counter: {count} </p>
            < button onClick={() => setCount(count + 1)}> Increment Counter </button>
            <p>
                Magical Number: {" "}
                {magicalNumber ? magicalNumber.index : "Not found"}
            </p>
        </div>
    );
};

export default UseMemoExample;


// useMemo is a React hook that memoizes the result of a calculation or expensive computation, recomputing it only when its dependencies change.It helps optimize performance by avoiding redundant calculations during re - renders.This is particularly useful for optimizing derived data or preventing unnecessary work in components with frequent updates.

/*
1. useMemo:
- It's a React hook used to memoize the **result of a computation** (like a calculated value or object) to prevent unnecessary recalculations on every render.
- It takes a function and a dependency array.If the dependencies don't change, it returns the cached result from the previous render.
        - Example use case: Optimizing expensive calculations in functional components.

   const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b]);

   2. memo:
   - It's a higher-order component (HOC) that wraps a functional component to memoize the component itself. It prevents the re-rendering of the component unless its props change.
    - It performs a shallow comparison of the component’s props to determine if the component should re - render.
   - Example use case: Preventing unnecessary re - renders of child components when props haven’t changed.

   const MemoizedComponent = React.memo(MyComponent);
   
   In summary:
   - useMemo is used to memoize computed values, while  memo is used to memoize entire components to avoid re - renders.
*/