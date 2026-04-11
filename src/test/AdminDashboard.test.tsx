import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminDashboard from '../components/admin/AdminDashboard'
import { supabase } from '../lib/supabase'
import { mockApplication, mockApplicationNoFiles } from './helpers'

const mockSession = { user: { id: '1', email: 'admin@test.com' }, access_token: 'test' }

describe('O. Admin Dashboard', () => {
  beforeEach(() => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({ data: { session: mockSession } } as never)
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: [mockApplication, mockApplicationNoFiles],
          error: null,
        }),
      }),
    } as never)
  })

  const renderDashboard = () =>
    render(<MemoryRouter initialEntries={['/admin/dashboard']}><AdminDashboard /></MemoryRouter>)

  it('O1 — Dashboard loads with applications', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Applications Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Dela Cruz, Juan M.')).toBeInTheDocument()
      expect(screen.getByText('Santos, Maria C.')).toBeInTheDocument()
    })
  })

  it('O3 — Application count shown', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('2 total')).toBeInTheDocument()
    })
  })

  it('O4 — Table columns correct', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('#')).toBeInTheDocument()
      expect(screen.getByText('Reference ID')).toBeInTheDocument()
      expect(screen.getByText('Full Name')).toBeInTheDocument()
      expect(screen.getByText('Municipality')).toBeInTheDocument()
      expect(screen.getByText('School')).toBeInTheDocument()
      expect(screen.getByText('Level')).toBeInTheDocument()
      expect(screen.getByText('Submitted')).toBeInTheDocument()
    })
  })

  it('O6 — Reference ID displayed in table', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('YLEA-ABC12345')).toBeInTheDocument()
    })
  })

  it('O8 — Search by name filters table', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Applications Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Dela Cruz, Juan M.')).toBeInTheDocument()
    })
    const searchInput = screen.getByPlaceholderText(/Search by name/)
    await userEvent.type(searchInput, 'zzzznonexistent')
    expect(screen.queryByText('Dela Cruz, Juan M.')).not.toBeInTheDocument()
    expect(screen.getByText(/No applications match your search/)).toBeInTheDocument()
  })

  it('O13 — Search no results message', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Applications Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Dela Cruz, Juan M.')).toBeInTheDocument()
    })
    const searchInput = screen.getByPlaceholderText(/Search by name/)
    await userEvent.type(searchInput, 'nonexistentperson')
    expect(screen.getByText(/No applications match your search/)).toBeInTheDocument()
  })

  it('O14 — Municipality filter dropdown populated', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Applications Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Dela Cruz, Juan M.')).toBeInTheDocument()
    })
    const select = screen.getByDisplayValue('All Municipalities')
    expect(select).toBeInTheDocument()
    expect(select.querySelectorAll('option').length).toBeGreaterThan(1)
  })

  it('O20 — View button present for each row', async () => {
    renderDashboard()
    await waitFor(() => {
      const viewButtons = screen.getAllByText('View')
      expect(viewButtons).toHaveLength(2)
    })
  })

  it('O21 — Sign Out button present', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })
  })

  it('O21 — Sign Out calls supabase signOut', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })
    await userEvent.click(screen.getByText('Sign Out'))
    expect(supabase.auth.signOut).toHaveBeenCalled()
  })

  it('O22 — Footer shows filtered count', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Showing 2 of 2 applications')).toBeInTheDocument()
    })
  })

  it('O19 — Refresh button present', async () => {
    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('Refresh')).toBeInTheDocument()
    })
  })

  it('O23 — Empty state when no applications', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
    } as never)

    renderDashboard()
    await waitFor(() => {
      expect(screen.getByText('No applications yet.')).toBeInTheDocument()
    })
  })
})
