import React from 'react'

function InputField({ label, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'grid', gap: 8, fontSize: 14, fontWeight: 600 }}>
      {label}
      <input type={type} placeholder={placeholder} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #CCC' }} />
    </label>
  )
}

export default InputField
