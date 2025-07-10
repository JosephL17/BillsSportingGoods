import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'

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
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App