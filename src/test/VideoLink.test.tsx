import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VideoLink from '../components/steps/VideoLink'
import { emptyForm, filledForm } from './helpers'

describe('I. Step 7 — Video Link', () => {
  const defaultProps = { form: emptyForm, update: vi.fn(), onNext: vi.fn(), onPrev: vi.fn() }

  it('I1 — Video link field renders', () => {
    render(<VideoLink {...defaultProps} />)
    expect(screen.getByText('VII. Video Link')).toBeInTheDocument()
    expect(screen.getByText(/Video Presentation Link/)).toBeInTheDocument()
  })

  it('I2 — Empty field blocks navigation', () => {
    render(<VideoLink {...defaultProps} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
    expect(screen.getByText(/A video link is required/)).toBeInTheDocument()
  })

  it('I3 — Helper text correct', () => {
    render(<VideoLink {...defaultProps} />)
    expect(screen.getByText(/Share your video via YouTube, Facebook, Vimeo/)).toBeInTheDocument()
  })

  it('I4 — Valid URL enables Continue', () => {
    render(<VideoLink {...defaultProps} form={filledForm} />)
    expect(screen.getByText(/Continue/)).toBeInTheDocument()
  })

  it('I5 — Whitespace-only is rejected', () => {
    const formWithSpaces = { ...emptyForm, videoLink: '   ' }
    render(<VideoLink {...defaultProps} form={formWithSpaces} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
  })

  it('I6 — Input type is url', () => {
    render(<VideoLink {...defaultProps} />)
    const urlInput = document.querySelector('input[type="url"]')
    expect(urlInput).toBeInTheDocument()
  })

  it('I — Back button works', async () => {
    const onPrev = vi.fn()
    render(<VideoLink {...defaultProps} onPrev={onPrev} />)
    await userEvent.click(screen.getByText(/Back/))
    expect(onPrev).toHaveBeenCalledOnce()
  })
})
