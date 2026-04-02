import type { FormData } from '../../types'
import Field from '../Field'
import FormSection from '../FormSection'

type Props = { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; onPrev: () => void }

export default function GeneralInfo({ form, update, onNext }: Props) {
  const valid = form.fullName && form.completeAddress && form.municipality &&
    form.phoneNumber && form.email && form.birthday && form.age && form.sex

  return (
    <FormSection title="I. General Information" subtitle="Personal details of the nominee." onNext={valid ? onNext : undefined}>
      <Field type="text" label="Full Name (Last, First, MI)" required value={form.fullName} onChange={v => update({ fullName: v })} placeholder="Dela Cruz, Juan M." />
      <Field type="text" label="Complete Address" required value={form.completeAddress} onChange={v => update({ completeAddress: v })} placeholder="123 Rizal St., San Jose" />
      <Field type="text" label="Municipality" required value={form.municipality} onChange={v => update({ municipality: v })} />
      <Field type="tel" label="Phone Number" required value={form.phoneNumber} onChange={v => update({ phoneNumber: v })} placeholder="09171234567" />
      <Field type="email" label="Email Address" required value={form.email} onChange={v => update({ email: v })} placeholder="juan.delacruz@example.com" />
      <Field type="text" label="Birthday (DD/MM/YYYY)" required value={form.birthday} onChange={v => update({ birthday: v })} placeholder="05/18/2008" />
      <Field type="number" label="Age" required value={form.age} onChange={v => update({ age: v })} />
      <Field type="radio" label="Sex" required value={form.sex} onChange={v => update({ sex: v })} options={['Male', 'Female']} />
      {!valid && <p className="validation-note">Please fill in all required fields to continue.</p>}
    </FormSection>
  )
}
