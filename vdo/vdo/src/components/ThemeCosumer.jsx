import React, { useContext } from 'react'
import { ThemeContext } from './ThemeProvider';

const ThemeCosumer = () => {
    const context = useContext(ThemeContext);
    const { theme, toggleTheme } = context;
    console.log(context);
    return (
        <>
            <div
                style={{
                    background: theme === 'light' ? '#fff' : '#000',
                    color: theme === 'light' ? '#000' : '#fff',
                    width: '200px',
                    height: '200px'
                }}
            >
                Theme App

                <button onClick={toggleTheme} >Change Theme</button>
            </div>
        </>

    )
}

export default ThemeCosumer