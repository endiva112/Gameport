import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginScreen'
import Register from './pages/RegisterScreen'
import Loading from './pages/LoadingScreen'
import Home from './pages/HomeScreen'
import Filter from './pages/FilterScreen'
import Product from './pages/ProductScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App