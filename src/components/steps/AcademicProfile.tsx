import type { FormData, Claim } from '../../types'
import ClaimForm from '../ClaimForm'
import FormSection from '../FormSection'

type Props = { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; onPrev: () => void }

export default function AcademicProfile({ form, update, onNext, onPrev }: Props) {
  const claims = form.academicClaims

  const updateClaim = (i: number, updated: Claim) => {
    const next = [...claims]; next[i] = updated; update({ academicClaims: next })
  }
  const addClaim = () => {
    if (claims.length >= 20) return
    update({ academicClaims: [...claims, { id: claims.length + 1, award: '', participation: '', rank: '', level: '', proofFile: null }] })
  }
  const removeClaim = (i: number) => {
    update({ academicClaims: claims.filter((_, idx) => idx !== i) })
  }

  const valid = claims.every(c => c.award && c.participation && c.rank && c.level && c.proofFile)

  return (
    <FormSection title="IV. Academic Profile" subtitle="Document your academic awards. Maximum of 20 claims." onNext={valid ? onNext : undefined} onPrev={onPrev}>
      {claims.map((c, i) => (
        <ClaimForm key={c.id} claim={c} index={i} type="academic" onChange={u => updateClaim(i, u)} onRemove={i > 0 ? () => removeClaim(i) : undefined} />
      ))}
      {claims.length < 20 && (
        <button className="btn-add" onClick={addClaim} type="button">+ Add Academic Claim</button>
      )}
      {!valid && <p className="validation-note">Please complete all claim fields to continue.</p>}
    </FormSection>
  )
}
