import React, { useState } from 'react';
import WithLogging from './HOC';

const SampleComponent = ({ message }) => {
    return <div>{message}</div>;
};

const SampleComponentWithLogging = WithLogging(SampleComponent);

const ParentComponent = () => {
    const [isMounted, setIsMounted] = useState(true); // State to control mounting/unmounting

    return (
        <div>
            {/* Button to toggle mounting/unmounting */}
            <button onClick={() => setIsMounted(!isMounted)}>
                {isMounted ? 'Unmount' : 'Mount'} Component
            </button>

            {/* Conditionally render SampleComponentWithLogging */}
            {isMounted && <SampleComponentWithLogging message="Hello, World!" />}
        </div>
    );
};

export default ParentComponent;
