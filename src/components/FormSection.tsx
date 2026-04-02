import type { ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
  onNext?: () => void
  onPrev?: () => void
  nextLabel?: string
}

export default function FormSection({ title, subtitle, children, onNext, onPrev, nextLabel = 'Continue' }: Props) {
  return (
    <div className="form-section">
      <div className="section-header">
        <h2>{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      <div className="section-body">{children}</div>
      <div className="section-nav">
        {onPrev && <button className="btn-secondary" onClick={onPrev}>← Back</button>}
        {onNext && <button className="btn-primary" onClick={onNext}>{nextLabel} →</button>}
      </div>
    </div>
  )
}
