import React from 'react'

export function Field({ label, value, onChange, type='text', placeholder='', className='' }) {
  return (
    <label className={`field ${className}`}>
      <div className="field__label">{label}</div>
      <input
        className="input"
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
      />
    </label>
  )
}

export function TextArea({ label, value, onChange, rows=4, placeholder='', className='' }) {
  return (
    <label className={`field ${className}`}>
      <div className="field__label">{label}</div>
      <textarea
        className="textarea"
        rows={rows}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
