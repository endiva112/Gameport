import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../supabaseClient', () => ({
  supabase: {
    from: () => ({
      update: () => ({
        eq: () => ({ error: null }),
      }),
      delete: () => ({
        eq: () => ({ error: null }),
      }),
    }),
  },
}))

vi.mock('../zustand/authStore', () => ({
  useAuthStore: (selector) =>
    selector({
      user: { id: 1, email: 'test@gameport.com', password: 'actual123' },
      logout: vi.fn(),
    }),
}))

import Account from '../pages/UserScreen'

function renderAccount() {
  render(
    <MemoryRouter>
      <Account />
    </MemoryRouter>
  )
}

function fillForm(current, newPass, confirm) {
  fireEvent.change(screen.getByPlaceholderText('Contraseña actual'), {
    target: { value: current },
  })
  fireEvent.change(screen.getByPlaceholderText('Nueva contraseña'), {
    target: { value: newPass },
  })
  fireEvent.change(screen.getByPlaceholderText('Confirmar nueva contraseña'), {
    target: { value: confirm },
  })
}

describe('UserScreen — cambio de contraseña', () => {

  beforeEach(() => {
    renderAccount()
  })

  it('muestra error si algún campo está vacío', () => {
    fillForm('actual123', 'nueva123', '')
    fireEvent.click(screen.getByText('Actualizar contraseña'))
    expect(screen.getByText('Completa todos los campos')).toBeInTheDocument()
  })

  it('muestra error si la contraseña actual es incorrecta', () => {
    fillForm('incorrecta', 'nueva123', 'nueva123')
    fireEvent.click(screen.getByText('Actualizar contraseña'))
    expect(screen.getByText('Contraseña actual incorrecta')).toBeInTheDocument()
  })

  it('muestra error si la nueva contraseña y la confirmación no coinciden', () => {
    fillForm('actual123', 'nueva123', 'diferente456')
    fireEvent.click(screen.getByText('Actualizar contraseña'))
    expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument()
  })

  it('muestra éxito si todos los campos son correctos', async () => {
    fillForm('actual123', 'nueva123', 'nueva123')
    fireEvent.click(screen.getByText('Actualizar contraseña'))
    expect(
      await screen.findByText('Contraseña actualizada correctamente')
    ).toBeInTheDocument()
  })

})