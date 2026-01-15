import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { sanityClient } from '@/lib/sanity'

// Clerk webhook event types
type WebhookEvent = {
  type: 'user.created' | 'user.updated' | 'user.deleted'
  data: {
    id: string
    email_addresses?: Array<{ email_address: string }>
    first_name?: string
    last_name?: string
    image_url?: string
  }
}

/**
 * Webhook handler for Clerk user events.
 * 
 * This endpoint receives webhooks from Clerk when users are created, updated, or deleted.
 * It synchronizes user data to Sanity, using clerkId as the unique identifier.
 * 
 * Supported events:
 * - user.created: Creates a new user document in Sanity
 * - user.updated: Updates existing user document in Sanity
 * - user.deleted: Soft deletes user (marks as inactive) in Sanity
 */
export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET environment variable')
    return new Response('Webhook secret not configured', { status: 500 })
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  // Handle the webhook event
  const eventType = evt.type

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt)
        break
      
      case 'user.updated':
        await handleUserUpdated(evt)
        break
      
      case 'user.deleted':
        await handleUserDeleted(evt)
        break
      
      default:
        console.log(`Unhandled webhook event type: ${eventType}`)
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (error) {
    console.error(`Error processing webhook ${eventType}:`, error)
    return new Response('Error processing webhook', { status: 500 })
  }
}

/**
 * Handles user.created webhook event.
 * Creates a new user document in Sanity with data from Clerk.
 */
async function handleUserCreated(evt: WebhookEvent) {
  if (evt.type !== 'user.created') return

  const { id, email_addresses, first_name, last_name, image_url } = evt.data

  console.log('Creating user in Sanity:', id)

  // Validate required fields
  if (!email_addresses || email_addresses.length === 0) {
    throw new Error('User email is required')
  }

  // Create user document in Sanity
  const userDoc = {
    _type: 'user',
    clerkId: id,
    email: email_addresses[0].email_address,
    firstName: first_name || '',
    lastName: last_name || '',
    profileImage: image_url || '',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await sanityClient.create(userDoc)
  console.log('User created successfully in Sanity:', id)
}

/**
 * Handles user.updated webhook event.
 * Updates existing user document in Sanity with new data from Clerk.
 */
async function handleUserUpdated(evt: WebhookEvent) {
  if (evt.type !== 'user.updated') return

  const { id, email_addresses, first_name, last_name, image_url } = evt.data

  console.log('Updating user in Sanity:', id)

  // Find the user document by clerkId
  const query = `*[_type == "user" && clerkId == $clerkId][0]`
  const existingUser = await sanityClient.fetch(query, { clerkId: id })

  if (!existingUser) {
    console.error('User not found in Sanity:', id)
    throw new Error(`User with clerkId ${id} not found`)
  }

  // Update user document
  await sanityClient
    .patch(existingUser._id)
    .set({
      email: email_addresses?.[0]?.email_address || existingUser.email,
      firstName: first_name || existingUser.firstName,
      lastName: last_name || existingUser.lastName,
      profileImage: image_url || existingUser.profileImage,
      updatedAt: new Date().toISOString(),
    })
    .commit()

  console.log('User updated successfully in Sanity:', id)
}

/**
 * Handles user.deleted webhook event.
 * Soft deletes user by marking as inactive (preserves data integrity).
 */
async function handleUserDeleted(evt: WebhookEvent) {
  if (evt.type !== 'user.deleted') return

  const { id } = evt.data

  console.log('Soft deleting user in Sanity:', id)

  // Find the user document by clerkId
  const query = `*[_type == "user" && clerkId == $clerkId][0]`
  const existingUser = await sanityClient.fetch(query, { clerkId: id })

  if (!existingUser) {
    console.error('User not found in Sanity:', id)
    throw new Error(`User with clerkId ${id} not found`)
  }

  // Soft delete: mark as inactive
  await sanityClient
    .patch(existingUser._id)
    .set({
      isActive: false,
      updatedAt: new Date().toISOString(),
    })
    .commit()

  console.log('User soft deleted successfully in Sanity:', id)
}
