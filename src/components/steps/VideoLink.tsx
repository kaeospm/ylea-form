import type { FormData } from '../../types'
import Field from '../Field'
import FormSection from '../FormSection'

type Props = { form: FormData; update: (f: Partial<FormData>) => void; onNext: () => void; onPrev: () => void }

export default function VideoLink({ form, update, onNext, onPrev }: Props) {
  const valid = form.videoLink.trim().length > 0

  return (
    <FormSection title="VII. Video Link" onNext={valid ? onNext : undefined} onPrev={onPrev}>
      <Field
        type="url"
        label="Video Presentation Link"
        required
        helper="Share your video via YouTube, Facebook, Vimeo, or any platform. Paste the shareable link here."
        value={form.videoLink}
        onChange={v => update({ videoLink: v })}
        placeholder="https://youtube.com/watch?v=..."
      />
      {!valid && <p className="validation-note">A video link is required to continue.</p>}
    </FormSection>
  )
}
