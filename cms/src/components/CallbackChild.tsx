import React, { memo } from "react";
interface CallbackChildProps {
    test: string;
    handleChange: () => void;
    hello: string
}

const CallbackChild: React.FC<CallbackChildProps> = ({ test, handleChange, hello }) => {
    console.log(test);

    console.log('Child re rendered')
    return (
        <div>
            This is child callback
            <button onClick={handleChange} >Change me</button>
        </div>
    )
}

export default memo(CallbackChild)