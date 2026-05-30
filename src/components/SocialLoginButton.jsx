import React from 'react'

function SocialLoginButton({ provider, children }) {
  return (
    <button style={{
      width: '100%',
      borderRadius: 8,
      padding: '12px 16px',
      border: '1px solid #E0E0E0',
      background: '#FFFFFF',
      color: '#212121',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10
    }}>
      {provider}
      {children}
    </button>
  )
}

export default SocialLoginButton
