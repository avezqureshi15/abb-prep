import React, { useState, useEffect } from "react";

const Stopwatch: React.FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
        } else {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isRunning]);

    const handleReset = () => {
        setSeconds(0);
        setIsRunning(false);
    };

    return (
        <div>
            <h2>Stopwatch</h2>
            <p>{seconds} seconds</p>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Stopwatch;
