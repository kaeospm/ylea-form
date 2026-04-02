type Props = { referenceId: string }

export default function SuccessScreen({ referenceId }: Props) {
  return (
    <div className="welcome">
      <div className="welcome-card">
        <div className="success-icon">✓</div>
        <h1>Nomination Submitted!</h1>
        <p>Your nomination for the 40th YLEA 2026 has been received.</p>
        <div className="ref-box">
          <p>Your Reference ID</p>
          <strong className="ref-id">{referenceId}</strong>
          <p className="ref-note">Keep this safe — use it to monitor your application status.</p>
        </div>
      </div>
    </div>
  )
}
