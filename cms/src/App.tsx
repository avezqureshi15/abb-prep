import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AddCountry from "./pages/AddCountry"
import AddCity from "./pages/AddCity"
import Hooks from "./pages/Hooks"
import UseMemoExample from "./components/UseMemo"
import ThemeComponent from "./components/ThemeComponent"
import ThemeProvider from "./components/ThemeContext"
import ViewCity from "./pages/ViewCity"

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add-country' element={<AddCountry />} />
            <Route path='/add-city' element={<AddCity />} />
            <Route path='/view-city' element={<ViewCity />} />
            <Route path='/hooks' element={<Hooks />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
