import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * GET /api/events/[id]/invitations
 * 
 * Retrieves all invitations for a specific event.
 * Includes RSVP statistics and aggregated counts.
 * Only the event owner can view invitations.
 * 
 * Path Parameters:
 * - id: string (required) - Sanity event document ID
 * 
 * Returns:
 * - 200: Object with invitations array and statistics
 * - 401: Unauthorized (user not authenticated)
 * - 403: Forbidden (user is not the event owner)
 * - 404: Event not found
 * - 500: Internal server error
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user with Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get event ID from params
    const { id: eventId } = await params

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

    // Fetch all invitations for the event
    const query = `
      *[_type == "invitation" && event._ref == $eventId] | order(createdAt desc) {
        _id,
        _createdAt,
        guestName,
        guestEmail,
        guestPhone,
        token,
        numberOfGuests,
        rsvpStatus,
        rsvpDate,
        notes,
        lastAccessedAt,
        createdAt,
        updatedAt
      }
    `

    const invitations = await sanityClient.fetch(query, { eventId })

    // Calculate RSVP statistics
    const stats = {
      total: invitations.length,
      confirmed: invitations.filter((inv: any) => inv.rsvpStatus === 'confirmed').length,
      declined: invitations.filter((inv: any) => inv.rsvpStatus === 'declined').length,
      pending: invitations.filter((inv: any) => inv.rsvpStatus === 'pending').length,
      totalGuests: invitations.reduce((sum: number, inv: any) => {
        return inv.rsvpStatus === 'confirmed' ? sum + inv.numberOfGuests : sum
      }, 0),
      accessed: invitations.filter((inv: any) => inv.lastAccessedAt !== null).length,
    }

    return NextResponse.json(
      {
        invitations,
        stats,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching invitations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
