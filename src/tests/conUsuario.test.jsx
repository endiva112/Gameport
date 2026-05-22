import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

vi.mock('../zustand/authStore', () => ({
  useAuthStore: (selector) =>
    selector({
      user: { id: 1, email: 'test@gameport.com', password: 'actual123' },
      logout: vi.fn(),
    }),
}))

import ProtectedRoute from '../components/ProtectedRoute'
import PublicRoute from '../components/PublicRoute'

const PaginaProtegida = () => <div>Contenido protegido</div>
const PaginaPublica   = () => <div>Contenido público</div>

function navegarProtegida(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path={ruta} element={<ProtectedRoute><PaginaProtegida /></ProtectedRoute>} />
        <Route path="/login" element={<div>Página de login</div>} />
      </Routes>
    </MemoryRouter>
  )
}

function navegarPublica(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path={ruta} element={<PublicRoute><PaginaPublica /></PublicRoute>} />
        <Route path="/" element={<div>Página de inicio</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Navegación con usuario registrado', () => {

  it('/ muestra el contenido protegido', () => {
    navegarProtegida('/')
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
    expect(screen.queryByText('Página de login')).not.toBeInTheDocument()
  })

  it('/search muestra el contenido protegido', () => {
    navegarProtegida('/search')
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  it('/user muestra el contenido protegido', () => {
    navegarProtegida('/user')
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  it('/cart muestra el contenido protegido', () => {
    navegarProtegida('/cart')
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  it('/login redirige al inicio', () => {
    navegarPublica('/login')
    expect(screen.getByText('Página de inicio')).toBeInTheDocument()
    expect(screen.queryByText('Contenido público')).not.toBeInTheDocument()
  })

  it('/register redirige al inicio', () => {
    navegarPublica('/register')
    expect(screen.getByText('Página de inicio')).toBeInTheDocument()
  })

})