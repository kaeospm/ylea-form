import type { Claim } from '../types'
import Field from './Field'

const PARTICIPATION_ACADEMIC = ['Contestant', 'Participant', 'N/A']
const PARTICIPATION_LEADERSHIP = ['Lead Organizer', 'Committee Chairperson', 'Committee Member', 'Participant/Member', 'Others']
const PARTICIPATION_COMMUNITY = ['Lead Organizer', 'Committee Chairperson', 'Committee Member', 'Participant/Member', 'Others', 'N/A']

const RANKS_ACADEMIC = ['1st or its equivalent', '2nd or its equivalent', '3rd or its equivalent', 'Other ranks', 'None']
const RANKS_LEADERSHIP = ['President/Mayor/Chairperson', 'Vice President/Vice Mayor/Vice Chairperson', 'Editor-in-Chief', 'Associate Editor', 'Managing Editor/Business Manager', 'Other Positions (Publication)', '1st or its equivalent', '2nd or its equivalent', '3rd or its equivalent', 'Other Ranks/Positions', 'Member/Participant', 'N/A']
const RANKS_COMMUNITY = ['President/Mayor/Chairperson', 'Vice President/Vice Mayor/Vice Chairperson', 'Member/Participant', '1st or its equivalent', '2nd or its equivalent', '3rd or its equivalent', 'Other ranks/positions', 'None']

const LEVELS_ACADEMIC = ['Homeroom', 'Grade', 'School', 'District', 'Cluster', 'Division/Provincial', 'Regional', 'National', 'International', 'N/A']
const LEVELS_COMMUNITY = ['Barangay', 'Municipal', 'Cluster', 'Provincial', 'Regional', 'National', 'International', 'N/A']

const MODALITY = ['Face-to-Face', 'Online', 'Hybrid', 'N/A']

type ClaimType = 'academic' | 'leadership' | 'community'

type Props = {
  claim: Claim
  index: number
  type: ClaimType
  onChange: (updated: Claim) => void
  onRemove?: () => void
}

export default function ClaimForm({ claim, index, type, onChange, onRemove }: Props) {
  const up = (fields: Partial<Claim>) => onChange({ ...claim, ...fields })

  const participation = type === 'academic' ? PARTICIPATION_ACADEMIC : type === 'leadership' ? PARTICIPATION_LEADERSHIP : PARTICIPATION_COMMUNITY
  const ranks = type === 'academic' ? RANKS_ACADEMIC : type === 'leadership' ? RANKS_LEADERSHIP : RANKS_COMMUNITY
  const levels = type === 'community' ? LEVELS_COMMUNITY : LEVELS_ACADEMIC

  return (
    <div className="claim-card">
      <div className="claim-header">
        <h3>Claim {index + 1}</h3>
        {onRemove && <button className="btn-remove" onClick={onRemove} type="button">Remove</button>}
      </div>
      <Field type="text" label="Name of Award or Certificate" required value={claim.award} onChange={v => up({ award: v })} />
      <Field type="radio" label="Type of Participation" required value={claim.participation} onChange={v => up({ participation: v })} options={participation} />
      <Field type="radio" label="Rank / Position" required value={claim.rank} onChange={v => up({ rank: v })} options={ranks} />
      <Field type="radio" label="Level" required value={claim.level} onChange={v => up({ level: v })} options={levels} />
      {(type === 'leadership' || type === 'community') && (
        <Field type="radio" label="Modality" required value={claim.modality || ''} onChange={v => up({ modality: v })} options={MODALITY} />
      )}
      <Field type="file" label="Upload Proof" required helper="Upload PDF/JPG evidence for this claim." onChange={f => up({ proofFile: f })} accept=".pdf,.jpg,.jpeg,.png" />
    </div>
  )
}
