import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { generateToken } from '@/lib/utils/token'

/**
 * POST /api/invitations
 * 
 * Creates a new invitation for an event.
 * Generates a unique token for guest access.
 * Only the event owner can create invitations.
 * 
 * Request Body:
 * - eventId: string (required) - Sanity event document ID
 * - guestName: string (required) - Name of the guest
 * - guestEmail: string (optional) - Guest email
 * - guestPhone: string (optional) - Guest phone
 * - numberOfGuests: number (optional, default: 1) - Number of guests allowed
 * - notes: string (optional) - Additional notes
 * 
 * Returns:
 * - 201: Created invitation object with token
 * - 400: Bad request (validation error)
 * - 401: Unauthorized (user not authenticated)
 * - 403: Forbidden (user is not the event owner)
 * - 404: Event not found
 * - 500: Internal server error
 */
export async function POST(req: Request) {
  try {
    // Authenticate user with Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await req.json()
    const {
      eventId,
      guestName,
      guestEmail,
      guestPhone,
      numberOfGuests = 1,
      notes,
    } = body

    // Validate required fields
    if (!eventId || !guestName) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, guestName' },
        { status: 400 }
      )
    }

    // Validate guestName length
    if (guestName.length < 2 || guestName.length > 100) {
      return NextResponse.json(
        { error: 'Guest name must be between 2 and 100 characters' },
        { status: 400 }
      )
    }

    // Validate numberOfGuests
    if (numberOfGuests < 1 || numberOfGuests > 20) {
      return NextResponse.json(
        { error: 'Number of guests must be between 1 and 20' },
        { status: 400 }
      )
    }

    // Check if event exists and user is the owner
    const event = await sanityClient.fetch(
      `*[_type == "event" && _id == $eventId][0]`,
      { eventId }
    )

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Verify ownership
    if (event.ownerClerkId !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: You do not own this event' },
        { status: 403 }
      )
    }

    // Generate unique token
    let token = generateToken()
    let tokenExists = true
    let attempts = 0
    const maxAttempts = 5

    // Ensure token is unique (very unlikely to collide, but we check anyway)
    while (tokenExists && attempts < maxAttempts) {
      const existingInvitation = await sanityClient.fetch<any>(
        `*[_type == "invitation" && token == $token][0]`,
        { token } as any
      )
      
      if (!existingInvitation) {
        tokenExists = false
      } else {
        token = generateToken()
        attempts++
      }
    }

    if (tokenExists) {
      return NextResponse.json(
        { error: 'Failed to generate unique token. Please try again.' },
        { status: 500 }
      )
    }

    // Create invitation document
    const invitationDoc = {
      _type: 'invitation',
      event: {
        _type: 'reference',
        _ref: eventId,
      },
      guestName,
      guestEmail: guestEmail || null,
      guestPhone: guestPhone || null,
      token: token,
      numberOfGuests,
      rsvpStatus: 'pending',
      rsvpDate: null,
      notes: notes || null,
      lastAccessedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Create invitation in Sanity
    const createdInvitation = await sanityClient.create(invitationDoc)

    console.log('Invitation created successfully:', createdInvitation._id)

    // Return invitation with token (token should be sent to guest)
    return NextResponse.json(
      {
        ...createdInvitation,
        invitationUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/invitation/${token}`,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating invitation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
