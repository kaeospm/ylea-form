import type { FormData } from '../../types'
import Field from '../Field'
import FormSection from '../FormSection'

type Props = { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; onPrev: () => void }

export default function SchoolInfo({ form, update, onNext, onPrev }: Props) {
  const valid = form.schoolLevel && form.schoolName && form.schoolAddress &&
    form.schoolHeadName && form.schoolHeadEmail && form.schoolHeadMobile &&
    form.advisorName && form.advisorEmail && form.advisorMobile

  return (
    <FormSection title="II. School Information" subtitle="School and contact details." onNext={valid ? onNext : undefined} onPrev={onPrev}>
      <Field type="select" label="School Level" required value={form.schoolLevel} onChange={v => update({ schoolLevel: v })} options={['Elementary', 'Junior High School', 'Senior High School']} />
      <Field type="text" label="Name of School" required value={form.schoolName} onChange={v => update({ schoolName: v })} placeholder="Antique National High School" />
      <Field type="text" label="Address of School" required value={form.schoolAddress} onChange={v => update({ schoolAddress: v })} />
      <Field type="text" label="Full Name of School Head" required value={form.schoolHeadName} onChange={v => update({ schoolHeadName: v })} placeholder="Dr. Maria Santos" />
      <Field type="email" label="School Head Email" required value={form.schoolHeadEmail} onChange={v => update({ schoolHeadEmail: v })} />
      <Field type="tel" label="School Head Mobile Number" required value={form.schoolHeadMobile} onChange={v => update({ schoolHeadMobile: v })} placeholder="09181234567" />
      <Field type="text" label="Full Name of Class Advisor" required value={form.advisorName} onChange={v => update({ advisorName: v })} placeholder="Sir Roberto Villanueva" />
      <Field type="email" label="Class Advisor Email" required value={form.advisorEmail} onChange={v => update({ advisorEmail: v })} />
      <Field type="tel" label="Class Advisor Mobile Number" required value={form.advisorMobile} onChange={v => update({ advisorMobile: v })} placeholder="09081234567" />
      {!valid && <p className="validation-note">Please fill in all required fields to continue.</p>}
    </FormSection>
  )
}
