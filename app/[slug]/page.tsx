'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface EventData {
  _id: string
  title: string
  slug: { current: string }
  template: string
  invitations: Array<{
    _id: string
    token: string
    guestName: string
  }>
}

export default function ShortUrlPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEventAndRedirect = async () => {
      try {
        const slug = params.slug as string
        
        // Buscar evento por slug
        const response = await fetch(`/api/events/slug/${slug}`)
        
        if (!response.ok) {
          throw new Error('Evento no encontrado')
        }
        
        const event: EventData = await response.json()
        
        // Si el evento tiene invitaciones, usar la primera
        if (event.invitations && event.invitations.length > 0) {
          const firstInvitation = event.invitations[0]
          const redirectUrl = `/invitation/${firstInvitation.token}`
          router.replace(redirectUrl)
        } else {
          // Si no hay invitaciones, redirigir a la plantilla con eventId
          const template = event.template || 'isla/5'
          const redirectUrl = `/${template}?eventId=${event._id}`
          router.replace(redirectUrl)
        }
      } catch (err) {
        console.error('Error fetching event:', err)
        setError('Evento no encontrado')
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchEventAndRedirect()
    }
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando invitación...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a 
            href="/" 
            className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    )
  }

  return null
}