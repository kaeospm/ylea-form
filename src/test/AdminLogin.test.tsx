import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminLogin from '../components/admin/AdminLogin'
import { supabase } from '../lib/supabase'

describe('N. Admin Login', () => {
  beforeEach(() => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({ data: { session: null } } as never)
  })

  const renderLogin = () =>
    render(<MemoryRouter initialEntries={['/admin']}><AdminLogin /></MemoryRouter>)

  const getEmailInput = () => document.querySelector('input[type="email"]') as HTMLInputElement
  const getPasswordInput = () => document.querySelector('input[type="password"]') as HTMLInputElement

  it('N1 — Login page loads with all elements', () => {
    renderLogin()
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
    expect(screen.getByText('Sign in to view applications')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('N2 — 41ST YLEA label shown', () => {
    renderLogin()
    expect(screen.getByText('41ST YLEA')).toBeInTheDocument()
  })

  it('N3 — Email and password fields are required', () => {
    renderLogin()
    expect(getEmailInput()).toBeRequired()
    expect(getPasswordInput()).toBeRequired()
  })

  it('N4 — Invalid credentials show error', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials', name: 'AuthApiError', status: 400 },
    } as never)

    renderLogin()
    await userEvent.type(getEmailInput(), 'wrong@test.com')
    await userEvent.type(getPasswordInput(), 'wrongpass')
    await userEvent.click(screen.getByText('Sign In'))

    expect(await screen.findByText('Invalid login credentials')).toBeInTheDocument()
  })

  it('N6 — Loading state during login', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves — stays loading
    )

    renderLogin()
    await userEvent.type(getEmailInput(), 'admin@test.com')
    await userEvent.type(getPasswordInput(), 'password')
    await userEvent.click(screen.getByText('Sign In'))

    expect(screen.getByText('Signing in...')).toBeInTheDocument()
    expect(screen.getByText('Signing in...')).toBeDisabled()
  })

  it('N8 — Email field has autofocus', () => {
    renderLogin()
    expect(getEmailInput()).toHaveFocus()
  })

  it('N — Password field type is password', () => {
    renderLogin()
    expect(getPasswordInput()).toHaveAttribute('type', 'password')
  })

  it('N — Email field type is email', () => {
    renderLogin()
    expect(getEmailInput()).toHaveAttribute('type', 'email')
  })
})
