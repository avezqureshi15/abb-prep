import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddCity from './pages/AddCity'
import AddCountry from './pages/AddCountry'
import ViewCity from './pages/ViewCity'
import PrUseMemo from './components/PrUseMemo'
import SampleComponentWithLogging from './components/HOCSample'
import Todo from './pages/Todo'
import Display from './components/Display'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/add-city' element={<AddCity />} />
          <Route path='/add-country' element={<AddCountry />} />
          <Route path='/view-city' element={<ViewCity />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
