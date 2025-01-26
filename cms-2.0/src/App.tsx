import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AddCity from "./pages/AddCity"
import AddCountry from "./pages/AddCountry"
import ViewCity from "./pages/ViewCity"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-city" element={<AddCity />} />
          <Route path="/add-country" element={<AddCountry />} />
          <Route path="/view-city" element={<ViewCity />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App