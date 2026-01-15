import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const EVENT_ID = 'cfb21306-411b-4a4f-afe4-c2d359e0abb2'

async function getInvitations() {
  // Create Sanity client
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  console.log('=== Fetching Invitations ===\n')
  console.log('Event ID:', EVENT_ID)
  console.log()

  try {
    // Query invitations for this event
    const query = `
      *[_type == "invitation" && event._ref == $eventId] {
        _id,
        guestName,
        guestEmail,
        token,
        numberOfGuests,
        rsvpStatus,
        createdAt
      }
    `

    const invitations = await client.fetch(query, { eventId: EVENT_ID })

    if (invitations.length === 0) {
      console.log('❌ No invitations found for this event')
      console.log('\nTo create an invitation, use the API:')
      console.log('POST http://localhost:3000/api/invitations')
      console.log('Body: { "eventId": "' + EVENT_ID + '", "guestName": "Guest Name" }')
      return
    }

    console.log(`✓ Found ${invitations.length} invitation(s):\n`)

    invitations.forEach((inv: any, index: number) => {
      console.log(`${index + 1}. ${inv.guestName}`)
      console.log(`   Email: ${inv.guestEmail || 'N/A'}`)
      console.log(`   Guests: ${inv.numberOfGuests}`)
      console.log(`   RSVP Status: ${inv.rsvpStatus}`)
      console.log(`   Token: ${inv.token}`)
      console.log(`   📧 Invitation URL: http://localhost:3000/invitation/${inv.token}`)
      console.log()
    })

    console.log('=== Summary ===')
    console.log(`Total invitations: ${invitations.length}`)
    console.log(`Confirmed: ${invitations.filter((i: any) => i.rsvpStatus === 'confirmed').length}`)
    console.log(`Declined: ${invitations.filter((i: any) => i.rsvpStatus === 'declined').length}`)
    console.log(`Pending: ${invitations.filter((i: any) => i.rsvpStatus === 'pending').length}`)

  } catch (error) {
    console.error('❌ Error fetching invitations:', error)
  }
}

getInvitations()
