import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * GET /api/guest/invitation/[token]
 * 
 * Retrieves invitation details by token.
 * This is a public endpoint - no authentication required.
 * Updates lastAccessedAt timestamp when accessed.
 * Includes full event details for displaying to guest.
 * 
 * Path Parameters:
 * - token: string (required) - Unique invitation token
 * 
 * Returns:
 * - 200: Invitation object with populated event details
 * - 404: Invitation not found or invalid token
 * - 500: Internal server error
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    // Get token from params
    const { token } = await params

    // Validate token format
    if (!token || token.length < 32) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      )
    }

    // Query invitation by token with event details
    const query = `
      *[_type == "invitation" && token == $token][0] {
        _id,
        _createdAt,
        guestName,
        guestEmail,
        guestPhone,
        numberOfGuests,
        rsvpStatus,
        rsvpDate,
        notes,
        lastAccessedAt,
        createdAt,
        updatedAt,
        "event": event-> {
          _id,
          title,
          slug,
          eventType,
          eventDate,
          template,
          location,
          ceremonyLocation,
          receptionLocation,
          giftRegistry,
          customImages,
          contactInfo,
          isArchived
        }
      }
    `

    const invitation = await sanityClient.fetch(query, { token } as any)

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      )
    }

    // Check if event is archived
    if (invitation.event?.isArchived) {
      return NextResponse.json(
        { error: 'This event is no longer available' },
        { status: 404 }
      )
    }

    // Update lastAccessedAt timestamp
    await sanityClient
      .patch(invitation._id)
      .set({
        lastAccessedAt: new Date().toISOString(),
      })
      .commit()

    console.log('Invitation accessed:', invitation._id)

    // Return invitation with event details (exclude token for security)
    const { token: _, ...invitationWithoutToken } = invitation

    return NextResponse.json(invitationWithoutToken, { status: 200 })
  } catch (error) {
    console.error('Error fetching invitation by token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
