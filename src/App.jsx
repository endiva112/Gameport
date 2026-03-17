import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginScreen'
import Register from './pages/RegisterScreen'
import Home from './pages/HomeScreen'
import Search from './pages/SearchScreen'
import Product from './pages/ProductScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App