import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * GET /api/admin/short-urls
 * 
 * Retrieves all events with their short URLs for admin management.
 * 
 * Returns:
 * - 200: Array of events with short URL information
 * - 500: Internal server error
 */
export async function GET() {
  try {
    // Query all events with their short URL information
    const query = `
      *[_type == "event" && !isArchived] {
        _id,
        title,
        slug,
        eventType,
        eventDate,
        "invitationCount": count(*[_type == "invitation" && references(^._id)])
      } | order(eventDate desc)
    `

    const events = await sanityClient.fetch(query)

    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    console.error('Error fetching events for short URLs admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}