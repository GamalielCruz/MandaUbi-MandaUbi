'use client'

import { useEffect, useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'

interface Event {
  _id: string
  title: string
  slug: { current: string }
  eventType: string
  eventDate: string
  location: {
    venueName: string
    address: string
    city: string
    state: string
  }
}

export default function AdminEventos() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Event>>({})

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (event: Event) => {
    setEditing(event._id)
    setEditData(event)
  }

  const cancelEdit = () => {
    setEditing(null)
    setEditData({})
  }

  const saveEdit = async () => {
    if (!editing) return
    
    try {
      // Add admin token to request
      const response = await fetch(`/api/events/${editing}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editData,
          adminToken: process.env.NEXT_PUBLIC_ADMIN_TOKEN
        })
      })
      
      if (response.ok) {
        await fetchEvents()
        setEditing(null)
        setEditData({})
        alert('✅ Evento actualizado correctamente')
      } else {
        const error = await response.json()
        alert(`❌ Error: ${error.error || 'Error al actualizar'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error al actualizar')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando eventos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          📝 Administrar Eventos
        </h1>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              {editing === event._id ? (
                // Modo Edición
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug (URL Corta)
                    </label>
                    <input
                      type="text"
                      value={editData.slug?.current || ''}
                      onChange={(e) => setEditData({ 
                        ...editData, 
                        slug: { current: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      URL: https://enviaubi.com/{editData.slug?.current}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha del Evento
                    </label>
                    <input
                      type="datetime-local"
                      value={editData.eventDate?.slice(0, 16) || ''}
                      onChange={(e) => setEditData({ 
                        ...editData, 
                        eventDate: new Date(e.target.value).toISOString()
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lugar
                      </label>
                      <input
                        type="text"
                        value={editData.location?.venueName || ''}
                        onChange={(e) => setEditData({ 
                          ...editData, 
                          location: { ...editData.location!, venueName: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={editData.location?.address || ''}
                        onChange={(e) => setEditData({ 
                          ...editData, 
                          location: { ...editData.location!, address: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Modo Vista
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        🔗 https://enviaubi.com/{event.slug.current}
                      </p>
                    </div>
                    <button
                      onClick={() => startEdit(event)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                      Editar
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Tipo:</span>
                      <span className="ml-2 text-gray-600">{event.eventType}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fecha:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(event.eventDate).toLocaleString('es-ES')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Lugar:</span>
                      <span className="ml-2 text-gray-600">{event.location.venueName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Dirección:</span>
                      <span className="ml-2 text-gray-600">{event.location.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
