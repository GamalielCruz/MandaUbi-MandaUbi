import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * POST /api/guest/rsvp
 * 
 * Updates RSVP status for an invitation.
 * This is a public endpoint - no authentication required.
 * Validates token and updates rsvpStatus and rsvpDate.
 * 
 * Request Body:
 * - token: string (required) - Unique invitation token
 * - rsvpStatus: string (required) - 'confirmed' | 'declined'
 * - notes: string (optional) - Additional notes from guest
 * 
 * Returns:
 * - 200: Updated invitation object
 * - 400: Bad request (validation error)
 * - 404: Invitation not found or invalid token
 * - 500: Internal server error
 */
export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { token, rsvpStatus, notes } = body

    // Validate required fields
    if (!token || !rsvpStatus) {
      return NextResponse.json(
        { error: 'Missing required fields: token, rsvpStatus' },
        { status: 400 }
      )
    }

    // Validate token format
    if (token.length < 32) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      )
    }

    // Validate rsvpStatus
    const validStatuses = ['confirmed', 'declined']
    if (!validStatuses.includes(rsvpStatus)) {
      return NextResponse.json(
        { error: `Invalid rsvpStatus. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    // Find invitation by token
    const invitation = await sanityClient.fetch(
      `*[_type == "invitation" && token == $token][0]`,
      { token } as any
    )

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      )
    }

    // Check if event is archived
    const event = await sanityClient.fetch(
      `*[_type == "event" && _id == $eventId][0]`,
      { eventId: invitation.event._ref }
    )

    if (event?.isArchived) {
      return NextResponse.json(
        { error: 'This event is no longer available' },
        { status: 404 }
      )
    }

    // Update RSVP status
    const updateData: any = {
      rsvpStatus,
      rsvpDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Update notes if provided
    if (notes !== undefined) {
      updateData.notes = notes
    }

    const updatedInvitation = await sanityClient
      .patch(invitation._id)
      .set(updateData)
      .commit()

    console.log('RSVP updated:', invitation._id, 'Status:', rsvpStatus)

    // Return updated invitation (exclude token for security)
    const { token: _, ...invitationWithoutToken } = updatedInvitation

    return NextResponse.json(
      {
        ...invitationWithoutToken,
        message: `RSVP ${rsvpStatus} successfully`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating RSVP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
