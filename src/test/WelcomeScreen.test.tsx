import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WelcomeScreen from '../components/WelcomeScreen'

describe('A. Welcome Screen', () => {
  const defaultProps = { deadline: 'April 10, 2026', onStart: vi.fn() }

  it('A1 — Welcome screen loads with all elements', () => {
    render(<WelcomeScreen {...defaultProps} />)
    expect(screen.getByText('41ST YLEA')).toBeInTheDocument()
    expect(screen.getByText(/41st Youth Leadership Excellence Awards/)).toBeInTheDocument()
    expect(screen.getByText('Start Nomination')).toBeInTheDocument()
  })

  it('A2 — Deadline displays correctly', () => {
    render(<WelcomeScreen {...defaultProps} />)
    expect(screen.getByText('April 10, 2026')).toBeInTheDocument()
  })

  it('A3 — Info box shows program year and submission mode', () => {
    render(<WelcomeScreen {...defaultProps} />)
    expect(screen.getByText('SY 2025–2026')).toBeInTheDocument()
    expect(screen.getByText('Online Portfolio')).toBeInTheDocument()
  })

  it('A4 — Reference ID note visible', () => {
    render(<WelcomeScreen {...defaultProps} />)
    expect(screen.getByText(/Keep your Reference ID safe/)).toBeInTheDocument()
  })

  it('A5 — Start button calls onStart', async () => {
    const onStart = vi.fn()
    render(<WelcomeScreen {...defaultProps} onStart={onStart} />)
    await userEvent.click(screen.getByText('Start Nomination'))
    expect(onStart).toHaveBeenCalledOnce()
  })

  it('A6 — Welcome card has correct CSS class for layout', () => {
    const { container } = render(<WelcomeScreen {...defaultProps} />)
    expect(container.querySelector('.welcome')).toBeInTheDocument()
    expect(container.querySelector('.welcome-card')).toBeInTheDocument()
  })
})
