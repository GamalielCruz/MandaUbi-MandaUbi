import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'
import { generateToken } from '../lib/utils/token'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const EVENT_ID = 'cfb21306-411b-4a4f-afe4-c2d359e0abb2'

async function fixInvitation() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  console.log('=== Fixing/Creating Invitation ===\n')

  try {
    // Find broken invitation
    const brokenInvitations = await client.fetch(
      `*[_type == "invitation" && event._ref == $eventId && (token == null || guestName == null)]`,
      { eventId: EVENT_ID }
    )

    if (brokenInvitations.length > 0) {
      console.log(`Found ${brokenInvitations.length} broken invitation(s). Deleting...`)
      
      for (const inv of brokenInvitations) {
        await client.delete(inv._id)
        console.log(`✓ Deleted broken invitation: ${inv._id}`)
      }
      console.log()
    }

    // Create new invitation with proper data
    console.log('Creating new invitation...')
    
    const token = generateToken()
    const invitationDoc = {
      _type: 'invitation',
      event: {
        _type: 'reference',
        _ref: EVENT_ID,
      },
      guestName: 'Diego',
      guestEmail: 'diego@example.com',
      guestPhone: '+52 444 000 0000',
      token: token,
      numberOfGuests: 1,
      rsvpStatus: 'pending',
      rsvpDate: null,
      notes: null,
      lastAccessedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const created = await client.create(invitationDoc)
    
    console.log('✓ Invitation created successfully!')
    console.log()
    console.log('=== Invitation Details ===')
    console.log('ID:', created._id)
    console.log('Guest Name:', invitationDoc.guestName)
    console.log('Email:', invitationDoc.guestEmail)
    console.log('Phone:', invitationDoc.guestPhone)
    console.log('Number of Guests:', invitationDoc.numberOfGuests)
    console.log('Token:', token)
    console.log()
    console.log('📧 Invitation URL:')
    console.log(`   http://localhost:3000/invitation/${token}`)
    console.log()
    console.log('🌐 Or via ngrok (for sharing):')
    console.log(`   https://e3c07e981e96.ngrok-free.app/invitation/${token}`)

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

fixInvitation()
