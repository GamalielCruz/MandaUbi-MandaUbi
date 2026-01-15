'use client'

import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    // Redirigir al servidor de Sanity
    window.location.href = 'http://localhost:3333'
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>Redirigiendo a Sanity Studio...</h1>
      <p>Si no te redirige automáticamente, haz clic aquí:</p>
      <a 
        href="http://localhost:3333" 
        style={{ 
          color: '#2276fc', 
          textDecoration: 'underline',
          fontSize: '18px'
        }}
      >
        Abrir Sanity Studio
      </a>
      <p style={{ fontSize: '14px', color: '#666', marginTop: '40px' }}>
        Asegúrate de ejecutar: <code style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}>npm run sanity</code>
      </p>
    </div>
  )
}
