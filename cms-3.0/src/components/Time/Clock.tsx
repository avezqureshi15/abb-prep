import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Clock</h2>
            <p>{time.toLocaleTimeString()}</p>
        </div>
    );
};

export default Clock;
