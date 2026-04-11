import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SuccessScreen from '../components/SuccessScreen'

describe('K. Success Screen', () => {
  it('K1 — Success screen displays with checkmark', () => {
    render(<SuccessScreen referenceId="YLEA-TEST1234" />)
    expect(screen.getByText('Nomination Submitted!')).toBeInTheDocument()
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('K2 — Reference ID shown', () => {
    render(<SuccessScreen referenceId="YLEA-TEST1234" />)
    expect(screen.getByText('YLEA-TEST1234')).toBeInTheDocument()
  })

  it('K3 — Reference ID format starts with YLEA-', () => {
    render(<SuccessScreen referenceId="YLEA-ABCD5678" />)
    const refEl = screen.getByText('YLEA-ABCD5678')
    expect(refEl.textContent).toMatch(/^YLEA-[A-Z0-9]{8}$/)
  })

  it('K4 — Save note shown', () => {
    render(<SuccessScreen referenceId="YLEA-TEST1234" />)
    expect(screen.getByText(/Keep this safe/)).toBeInTheDocument()
  })

  it('K — Nomination received message', () => {
    render(<SuccessScreen referenceId="YLEA-TEST1234" />)
    expect(screen.getByText(/nomination.*has been received/i)).toBeInTheDocument()
  })
})
