type Props = { steps: string[]; current: number }

export default function ProgressBar({ steps, current }: Props) {
  return (
    <div className="progress-bar">
      {steps.map((s, i) => (
        <div key={s} className={`progress-step ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}>
          <div className="progress-dot">{i < current ? '✓' : i + 1}</div>
          <span className="progress-label">{s}</span>
        </div>
      ))}
    </div>
  )
}
