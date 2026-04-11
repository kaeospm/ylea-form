import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressBar from '../components/ProgressBar'

const STEPS = ['General Info', 'School Info', 'Requirements', 'Academic', 'Leadership', 'Community', 'Video', 'Confirmation']

describe('B. Progress Bar', () => {
  it('B1 — Shows all 8 steps', () => {
    render(<ProgressBar steps={STEPS} current={0} />)
    STEPS.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument()
    })
  })

  it('B2 — Current step has active class', () => {
    const { container } = render(<ProgressBar steps={STEPS} current={2} />)
    const stepElements = container.querySelectorAll('.progress-step')
    expect(stepElements[2]).toHaveClass('active')
  })

  it('B2 — Completed steps have done class', () => {
    const { container } = render(<ProgressBar steps={STEPS} current={3} />)
    const stepElements = container.querySelectorAll('.progress-step')
    expect(stepElements[0]).toHaveClass('done')
    expect(stepElements[1]).toHaveClass('done')
    expect(stepElements[2]).toHaveClass('done')
    expect(stepElements[3]).toHaveClass('active')
  })

  it('B2 — Active step dot shows current number', () => {
    const { container } = render(<ProgressBar steps={STEPS} current={0} />)
    const dots = container.querySelectorAll('.progress-dot')
    expect(dots[0].textContent).toBe('1')
  })

  it('B2 — Completed step dot shows checkmark', () => {
    const { container } = render(<ProgressBar steps={STEPS} current={2} />)
    const dots = container.querySelectorAll('.progress-dot')
    expect(dots[0].textContent).toBe('✓')
    expect(dots[1].textContent).toBe('✓')
  })

  it('B3 — Inactive steps do not have active or done class', () => {
    const { container } = render(<ProgressBar steps={STEPS} current={0} />)
    const stepElements = container.querySelectorAll('.progress-step')
    for (let i = 1; i < stepElements.length; i++) {
      expect(stepElements[i]).not.toHaveClass('active')
      expect(stepElements[i]).not.toHaveClass('done')
    }
  })
})
