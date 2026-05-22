import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

vi.mock('../zustand/authStore', () => ({
  useAuthStore: (selector) =>
    selector({
      user: null,
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

describe('Navegación sin usuario registrado', () => {

  it('/ redirige a login', () => {
    navegarProtegida('/')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })

  it('/search redirige a login', () => {
    navegarProtegida('/search')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })

  it('/user redirige a login', () => {
    navegarProtegida('/user')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })

  it('/cart redirige a login', () => {
    navegarProtegida('/cart')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })

  it('/login es accesible y muestra su contenido', () => {
    navegarPublica('/login')
    expect(screen.getByText('Contenido público')).toBeInTheDocument()
  })

  it('/register es accesible y muestra su contenido', () => {
    navegarPublica('/register')
    expect(screen.getByText('Contenido público')).toBeInTheDocument()
  })

})