import type { FormData } from '../../types'

type Props = {
  form: FormData
  update: (f: Partial<FormData>) => void
  onPrev: () => void
  onSubmit: () => void
  submitting: boolean
  error: string
}

export default function Confirmation({ form, update, onPrev, onSubmit, submitting, error }: Props) {
  return (
    <div className="form-section">
      <div className="section-header">
        <h2>VIII. Data Privacy & Confirmation</h2>
        <p className="section-sub">IMPORTANT NOTICE: Once submitted, no further edits can be made. Please review all information carefully.</p>
      </div>
      <div className="section-body">
        <div className="confirmation-terms">
          <ol>
            <li><strong>Data Privacy:</strong> I understand that my personal information will be used solely for evaluating my nomination and kept confidential by authorized personnel only.</li>
            <li><strong>Truthfulness:</strong> I affirm that all submitted information and supporting documents are accurate and truthful. False information may lead to disqualification.</li>
            <li><strong>Confirmation:</strong> I have read and agree to the YLEA ANTIQUE nomination guidelines and requirements.</li>
          </ol>
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.confirmed}
            onChange={e => update({ confirmed: e.target.checked })}
          />
          I hereby acknowledge and accept the terms outlined above.
        </label>
        {error && <p className="error-msg">{error}</p>}
      </div>
      <div className="section-nav">
        <button className="btn-secondary" onClick={onPrev} disabled={submitting}>← Back</button>
        <button
          className="btn-primary"
          onClick={onSubmit}
          disabled={!form.confirmed || submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Nomination'}
        </button>
      </div>
    </div>
  )
}
