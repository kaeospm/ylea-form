import type { FormData } from '../../types'
import Field from '../Field'
import FormSection from '../FormSection'

type Props = { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; onPrev: () => void }

export default function Requirements({ form, update, onNext, onPrev }: Props) {
  const valid = form.nominationLetterFile && form.academicRecordsFile && form.pictureFile

  return (
    <FormSection title="III. Requirements" subtitle="Upload the following required documents." onNext={valid ? onNext : undefined} onPrev={onPrev}>
      <Field
        type="file"
        label="Nomination Letter"
        required
        helper="Signed by the school head or principal and addressed to JCI Antique Kruhay President Lord Leomer Pomperada."
        onChange={f => update({ nominationLetterFile: f })}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <Field
        type="file"
        label="Academic Records"
        required
        helper="Form 137 for Elementary / SF 10 for Senior HS. Academic records and class standing during the preceding school year."
        onChange={f => update({ academicRecordsFile: f })}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <Field
        type="file"
        label="2x2 Picture"
        required
        helper="A clear 2x2 picture taken within the last twelve (12) months."
        onChange={f => update({ pictureFile: f })}
        accept=".jpg,.jpeg,.png"
      />
      {!valid && <p className="validation-note">Please upload all required documents to continue.</p>}
    </FormSection>
  )
}
