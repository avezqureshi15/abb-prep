import { createContext, ReactNode, useState } from "react";
interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
interface ThemeProviderProps {
    children: ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<string>("light");
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }} >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider