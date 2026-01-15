'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { publicSanityClient } from '@/lib/sanity'

export default function DynamicEventPage() {
  const params = useParams()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const query = `*[_type == "event" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          eventType,
          eventDate,
          template,
          location,
          ceremonyLocation,
          receptionLocation,
          customImages,
          contactInfo
        }`
        
        const data = await publicSanityClient.fetch(query, { slug })
        
        if (!data) {
          setError('Evento no encontrado')
          setLoading(false)
          return
        }
        
        setEvent(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching event:', err)
        setError('Error al cargar el evento')
        setLoading(false)
      }
    }

    if (slug) {
      fetchEvent()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando invitación...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">😕</h1>
          <p className="text-xl text-gray-600">{error || 'Evento no encontrado'}</p>
          <a href="/" className="mt-4 inline-block text-sky-600 hover:underline">
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  // Aquí renderizamos el template correspondiente
  // Por ahora mostramos la información básica del evento
  return (
    <div className="min-h-screen bg-sky-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-sky-900 mb-4">
          {event.title}
        </h1>
        <p className="text-center text-gray-600 mb-6">{event.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-sky-50 p-4 rounded-lg">
            <h3 className="font-bold text-sky-900 mb-2">Tipo de Evento</h3>
            <p className="text-gray-700">{event.eventType}</p>
          </div>
          
          <div className="bg-sky-50 p-4 rounded-lg">
            <h3 className="font-bold text-sky-900 mb-2">Fecha</h3>
            <p className="text-gray-700">
              {new Date(event.eventDate).toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          {event.location && (
            <div className="bg-sky-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-bold text-sky-900 mb-2">Ubicación</h3>
              <p className="text-gray-700">{event.location.venueName}</p>
              <p className="text-gray-600 text-sm">{event.location.address}</p>
              <p className="text-gray-600 text-sm">
                {event.location.city}, {event.location.state}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Template asignado: <span className="font-mono">{event.template}</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            URL: /isla/{slug}
          </p>
        </div>
      </div>
    </div>
  )
}
