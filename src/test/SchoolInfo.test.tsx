import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SchoolInfo from '../components/steps/SchoolInfo'
import { emptyForm, filledForm } from './helpers'

describe('D. Step 2 — School Information', () => {
  const defaultProps = { form: emptyForm, update: vi.fn(), onNext: vi.fn(), onPrev: vi.fn() }

  it('D1 — All fields render', () => {
    render(<SchoolInfo {...defaultProps} />)
    expect(screen.getByText('II. School Information')).toBeInTheDocument()
    // Use getAllByText for labels that may appear in multiple contexts
    expect(screen.getAllByText(/Name of School/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Address of School/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Full Name of School Head/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/School Head Email/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/School Head Mobile/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Full Name of Class Advisor/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Class Advisor Email/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Class Advisor Mobile/).length).toBeGreaterThanOrEqual(1)
  })

  it('D2 — Empty form blocks navigation', () => {
    render(<SchoolInfo {...defaultProps} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
    expect(screen.getByText(/Please fill in all required fields/)).toBeInTheDocument()
  })

  it('D3 — Filled form shows Continue button', () => {
    render(<SchoolInfo {...defaultProps} form={filledForm} />)
    expect(screen.getByText(/Continue/)).toBeInTheDocument()
  })

  it('D4 — Back button calls onPrev', async () => {
    const onPrev = vi.fn()
    render(<SchoolInfo {...defaultProps} onPrev={onPrev} />)
    await userEvent.click(screen.getByText(/Back/))
    expect(onPrev).toHaveBeenCalledOnce()
  })

  it('D5 — School Head Email field type is email', () => {
    render(<SchoolInfo {...defaultProps} />)
    const inputs = document.querySelectorAll('input[type="email"]')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  it('D6 — Mobile fields type is tel', () => {
    render(<SchoolInfo {...defaultProps} />)
    const telInputs = document.querySelectorAll('input[type="tel"]')
    expect(telInputs.length).toBeGreaterThanOrEqual(2)
  })
})
