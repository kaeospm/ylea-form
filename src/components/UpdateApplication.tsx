import { useState } from 'react'
import { supabase, uploadFile } from '../lib/supabase'
import type { ApplicationRow } from '../types'

type ClaimData = {
  id: number
  award: string
  participation: string
  rank: string
  level: string
  modality?: string
  proofUrl?: string
}

type Props = {
  application: ApplicationRow
  onDone: () => void
  onBack: () => void
}

export default function UpdateApplication({ application, onDone, onBack }: Props) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Track new file uploads
  const [nominationFile, setNominationFile] = useState<File | null>(null)
  const [academicRecordsFile, setAcademicRecordsFile] = useState<File | null>(null)
  const [pictureFile, setPictureFile] = useState<File | null>(null)

  // Track claim proof uploads: { 'academic-0': File, 'leadership-2': File, ... }
  const [claimProofs, setClaimProofs] = useState<Record<string, File>>({})

  const prefix = application.reference_id

  const setClaimProof = (type: string, index: number, file: File) => {
    setClaimProofs(prev => ({ ...prev, [`${type}-${index}`]: file }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const updates: Record<string, unknown> = {}

      // Upload main documents if new files provided
      if (nominationFile) {
        const url = await uploadFile(nominationFile, `${prefix}/nomination-letter`)
        if (url) updates.nomination_letter_url = url
      }
      if (academicRecordsFile) {
        const url = await uploadFile(academicRecordsFile, `${prefix}/academic-records`)
        if (url) updates.academic_records_url = url
      }
      if (pictureFile) {
        const url = await uploadFile(pictureFile, `${prefix}/picture`)
        if (url) updates.picture_url = url
      }

      // Upload claim proofs
      const claimTypes = [
        { key: 'academic_claims', data: application.academic_claims as ClaimData[], type: 'academic' },
        { key: 'leadership_claims', data: application.leadership_claims as ClaimData[], type: 'leadership' },
        { key: 'community_claims', data: application.community_claims as ClaimData[], type: 'community' },
      ]

      for (const ct of claimTypes) {
        let updated = false
        const claims = [...ct.data]
        for (let i = 0; i < claims.length; i++) {
          const file = claimProofs[`${ct.type}-${i}`]
          if (file) {
            const url = await uploadFile(file, `${prefix}/${ct.type}-claim-${i + 1}-proof`)
            if (url) {
              claims[i] = { ...claims[i], proofUrl: url }
              updated = true
            }
          }
        }
        if (updated) {
          updates[ct.key] = claims
        }
      }

      if (Object.keys(updates).length === 0) {
        setError('No new files selected. Please choose at least one file to upload.')
        setSaving(false)
        return
      }

      const { error: dbError } = await supabase
        .from('ylea_applications')
        .update(updates)
        .eq('reference_id', application.reference_id)

      if (dbError) throw dbError

      setSuccess('Application updated successfully! Your files have been uploaded.')
      // Clear file inputs
      setNominationFile(null)
      setAcademicRecordsFile(null)
      setPictureFile(null)
      setClaimProofs({})
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Update failed. Please try again.'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  const claims = [
    { title: 'Academic Claims', data: application.academic_claims as ClaimData[], type: 'academic' },
    { title: 'Leadership Claims', data: application.leadership_claims as ClaimData[], type: 'leadership' },
    { title: 'Community Claims', data: application.community_claims as ClaimData[], type: 'community' },
  ]

  return (
    <div className="update-page">
      <header className="app-header">
        <p className="label-top">UPDATE APPLICATION</p>
        <h1>{application.full_name}</h1>
        <p className="deadline">Reference ID: <strong>{application.reference_id}</strong></p>
      </header>

      <main className="update-main">
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}

        {/* Main Documents */}
        <div className="update-section">
          <h2>Required Documents</h2>
          <p className="section-sub">Re-upload any missing or failed documents below.</p>

          <FileUploadRow
            label="Nomination Letter"
            currentUrl={application.nomination_letter_url}
            onFileChange={setNominationFile}
            newFile={nominationFile}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <FileUploadRow
            label="Academic Records"
            currentUrl={application.academic_records_url}
            onFileChange={setAcademicRecordsFile}
            newFile={academicRecordsFile}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <FileUploadRow
            label="2x2 Picture"
            currentUrl={application.picture_url}
            onFileChange={setPictureFile}
            newFile={pictureFile}
            accept=".jpg,.jpeg,.png"
          />
        </div>

        {/* Claim Proofs */}
        {claims.map(({ title, data, type }) => {
          const validClaims = data?.filter((c: ClaimData) => c.award || c.participation) || []
          if (validClaims.length === 0) return null

          return (
            <div className="update-section" key={type}>
              <h2>{title}</h2>
              {validClaims.map((claim: ClaimData, i: number) => (
                <div className="update-claim" key={i}>
                  <div className="update-claim-info">
                    <strong>Claim #{i + 1}:</strong> {claim.award}
                    <span className="update-claim-detail">
                      {claim.participation} / {claim.rank} / {claim.level}
                      {claim.modality ? ` / ${claim.modality}` : ''}
                    </span>
                  </div>
                  <FileUploadRow
                    label={`Proof for Claim #${i + 1}`}
                    currentUrl={claim.proofUrl || null}
                    onFileChange={(f) => f && setClaimProof(type, i, f)}
                    newFile={claimProofs[`${type}-${i}`] || null}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              ))}
            </div>
          )
        })}

        {/* Video Link */}
        <div className="update-section">
          <h2>Video Link</h2>
          <div className="update-row">
            <span className="update-label">Current</span>
            {application.video_link ? (
              <a href={application.video_link} target="_blank" rel="noopener noreferrer" className="detail-link">
                {application.video_link}
              </a>
            ) : (
              <span className="update-missing">No video submitted</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="update-actions">
          <button className="btn-secondary" onClick={onBack} disabled={saving}>
            Back
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Uploading...' : 'Save Updates'}
          </button>
        </div>

        {success && (
          <div className="update-done-actions">
            <button className="btn-primary" onClick={onDone}>Return to Home</button>
          </div>
        )}
      </main>
    </div>
  )
}

function FileUploadRow({ label, currentUrl, onFileChange, newFile, accept }: {
  label: string
  currentUrl: string | null
  onFileChange: (f: File | null) => void
  newFile: File | null
  accept: string
}) {
  return (
    <div className="update-file-row">
      <div className="update-file-info">
        <span className="update-label">{label}</span>
        {currentUrl ? (
          <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="update-status update-status-ok">
            Uploaded
          </a>
        ) : (
          <span className="update-status update-status-missing">Missing</span>
        )}
      </div>
      <div className="update-file-input">
        <input
          type="file"
          accept={accept}
          onChange={e => onFileChange(e.target.files?.[0] ?? null)}
          className="field-file"
        />
        {newFile && <span className="update-new-file">New: {newFile.name}</span>}
      </div>
    </div>
  )
}
