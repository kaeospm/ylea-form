import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { ApplicationRow } from '../../types'
import '../../admin.css'

export default function AdminDetail() {
  const { id } = useParams<{ id: string }>()
  const [app, setApp] = useState<ApplicationRow | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin', { replace: true })
        return
      }
      fetchApplication()
    })
  }, [id, navigate])

  const fetchApplication = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('ylea_applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Fetch error:', error)
    } else {
      setApp(data)
    }
    setLoading(false)
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Loading application...</div></div>
  if (!app) return <div className="admin-page"><div className="admin-empty">Application not found.</div></div>

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-left">
          <button className="btn-secondary" onClick={() => navigate('/admin/dashboard')}>&larr; Back</button>
          <div>
            <p className="label-top">APPLICATION</p>
            <h1>{app.full_name}</h1>
          </div>
        </div>
        <div className="admin-header-right">
          <code className="ref-code ref-code-lg">{app.reference_id}</code>
        </div>
      </header>

      <div className="detail-grid">
        <Section title="General Information">
          <Row label="Full Name" value={app.full_name} />
          <Row label="Address" value={app.complete_address} />
          <Row label="Municipality" value={app.municipality} />
          <Row label="Phone" value={app.phone_number} />
          <Row label="Email" value={app.email} />
          <Row label="Birthday" value={app.birthday} />
          <Row label="Age" value={String(app.age)} />
          <Row label="Sex" value={app.sex} />
        </Section>

        <Section title="School Information">
          <Row label="Level" value={app.school_level} />
          <Row label="School Name" value={app.school_name} />
          <Row label="School Address" value={app.school_address} />
          <Row label="School Head" value={app.school_head_name} />
          <Row label="Head Email" value={app.school_head_email} />
          <Row label="Head Mobile" value={app.school_head_mobile} />
          <Row label="Advisor" value={app.advisor_name} />
          <Row label="Advisor Email" value={app.advisor_email} />
          <Row label="Advisor Mobile" value={app.advisor_mobile} />
        </Section>

        <Section title="Uploaded Documents">
          <FileRow label="Nomination Letter" url={app.nomination_letter_url} />
          <FileRow label="Academic Records" url={app.academic_records_url} />
          <FileRow label="Picture" url={app.picture_url} />
        </Section>

        <Section title="Video Link">
          {app.video_link ? (
            <a href={app.video_link} target="_blank" rel="noopener noreferrer" className="detail-link">
              {app.video_link}
            </a>
          ) : (
            <span className="detail-empty">No video submitted</span>
          )}
        </Section>

        <ClaimsSection title="Academic Claims" claims={app.academic_claims} />
        <ClaimsSection title="Leadership Claims" claims={app.leadership_claims} />
        <ClaimsSection title="Community Claims" claims={app.community_claims} />

        <Section title="Submission Details">
          <Row label="Reference ID" value={app.reference_id} />
          <Row label="Confirmed" value={app.confirmed ? 'Yes' : 'No'} />
          <Row label="Submitted At" value={new Date(app.created_at).toLocaleString('en-PH', { dateStyle: 'long', timeStyle: 'short' })} />
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="detail-section">
      <h2 className="detail-section-title">{title}</h2>
      <div className="detail-section-body">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value || '—'}</span>
    </div>
  )
}

function FileRow({ label, url }: { label: string; url: string | null }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="detail-link">
          View File
        </a>
      ) : (
        <span className="detail-empty">Not uploaded</span>
      )}
    </div>
  )
}

function ClaimsSection({ title, claims }: { title: string; claims: Record<string, unknown>[] }) {
  console.log(`[DEBUG] ${title} raw data:`, JSON.stringify(claims, null, 2))
  const validClaims = claims?.filter(c => c.award || c.participation) || []

  return (
    <div className="detail-section">
      <h2 className="detail-section-title">{title}</h2>
      <div className="detail-section-body">
        {validClaims.length === 0 ? (
          <span className="detail-empty">No claims submitted</span>
        ) : (
          validClaims.map((claim, i) => {
            const proofUrl = (claim.proofUrl || claim.proofurl || claim.proof_url) as string | undefined

            return (
              <div key={i} className="detail-claim">
                <div className="detail-claim-header">Claim #{i + 1}</div>
                <Row label="Award" value={String(claim.award || '')} />
                <Row label="Participation" value={String(claim.participation || '')} />
                <Row label="Rank" value={String(claim.rank || '')} />
                <Row label="Level" value={String(claim.level || '')} />
                {claim.modality && <Row label="Modality" value={String(claim.modality)} />}
                <div className="detail-row">
                  <span className="detail-label">Proof</span>
                  {proofUrl ? (
                    <a href={proofUrl} target="_blank" rel="noopener noreferrer" className="detail-link">
                      View Proof
                    </a>
                  ) : (
                    <span className="detail-empty">No proof uploaded</span>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
