import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ApplicationRow } from '../types'

type Props = {
  onFound: (app: ApplicationRow) => void
  onBack: () => void
}

export default function LookupScreen({ onFound, onBack }: Props) {
  const [refId, setRefId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = refId.trim().toUpperCase()
    if (!trimmed) return

    setLoading(true)
    setError('')

    const { data, error: fetchError } = await supabase
      .from('ylea_applications')
      .select('*')
      .eq('reference_id', trimmed)
      .single()

    if (fetchError || !data) {
      setError('Application not found. Please check your Reference ID and try again.')
      setLoading(false)
      return
    }

    onFound(data)
    setLoading(false)
  }

  return (
    <div className="welcome">
      <div className="welcome-card">
        <p className="label-top">41ST YLEA</p>
        <h1>Update Application</h1>
        <p className="welcome-desc">
          Enter your Reference ID to access your submitted application. You can re-upload
          missing documents and proof files.
        </p>

        <form onSubmit={handleLookup} className="lookup-form">
          <div className="field">
            <label className="field-label">Reference ID</label>
            <input
              className="field-input lookup-input"
              type="text"
              value={refId}
              onChange={e => setRefId(e.target.value)}
              placeholder="YLEA-XXXXXXXX"
              autoFocus
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <div className="welcome-actions">
            <button className="btn-primary" type="submit" disabled={loading || !refId.trim()}>
              {loading ? 'Looking up...' : 'Find Application'}
            </button>
            <button className="btn-secondary" type="button" onClick={onBack}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
