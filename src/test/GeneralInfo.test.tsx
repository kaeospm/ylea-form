import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GeneralInfo from '../components/steps/GeneralInfo'
import { emptyForm, filledForm } from './helpers'

describe('C. Step 1 — General Information', () => {
  const defaultProps = { form: emptyForm, update: vi.fn(), onNext: vi.fn(), onPrev: vi.fn() }

  it('C1 — All fields render', () => {
    render(<GeneralInfo {...defaultProps} />)
    expect(screen.getByText('I. General Information')).toBeInTheDocument()
    expect(screen.getByText(/Full Name/)).toBeInTheDocument()
    expect(screen.getByText(/Complete Address/)).toBeInTheDocument()
    expect(screen.getByText(/Municipality/)).toBeInTheDocument()
    expect(screen.getByText(/Phone Number/)).toBeInTheDocument()
    expect(screen.getByText(/Email Address/)).toBeInTheDocument()
    expect(screen.getByText(/Birthday/)).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Sex')).toBeInTheDocument()
  })

  it('C2 — Empty form shows validation note, no Continue button', () => {
    render(<GeneralInfo {...defaultProps} />)
    expect(screen.getByText(/Please fill in all required fields/)).toBeInTheDocument()
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
  })

  it('C4 — Filled form shows Continue button', () => {
    render(<GeneralInfo {...defaultProps} form={filledForm} />)
    expect(screen.queryByText(/Please fill in all required fields/)).not.toBeInTheDocument()
    expect(screen.getByText(/Continue/)).toBeInTheDocument()
  })

  it('C5 — Full Name has placeholder', () => {
    render(<GeneralInfo {...defaultProps} />)
    expect(screen.getByPlaceholderText('Dela Cruz, Juan M.')).toBeInTheDocument()
  })

  it('C9 — Sex radio has Male and Female options', () => {
    render(<GeneralInfo {...defaultProps} />)
    expect(screen.getByLabelText('Male')).toBeInTheDocument()
    expect(screen.getByLabelText('Female')).toBeInTheDocument()
  })

  it('C10 — Sex radio allows only one selection', async () => {
    const update = vi.fn()
    render(<GeneralInfo {...defaultProps} update={update} />)
    await userEvent.click(screen.getByLabelText('Male'))
    expect(update).toHaveBeenCalledWith({ sex: 'Male' })
    await userEvent.click(screen.getByLabelText('Female'))
    expect(update).toHaveBeenCalledWith({ sex: 'Female' })
  })

  it('C12 — Continue calls onNext when form is filled', async () => {
    const onNext = vi.fn()
    render(<GeneralInfo {...defaultProps} form={filledForm} onNext={onNext} />)
    await userEvent.click(screen.getByText(/Continue/))
    expect(onNext).toHaveBeenCalledOnce()
  })

  it('C6 — Phone field type is tel', () => {
    render(<GeneralInfo {...defaultProps} />)
    const phoneInput = screen.getByPlaceholderText('09171234567')
    expect(phoneInput).toHaveAttribute('type', 'tel')
  })

  it('C7 — Email field type is email', () => {
    render(<GeneralInfo {...defaultProps} />)
    const emailInput = screen.getByPlaceholderText('juan.delacruz@example.com')
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('C8 — Age field type is number', () => {
    render(<GeneralInfo {...defaultProps} />)
    const ageInput = document.querySelector('input[type="number"]')
    expect(ageInput).toBeInTheDocument()
  })

  it('C3 — Partial fill still blocks navigation', () => {
    const partialForm = { ...emptyForm, fullName: 'Test', completeAddress: '123 St' }
    render(<GeneralInfo {...defaultProps} form={partialForm} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
    expect(screen.getByText(/Please fill in all required fields/)).toBeInTheDocument()
  })
})
