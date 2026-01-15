import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * GET /api/invitations/[token]
 * 
 * Retrieves an invitation by its unique token.
 * This is a public endpoint that doesn't require authentication.
 * 
 * Returns:
 * - 200: Invitation object with event details
 * - 404: Invitation not found
 * - 500: Internal server error
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Query invitation with event details
    const query = `*[_type == "invitation" && token == $token][0]{
      _id,
      guestName,
      numberOfGuests,
      rsvpStatus,
      event->{
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
      }
    }`

    const params = { token } as Record<string, any>
    const invitation = await sanityClient.fetch<any>(query, params)

    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      )
    }

    if (!invitation.event) {
      return NextResponse.json(
        { error: 'Event not found for this invitation' },
        { status: 404 }
      )
    }

    // Update lastAccessedAt
    try {
      await sanityClient
        .patch(invitation._id)
        .set({ lastAccessedAt: new Date().toISOString() })
        .commit()
    } catch (updateError) {
      console.error('Error updating lastAccessedAt:', updateError)
      // Don't fail the request if update fails
    }

    return NextResponse.json(invitation, { status: 200 })
  } catch (error) {
    console.error('Error fetching invitation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
