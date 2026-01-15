import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * GET /api/events/slug/[slug]
 * 
 * Retrieves an event by its slug.
 * This is a public endpoint - no authentication required.
 * Used for displaying event details to guests via shareable URLs.
 * 
 * Path Parameters:
 * - slug: string (required) - Event slug
 * 
 * Returns:
 * - 200: Event object
 * - 404: Event not found
 * - 500: Internal server error
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Get slug from params
    const { slug } = await params

    // Query event by slug
    const query = `
      *[_type == "event" && slug.current == $slug && !isArchived][0] {
        _id,
        _createdAt,
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
        createdAt,
        updatedAt
      }
    `

    const event = await sanityClient.fetch(query, { slug })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error('Error fetching event by slug:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
