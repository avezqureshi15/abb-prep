import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning && time > 0) {
            interval = setInterval(() => setTime((prev) => prev - 1), 1000);
        }
        if (time === 0) {
            setIsRunning(false);
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isRunning, time]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(Number(e.target.value));
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
    };

    return (
        <div>
            <h2>Timer</h2>
            <input
                type="number"
                placeholder="Set seconds"
                onChange={handleInputChange}
                disabled={isRunning}
            />
            <p>{time} seconds remaining</p>
            <button onClick={() => setIsRunning(true)} disabled={time === 0 || isRunning}>
                Start
            </button>
            <button onClick={() => setIsRunning(false)}>Pause</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Timer;
