import useToggle from "../hooks/useToggle"

const Toggle = () => {
    const [isToggled, toggle] = useToggle();
    return (
        <>
            <p>Toggle State : {isToggled ? 'ON' : 'OFF'}</p>
            <button onClick={toggle} >Toggle</button>
        </>
    )
}

export default Toggle