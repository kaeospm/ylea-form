import type { FormData, Claim } from '../../types'
import ClaimForm from '../ClaimForm'
import FormSection from '../FormSection'

type Props = { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; onPrev: () => void }

export default function LeadershipProfile({ form, update, onNext, onPrev }: Props) {
  const claims = form.leadershipClaims

  const updateClaim = (i: number, updated: Claim) => {
    const next = [...claims]; next[i] = updated; update({ leadershipClaims: next })
  }
  const addClaim = () => {
    if (claims.length >= 20) return
    update({ leadershipClaims: [...claims, { id: claims.length + 1, award: '', participation: '', rank: '', level: '', modality: '', proofFile: null }] })
  }
  const removeClaim = (i: number) => {
    update({ leadershipClaims: claims.filter((_, idx) => idx !== i) })
  }

  const valid = claims.every(c => c.award && c.participation && c.rank && c.level && c.modality && c.proofFile)

  return (
    <FormSection title="V. Leadership Profile" subtitle="Document your leadership roles. Maximum of 20 claims." onNext={valid ? onNext : undefined} onPrev={onPrev}>
      {claims.map((c, i) => (
        <ClaimForm key={c.id} claim={c} index={i} type="leadership" onChange={u => updateClaim(i, u)} onRemove={i > 0 ? () => removeClaim(i) : undefined} />
      ))}
      {claims.length < 20 && (
        <button className="btn-add" onClick={addClaim} type="button">+ Add Leadership Claim</button>
      )}
      {!valid && <p className="validation-note">Please complete all claim fields to continue.</p>}
    </FormSection>
  )
}
