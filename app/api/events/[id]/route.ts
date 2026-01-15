import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/**
 * GET /api/events/[id]
 * 
 * Retrieves an event by its ID (public endpoint).
 * 
 * Path Parameters:
 * - id: string (required) - Sanity document ID
 * 
 * Returns:
 * - 200: Event object
 * - 404: Event not found
 * - 500: Internal server error
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    // Query event with all fields including images
    const query = `*[_type == "event" && _id == $id][0]{
      _id,
      title,
      slug,
      description,
      eventType,
      eventDate,
      template,
      theme,
      heroImage{
        asset->{
          _id,
          url
        },
        alt
      },
      gallery[]{
        asset->{
          _id,
          url
        },
        caption
      },
      backgroundMusic{
        asset->{
          _id,
          url
        }
      },
      showCountdown,
      itinerary,
      parents,
      godparents,
      location,
      ceremonyLocation,
      receptionLocation,
      giftRegistry,
      customImages,
      contactInfo,
      rsvpEnabled,
      rsvpDeadline
    }`

    const event = await sanityClient.fetch(query, { id })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/events/[id]
 * 
 * Updates an existing event.
 * Only the event owner can update their events.
 * 
 * Path Parameters:
 * - id: string (required) - Sanity document ID
 * 
 * Request Body (all fields optional):
 * - title: string
 * - eventType: string - 'wedding' | 'birthday' | 'quinceañera' | 'other'
 * - eventDate: string - ISO date string
 * - template: string - 'isla/0' | 'isla/1' | 'isla/2' | 'isla/4'
 * - location: object
 * - ceremonyLocation: object
 * - receptionLocation: object
 * - giftRegistry: object
 * - customImages: object
 * - contactInfo: object
 * 
 * Returns:
 * - 200: Updated event object
 * - 400: Bad request (validation error)
 * - 401: Unauthorized (user not authenticated)
 * - 403: Forbidden (user is not the owner)
 * - 404: Event not found
 * - 500: Internal server error
 */
export async function PATCH(
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
    const { id } = await params

    // Check if event exists and user is the owner
    const existingEvent = await sanityClient.fetch(
      `*[_type == "event" && _id == $id][0]`,
      { id }
    )

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Verify ownership
    if (existingEvent.ownerClerkId !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: You do not own this event' },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await req.json()
    const {
      title,
      eventType,
      eventDate,
      template,
      location,
      ceremonyLocation,
      receptionLocation,
      giftRegistry,
      customImages,
      contactInfo,
    } = body

    // Validate eventType if provided
    if (eventType) {
      const validEventTypes = ['wedding', 'birthday', 'quinceañera', 'other']
      if (!validEventTypes.includes(eventType)) {
        return NextResponse.json(
          { error: `Invalid eventType. Must be one of: ${validEventTypes.join(', ')}` },
          { status: 400 }
        )
      }
    }

    // Validate template if provided
    if (template) {
      const validTemplates = ['isla/0', 'isla/1', 'isla/2', 'isla/4']
      if (!validTemplates.includes(template)) {
        return NextResponse.json(
          { error: `Invalid template. Must be one of: ${validTemplates.join(', ')}` },
          { status: 400 }
        )
      }
    }

    // Build update object (only include provided fields)
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    }

    if (title !== undefined) updateData.title = title
    if (eventType !== undefined) updateData.eventType = eventType
    if (eventDate !== undefined) updateData.eventDate = eventDate
    if (template !== undefined) updateData.template = template
    if (location !== undefined) updateData.location = location
    if (ceremonyLocation !== undefined) updateData.ceremonyLocation = ceremonyLocation
    if (receptionLocation !== undefined) updateData.receptionLocation = receptionLocation
    if (giftRegistry !== undefined) updateData.giftRegistry = giftRegistry
    if (customImages !== undefined) updateData.customImages = customImages
    if (contactInfo !== undefined) updateData.contactInfo = contactInfo

    // Update event in Sanity
    const updatedEvent = await sanityClient
      .patch(id)
      .set(updateData)
      .commit()

    console.log('Event updated successfully:', id)

    return NextResponse.json(updatedEvent, { status: 200 })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/events/[id]
 * 
 * Soft deletes an event by marking it as archived.
 * Only the event owner can delete their events.
 * 
 * Path Parameters:
 * - id: string (required) - Sanity document ID
 * 
 * Returns:
 * - 200: Success message
 * - 401: Unauthorized (user not authenticated)
 * - 403: Forbidden (user is not the owner)
 * - 404: Event not found
 * - 500: Internal server error
 */
export async function DELETE(
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
    const { id } = await params

    // Check if event exists and user is the owner
    const existingEvent = await sanityClient.fetch(
      `*[_type == "event" && _id == $id][0]`,
      { id }
    )

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Verify ownership
    if (existingEvent.ownerClerkId !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: You do not own this event' },
        { status: 403 }
      )
    }

    // Soft delete: mark as archived
    await sanityClient
      .patch(id)
      .set({
        isArchived: true,
        updatedAt: new Date().toISOString(),
      })
      .commit()

    console.log('Event archived successfully:', id)

    return NextResponse.json(
      { message: 'Event archived successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error archiving event:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
