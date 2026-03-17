import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/LoginScreen'
import Register from './pages/RegisterScreen'
import Home from './pages/HomeScreen'
import Search from './pages/SearchScreen'
import Product from './pages/ProductScreen'
import User from './pages/UserScreen'
import Cart from './pages/CartScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App