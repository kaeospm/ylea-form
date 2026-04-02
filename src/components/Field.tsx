type BaseProps = {
  label: string
  required?: boolean
  helper?: string
}

type InputProps = BaseProps & {
  type: 'text' | 'email' | 'tel' | 'number' | 'url'
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

type TextareaProps = BaseProps & {
  type: 'textarea'
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

type SelectProps = BaseProps & {
  type: 'select'
  value: string
  onChange: (v: string) => void
  options: string[]
}

type RadioProps = BaseProps & {
  type: 'radio'
  value: string
  onChange: (v: string) => void
  options: string[]
}

type FileProps = BaseProps & {
  type: 'file'
  onChange: (f: File | null) => void
  accept?: string
}

type FieldProps = InputProps | TextareaProps | SelectProps | RadioProps | FileProps

export default function Field(props: FieldProps) {
  return (
    <div className="field">
      <label className="field-label">
        {props.label}{props.required && <span className="required">*</span>}
      </label>
      {props.helper && <p className="field-helper">{props.helper}</p>}

      {(props.type === 'text' || props.type === 'email' || props.type === 'tel' || props.type === 'number' || props.type === 'url') && (
        <input
          className="field-input"
          type={props.type}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          placeholder={(props as InputProps).placeholder}
          required={props.required}
        />
      )}

      {props.type === 'textarea' && (
        <textarea
          className="field-input field-textarea"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          placeholder={(props as TextareaProps).placeholder}
          required={props.required}
        />
      )}

      {props.type === 'select' && (
        <select className="field-input" value={props.value} onChange={e => props.onChange(e.target.value)} required={props.required}>
          <option value="">Select...</option>
          {(props as SelectProps).options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )}

      {props.type === 'radio' && (
        <div className="radio-group">
          {(props as RadioProps).options.map(o => (
            <label key={o} className="radio-option">
              <input
                type="radio"
                name={props.label}
                value={o}
                checked={props.value === o}
                onChange={() => props.onChange(o)}
              />
              {o}
            </label>
          ))}
        </div>
      )}

      {props.type === 'file' && (
        <input
          className="field-file"
          type="file"
          accept={(props as FileProps).accept || '.pdf,.jpg,.jpeg,.png'}
          onChange={e => props.onChange(e.target.files?.[0] ?? null)}
          required={props.required}
        />
      )}
    </div>
  )
}
