import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminDetail from '../components/admin/AdminDetail'
import { supabase } from '../lib/supabase'
import { mockApplication, mockApplicationNoFiles } from './helpers'

const mockSession = { user: { id: '1', email: 'admin@test.com' }, access_token: 'test' }

describe('P. Admin Application Detail', () => {
  beforeEach(() => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({ data: { session: mockSession } } as never)
  })

  const renderDetail = (appData = mockApplication) => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: appData, error: null }),
        }),
      }),
    } as never)
    return render(<MemoryRouter initialEntries={['/admin/application/test-id-123']}><AdminDetail /></MemoryRouter>)
  }

  it('P1 — Detail page loads', async () => {
    renderDetail()
    await waitFor(() => {
      // Name appears in header and General Info section
      const nameEls = screen.getAllByText('Dela Cruz, Juan M.')
      expect(nameEls.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('P4 — Applicant name in header', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Dela Cruz, Juan M.' })).toBeInTheDocument()
    })
  })

  it('P5 — Reference ID in header', async () => {
    renderDetail()
    await waitFor(() => {
      // Reference ID appears in header and Submission Details
      const refEls = screen.getAllByText('YLEA-ABC12345')
      expect(refEls.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('P6 — General Information section', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('General Information')).toBeInTheDocument()
      expect(screen.getByText('123 Rizal St., San Jose')).toBeInTheDocument()
      expect(screen.getByText('juan@example.com')).toBeInTheDocument()
      expect(screen.getByText('17')).toBeInTheDocument()
    })
  })

  it('P7 — School Information section', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('School Information')).toBeInTheDocument()
      expect(screen.getByText('Antique National High School')).toBeInTheDocument()
      expect(screen.getByText('Dr. Maria Santos')).toBeInTheDocument()
      expect(screen.getByText('Sir Roberto Villanueva')).toBeInTheDocument()
    })
  })

  it('P8 — Uploaded Documents section', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Uploaded Documents')).toBeInTheDocument()
    })
    const viewFileLinks = screen.getAllByText('View File')
    expect(viewFileLinks.length).toBe(3)
  })

  it('P9 — File links have correct href and target', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Uploaded Documents')).toBeInTheDocument()
    })
    const viewFileLinks = screen.getAllByText('View File')
    viewFileLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
    expect(viewFileLinks[0]).toHaveAttribute('href', 'https://example.com/nomination.pdf')
  })

  it('P10 — Missing files show "Not uploaded"', async () => {
    renderDetail(mockApplicationNoFiles)
    await waitFor(() => {
      expect(screen.getByText('Uploaded Documents')).toBeInTheDocument()
    })
    const notUploaded = screen.getAllByText('Not uploaded')
    expect(notUploaded.length).toBe(3)
  })

  it('P11 — Video link section', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Video Link')).toBeInTheDocument()
    })
    const videoLink = screen.getByText('https://youtube.com/watch?v=test123')
    expect(videoLink).toHaveAttribute('href', 'https://youtube.com/watch?v=test123')
    expect(videoLink).toHaveAttribute('target', '_blank')
  })

  it('P12 — Missing video shows message', async () => {
    renderDetail(mockApplicationNoFiles)
    await waitFor(() => {
      expect(screen.getByText('Video Link')).toBeInTheDocument()
    })
    expect(screen.getByText('No video submitted')).toBeInTheDocument()
  })

  it('P13 — Academic Claims section with data', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Academic Claims')).toBeInTheDocument()
    })
    expect(screen.getByText('Math Olympiad')).toBeInTheDocument()
    expect(screen.getByText('Science Quiz')).toBeInTheDocument()
  })

  it('P14 — Academic claim proof links', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Academic Claims')).toBeInTheDocument()
    })
    const proofLinks = screen.getAllByText('View Proof')
    expect(proofLinks.length).toBeGreaterThanOrEqual(2)
    expect(proofLinks[0]).toHaveAttribute('href', 'https://example.com/proof1.pdf')
  })

  it('P15 — Claims without proofUrl show "No proof uploaded"', async () => {
    renderDetail(mockApplicationNoFiles)
    await waitFor(() => {
      expect(screen.getByText('Academic Claims')).toBeInTheDocument()
    })
    // Both academic and leadership claims missing proof
    const noProof = screen.getAllByText('No proof uploaded')
    expect(noProof.length).toBeGreaterThanOrEqual(1)
  })

  it('P16 — Leadership Claims section with modality', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Leadership Claims')).toBeInTheDocument()
    })
    expect(screen.getByText('Student Council')).toBeInTheDocument()
    // Face-to-Face appears in both leadership and community
    const faceToFace = screen.getAllByText('Face-to-Face')
    expect(faceToFace.length).toBeGreaterThanOrEqual(1)
  })

  it('P18 — Community Claims section', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Community Claims')).toBeInTheDocument()
    })
    expect(screen.getByText('Clean-up Drive')).toBeInTheDocument()
  })

  it('P20 — Submission Details section', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Submission Details')).toBeInTheDocument()
    })
    expect(screen.getByText('Yes')).toBeInTheDocument() // confirmed
  })

  it('P21 — Empty claims section shows message', async () => {
    renderDetail(mockApplicationNoFiles)
    await waitFor(() => {
      expect(screen.getByText('Community Claims')).toBeInTheDocument()
    })
    expect(screen.getByText('No claims submitted')).toBeInTheDocument()
  })

  it('P22 — Invalid application shows not found', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }),
        }),
      }),
    } as never)
    render(<MemoryRouter initialEntries={['/admin/application/nonexistent']}><AdminDetail /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('Application not found.')).toBeInTheDocument()
    })
  })

  it('P3 — Back button present', async () => {
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText(/Back/)).toBeInTheDocument()
    })
  })

  it('P23 — Multiple claims display with sequential numbering', async () => {
    renderDetail()
    await waitFor(() => {
      // Claim #1 appears in all 3 claim sections, Claim #2 in academic
      const claim1s = screen.getAllByText('Claim #1')
      expect(claim1s.length).toBeGreaterThanOrEqual(3)
      expect(screen.getByText('Claim #2')).toBeInTheDocument()
    })
  })
})
