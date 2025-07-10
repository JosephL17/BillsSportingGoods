import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path='/products/category/:categoryName' element={<ProductsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App