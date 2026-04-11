import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Requirements from '../components/steps/Requirements'
import { emptyForm, filledForm } from './helpers'

describe('E. Step 3 — Requirements (File Uploads)', () => {
  const defaultProps = { form: emptyForm, update: vi.fn(), onNext: vi.fn(), onPrev: vi.fn() }

  it('E1 — All upload fields render', () => {
    render(<Requirements {...defaultProps} />)
    expect(screen.getByText('III. Requirements')).toBeInTheDocument()
    expect(screen.getByText(/Nomination Letter/)).toBeInTheDocument()
    expect(screen.getByText(/Academic Records/)).toBeInTheDocument()
    expect(screen.getByText(/2x2 Picture/)).toBeInTheDocument()
  })

  it('E2 — No uploads blocks navigation', () => {
    render(<Requirements {...defaultProps} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
    expect(screen.getByText(/Please upload all required documents/)).toBeInTheDocument()
  })

  it('E6 — Nomination Letter helper text', () => {
    render(<Requirements {...defaultProps} />)
    expect(screen.getByText(/Signed by the school head or principal/)).toBeInTheDocument()
  })

  it('E7 — Academic Records helper text', () => {
    render(<Requirements {...defaultProps} />)
    expect(screen.getByText(/Form 137 for Elementary/)).toBeInTheDocument()
  })

  it('E8 — Picture helper text', () => {
    render(<Requirements {...defaultProps} />)
    expect(screen.getByText(/clear 2x2 picture/)).toBeInTheDocument()
  })

  it('E9 — All three uploaded enables Continue', () => {
    render(<Requirements {...defaultProps} form={filledForm} />)
    expect(screen.getByText(/Continue/)).toBeInTheDocument()
    expect(screen.queryByText(/Please upload all required documents/)).not.toBeInTheDocument()
  })

  it('E10 — Back button works', async () => {
    const onPrev = vi.fn()
    render(<Requirements {...defaultProps} onPrev={onPrev} />)
    await userEvent.click(screen.getByText(/Back/))
    expect(onPrev).toHaveBeenCalledOnce()
  })

  it('E3/E4/E5 — File inputs have correct accept attributes', () => {
    render(<Requirements {...defaultProps} />)
    const fileInputs = document.querySelectorAll('input[type="file"]')
    expect(fileInputs.length).toBe(3)
    // Nomination Letter accepts pdf, jpg, jpeg, png
    expect(fileInputs[0].getAttribute('accept')).toContain('.pdf')
    // Academic Records accepts pdf, jpg, jpeg, png
    expect(fileInputs[1].getAttribute('accept')).toContain('.pdf')
    // Picture accepts jpg, jpeg, png
    expect(fileInputs[2].getAttribute('accept')).toContain('.jpg')
  })
})
