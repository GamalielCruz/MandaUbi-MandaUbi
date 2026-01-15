import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * POST /api/rsvp
 * 
 * Registra la confirmación de asistencia de un invitado
 * 
 * Request Body:
 * - eventId: string (required)
 * - guestName: string (required)
 * - attending: boolean (required)
 * - numberOfGuests: number (optional)
 * - message: string (optional)
 * 
 * Returns:
 * - 201: RSVP registrado exitosamente
 * - 400: Bad request
 * - 500: Internal server error
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { eventId, guestName, attending, numberOfGuests = 1, message } = body

    // Validar campos requeridos
    if (!eventId || !guestName || attending === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, guestName, attending' },
        { status: 400 }
      )
    }

    // Crear documento de RSVP
    const rsvpDoc = {
      _type: 'rsvp',
      event: {
        _type: 'reference',
        _ref: eventId,
      },
      guestName,
      attending,
      numberOfGuests: attending ? numberOfGuests : 0,
      message: message || null,
      createdAt: new Date().toISOString(),
    }

    // Guardar en Sanity
    const createdRsvp = await sanityClient.create(rsvpDoc)

    console.log('RSVP created successfully:', createdRsvp._id)

    return NextResponse.json(
      {
        success: true,
        message: attending 
          ? '¡Gracias por confirmar tu asistencia!' 
          : 'Gracias por tu respuesta',
        rsvp: createdRsvp,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating RSVP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
