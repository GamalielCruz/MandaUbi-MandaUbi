'use client'

import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Redirigir al Studio hospedado por Sanity
    const studioUrl = 'https://mandaubi.sanity.studio'
    
    // Intentar redirección
    setTimeout(() => {
      window.location.href = studioUrl
    }, 1000)
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h1 style={{ marginBottom: '20px' }}>🎨 Sanity Studio</h1>
        <p style={{ marginBottom: '30px', opacity: 0.9 }}>
          Redirigiendo al panel de administración...
        </p>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>

        <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '20px' }}>
          Si no te redirige automáticamente:
        </p>
        
        <a 
          href="https://mandaubi.sanity.studio" 
          style={{ 
            display: 'inline-block',
            background: 'white',
            color: '#667eea',
            padding: '12px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Abrir Sanity Studio
        </a>

        <div style={{ 
          marginTop: '40px', 
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          fontSize: '13px'
        }}>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            📝 Para desplegar tu Studio:
          </p>
          <code style={{ 
            background: 'rgba(0, 0, 0, 0.3)', 
            padding: '8px 12px', 
            borderRadius: '6px',
            display: 'block',
            fontFamily: 'monospace'
          }}>
            npm run sanity:deploy
          </code>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
