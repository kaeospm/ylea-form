import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Confirmation from '../components/steps/Confirmation'
import { emptyForm, filledForm } from './helpers'

describe('J. Step 8 — Confirmation & Submission', () => {
  const defaultProps = {
    form: emptyForm,
    update: vi.fn(),
    onPrev: vi.fn(),
    onSubmit: vi.fn(),
    submitting: false,
    error: '',
  }

  it('J1 — Terms and conditions display', () => {
    render(<Confirmation {...defaultProps} />)
    expect(screen.getByText('VIII. Data Privacy & Confirmation')).toBeInTheDocument()
    expect(screen.getByText(/personal information will be used solely/)).toBeInTheDocument()
    expect(screen.getByText(/all submitted information.*are accurate/)).toBeInTheDocument()
    expect(screen.getByText(/I have read and agree to the YLEA/)).toBeInTheDocument()
  })

  it('J2 — Important notice shown', () => {
    render(<Confirmation {...defaultProps} />)
    expect(screen.getByText(/Once submitted, no further edits can be made/)).toBeInTheDocument()
  })

  it('J3 — Checkbox unchecked by default', () => {
    render(<Confirmation {...defaultProps} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('J4 — Submit disabled without checkbox', () => {
    render(<Confirmation {...defaultProps} />)
    const submitBtn = screen.getByText('Submit Nomination')
    expect(submitBtn).toBeDisabled()
  })

  it('J5 — Submit enabled with checkbox', () => {
    const confirmedForm = { ...filledForm, confirmed: true }
    render(<Confirmation {...defaultProps} form={confirmedForm} />)
    const submitBtn = screen.getByText('Submit Nomination')
    expect(submitBtn).not.toBeDisabled()
  })

  it('J6 — Back button calls onPrev', async () => {
    const onPrev = vi.fn()
    render(<Confirmation {...defaultProps} onPrev={onPrev} />)
    await userEvent.click(screen.getByText(/Back/))
    expect(onPrev).toHaveBeenCalledOnce()
  })

  it('J7 — Submit calls onSubmit when confirmed', async () => {
    const onSubmit = vi.fn()
    const confirmedForm = { ...filledForm, confirmed: true }
    render(<Confirmation {...defaultProps} form={confirmedForm} onSubmit={onSubmit} />)
    await userEvent.click(screen.getByText('Submit Nomination'))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('J8 — Submit button shows Submitting state', () => {
    const confirmedForm = { ...filledForm, confirmed: true }
    render(<Confirmation {...defaultProps} form={confirmedForm} submitting={true} />)
    expect(screen.getByText('Submitting...')).toBeInTheDocument()
    expect(screen.getByText('Submitting...')).toBeDisabled()
  })

  it('J9 — Back button disabled during submission', () => {
    render(<Confirmation {...defaultProps} submitting={true} />)
    expect(screen.getByText(/Back/)).toBeDisabled()
  })

  it('J10 — Error message displays', () => {
    render(<Confirmation {...defaultProps} error="Network error occurred" />)
    expect(screen.getByText('Network error occurred')).toBeInTheDocument()
  })

  it('J — Checkbox toggles confirmed state', async () => {
    const update = vi.fn()
    render(<Confirmation {...defaultProps} update={update} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(update).toHaveBeenCalledWith({ confirmed: true })
  })
})
