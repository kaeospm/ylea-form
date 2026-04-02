import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import GeneralInfo from './components/steps/GeneralInfo'
import SchoolInfo from './components/steps/SchoolInfo'
import Requirements from './components/steps/Requirements'
import AcademicProfile from './components/steps/AcademicProfile'
import LeadershipProfile from './components/steps/LeadershipProfile'
import CommunityProfile from './components/steps/CommunityProfile'
import VideoLink from './components/steps/VideoLink'
import Confirmation from './components/steps/Confirmation'
import SuccessScreen from './components/SuccessScreen'
import ProgressBar from './components/ProgressBar'
import type { FormData } from './types'
import { supabase, uploadFile, generateReferenceId } from './lib/supabase'
import './App.css'

const DEADLINE = 'April 10, 2026'

const emptyForm: FormData = {
  fullName: '', completeAddress: '', municipality: '', phoneNumber: '',
  email: '', birthday: '', age: '', sex: '',
  schoolLevel: '', schoolName: '', schoolAddress: '',
  schoolHeadName: '', schoolHeadEmail: '', schoolHeadMobile: '',
  advisorName: '', advisorEmail: '', advisorMobile: '',
  nominationLetterFile: null, academicRecordsFile: null, pictureFile: null,
  academicClaims: [{ id: 1, award: '', participation: '', rank: '', level: '', proofFile: null }],
  leadershipClaims: [{ id: 1, award: '', participation: '', rank: '', level: '', modality: '', proofFile: null }],
  communityClaims: [{ id: 1, award: '', participation: '', rank: '', level: '', modality: '', proofFile: null }],
  videoLink: '',
  confirmed: false,
}

const STEPS = [
  'General Info', 'School Info', 'Requirements',
  'Academic', 'Leadership', 'Community',
  'Video', 'Confirmation'
]

export default function App() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (fields: Partial<FormData>) => setForm(prev => ({ ...prev, ...fields }))
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const refId = generateReferenceId()
      const prefix = refId

      const [nominationUrl, academicRecordsUrl, pictureUrl] = await Promise.all([
        form.nominationLetterFile ? uploadFile(form.nominationLetterFile, `${prefix}/nomination-letter`) : Promise.resolve(null),
        form.academicRecordsFile ? uploadFile(form.academicRecordsFile, `${prefix}/academic-records`) : Promise.resolve(null),
        form.pictureFile ? uploadFile(form.pictureFile, `${prefix}/picture`) : Promise.resolve(null),
      ])

      const uploadClaims = async (claims: FormData['academicClaims'], type: string) =>
        Promise.all(claims.map(async (c, i) => ({
          ...c,
          proofFile: undefined,
          proofUrl: c.proofFile ? await uploadFile(c.proofFile, `${prefix}/${type}-claim-${i + 1}-proof`) : null,
        })))

      const [academicClaims, leadershipClaims, communityClaims] = await Promise.all([
        uploadClaims(form.academicClaims, 'academic'),
        uploadClaims(form.leadershipClaims, 'leadership'),
        uploadClaims(form.communityClaims, 'community'),
      ])

      const { error: dbError } = await supabase.from('ylea_applications').insert({
        reference_id: refId,
        full_name: form.fullName,
        complete_address: form.completeAddress,
        municipality: form.municipality,
        phone_number: form.phoneNumber,
        email: form.email,
        birthday: form.birthday,
        age: parseInt(form.age),
        sex: form.sex,
        school_level: form.schoolLevel,
        school_name: form.schoolName,
        school_address: form.schoolAddress,
        school_head_name: form.schoolHeadName,
        school_head_email: form.schoolHeadEmail,
        school_head_mobile: form.schoolHeadMobile,
        advisor_name: form.advisorName,
        advisor_email: form.advisorEmail,
        advisor_mobile: form.advisorMobile,
        nomination_letter_url: nominationUrl,
        academic_records_url: academicRecordsUrl,
        picture_url: pictureUrl,
        academic_claims: academicClaims,
        leadership_claims: leadershipClaims,
        community_claims: communityClaims,
        video_link: form.videoLink,
        confirmed: form.confirmed,
      })

      if (dbError) throw dbError

      setReferenceId(refId)
      setSubmitted(true)
    } catch (e: any) {
      setError(e.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!started) return <WelcomeScreen deadline={DEADLINE} onStart={() => setStarted(true)} />
  if (submitted) return <SuccessScreen referenceId={referenceId} />

  const stepProps = { form, update, onNext: next, onPrev: prev }

  return (
    <div className="app">
      <header className="app-header">
        <p className="label-top">40TH YLEA</p>
        <h1>40th Youth Leadership Excellence Awards (YLEA) 2026</h1>
        <p className="deadline">Deadline: <strong>{DEADLINE}</strong></p>
      </header>
      <ProgressBar steps={STEPS} current={step} />
      <main className="app-main">
        {step === 0 && <GeneralInfo {...stepProps} />}
        {step === 1 && <SchoolInfo {...stepProps} />}
        {step === 2 && <Requirements {...stepProps} />}
        {step === 3 && <AcademicProfile {...stepProps} />}
        {step === 4 && <LeadershipProfile {...stepProps} />}
        {step === 5 && <CommunityProfile {...stepProps} />}
        {step === 6 && <VideoLink {...stepProps} />}
        {step === 7 && (
          <Confirmation
            form={form}
            update={update}
            onPrev={prev}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />
        )}
      </main>
    </div>
  )
}
