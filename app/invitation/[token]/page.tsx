'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface InvitationData {
  _id: string
  guestName: string
  numberOfGuests: number
  rsvpStatus: string
  event: {
    _id: string
    title: string
    slug: { current: string }
    description: string
    eventType: string
    eventDate: string
    template: string
    location: any
    ceremonyLocation: any
    receptionLocation: any
    customImages: any
    contactInfo: any
  }
}

export default function InvitationPage() {
  const params = useParams()
  const router = useRouter()
  const token = params.token as string
  
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInvitation() {
      try {
        console.log('Fetching invitation with token:', token);
        
        const response = await fetch(`/api/invitations/${token}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          console.error('API error:', errorData);
          setError(errorData.error || 'Error al cargar la invitación')
          setLoading(false)
          return
        }
        
        const data = await response.json()
        
        console.log('Fetched data:', data);
        
        if (!data) {
          console.error('No invitation found');
          setError('Invitación no encontrada')
          setLoading(false)
          return
        }

        if (!data.event) {
          console.error('No event found for invitation');
          setError('El evento asociado no existe')
          setLoading(false)
          return
        }
        
        console.log('Invitation loaded successfully:', data);
        setInvitation(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching invitation:', err)
        setError('Error al cargar la invitación: ' + (err as Error).message)
        setLoading(false)
      }
    }

    if (token) {
      fetchInvitation()
    }
  }, [token])

  useEffect(() => {
    // Redirigir al template correspondiente cuando tengamos los datos
    if (invitation?.event?.template) {
      const templatePath = `/${invitation.event.template}`
      // Pasar los datos del evento como query params o state
      router.push(`${templatePath}?eventId=${invitation.event._id}&token=${token}`)
    }
  }, [invitation, router, token])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tu invitación...</p>
        </div>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Invitación no encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'No pudimos encontrar esta invitación. Verifica que el enlace sea correcto.'}
          </p>
          <a 
            href="/" 
            className="inline-block bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  // Mientras redirige
  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Preparando tu invitación...</p>
      </div>
    </div>
  )
}
