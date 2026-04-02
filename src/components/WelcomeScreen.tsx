type Props = { deadline: string; onStart: () => void }

export default function WelcomeScreen({ deadline, onStart }: Props) {
  return (
    <div className="welcome">
      <div className="welcome-card">
        <p className="label-top">41ST YLEA</p>
        <p className="welcome-sub">YLEA 2026</p>
        <h1>41st Youth Leadership Excellence Awards (YLEA) 2026</h1>
        <p className="welcome-desc">
          Complete the official nomination dossier. Use block letters, upload proof of excellence,
          and ensure every section is accurate before submission.
        </p>
        <div className="info-box">
          <div className="info-row"><span>Deadline</span><strong>{deadline}</strong></div>
          <div className="info-row"><span>Program Year</span><strong>SY 2025–2026</strong></div>
          <div className="info-row"><span>Submission Mode</span><strong>Online Portfolio</strong></div>
        </div>
        <p className="ref-note">Keep your Reference ID safe — use it to monitor your application status anytime.</p>
        <button className="btn-primary" onClick={onStart}>Start Nomination</button>
      </div>
    </div>
  )
}
