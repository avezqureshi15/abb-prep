import { useContext } from "react"
import { ThemeContext } from "./ThemeContext";

const ThemeComponent = () => {
    const context = useContext(ThemeContext);
    console.log(context)
    if (!context) {
        throw new Error('useContext must be used within a ThemeProvider')
    }

    const { theme, toggleTheme } = context;
    return (
        <div
            style={{
                backgroundColor: theme === "light" ? "#fff" : "#333",
                color: theme === "light" ? "#000" : "#fff",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <p>Current theme : {theme}</p>
            <button onClick={toggleTheme} >Toggle Theme</button>
        </div>
    )
}

export default ThemeComponent