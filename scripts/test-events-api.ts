/**
 * Test script for Events API
 * 
 * This script tests the Events API endpoints:
 * - POST /api/events - Create event
 * - GET /api/events - List events
 * - PATCH /api/events/[id] - Update event
 * - DELETE /api/events/[id] - Archive event
 * - GET /api/events/slug/[slug] - Get event by slug
 * 
 * Prerequisites:
 * - Next.js dev server running on port 3000
 * - User authenticated with Clerk (get auth token from browser)
 * 
 * Usage:
 * 1. Login to your app in the browser
 * 2. Open DevTools > Application > Cookies
 * 3. Copy the __session cookie value
 * 4. Set it as AUTH_TOKEN below
 * 5. Run: npx tsx scripts/test-events-api.ts
 */

const BASE_URL = 'http://localhost:3000'
const AUTH_TOKEN = 'your_session_token_here' // Replace with actual session token

async function testEventsAPI() {
  console.log('=== Testing Events API ===\n')

  let createdEventId: string
  let createdEventSlug: string

  // Test 1: Create Event
  console.log('1. Testing POST /api/events (Create Event)')
  try {
    const createResponse = await fetch(`${BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `__session=${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        title: 'Mi Boda Especial 2024',
        eventType: 'wedding',
        eventDate: '2024-12-25T18:00:00Z',
        template: 'isla/1',
        location: {
          venueName: 'Jardín Botánico',
          address: 'Av. Principal 123',
          city: 'Ciudad de México',
          state: 'CDMX',
        },
        contactInfo: {
          phone: '+52 55 1234 5678',
          email: 'contacto@miboda.com',
        },
      }),
    })

    if (createResponse.ok) {
      const event = await createResponse.json()
      createdEventId = event._id
      createdEventSlug = event.slug.current
      console.log('✓ Event created successfully')
      console.log('  ID:', createdEventId)
      console.log('  Slug:', createdEventSlug)
      console.log('  Title:', event.title)
    } else {
      const error = await createResponse.json()
      console.log('✗ Failed to create event:', error)
      return
    }
  } catch (error) {
    console.log('✗ Error:', error)
    return
  }
  console.log()

  // Test 2: List Events
  console.log('2. Testing GET /api/events (List Events)')
  try {
    const listResponse = await fetch(`${BASE_URL}/api/events`, {
      headers: {
        'Cookie': `__session=${AUTH_TOKEN}`,
      },
    })

    if (listResponse.ok) {
      const events = await listResponse.json()
      console.log('✓ Events retrieved successfully')
      console.log('  Total events:', events.length)
      console.log('  Events:', events.map((e: any) => e.title).join(', '))
    } else {
      const error = await listResponse.json()
      console.log('✗ Failed to list events:', error)
    }
  } catch (error) {
    console.log('✗ Error:', error)
  }
  console.log()

  // Test 3: Get Event by Slug (Public)
  console.log('3. Testing GET /api/events/slug/[slug] (Get by Slug - Public)')
  try {
    const slugResponse = await fetch(`${BASE_URL}/api/events/slug/${createdEventSlug}`)

    if (slugResponse.ok) {
      const event = await slugResponse.json()
      console.log('✓ Event retrieved by slug successfully')
      console.log('  Title:', event.title)
      console.log('  Event Type:', event.eventType)
      console.log('  Template:', event.template)
    } else {
      const error = await slugResponse.json()
      console.log('✗ Failed to get event by slug:', error)
    }
  } catch (error) {
    console.log('✗ Error:', error)
  }
  console.log()

  // Test 4: Update Event
  console.log('4. Testing PATCH /api/events/[id] (Update Event)')
  try {
    const updateResponse = await fetch(`${BASE_URL}/api/events/${createdEventId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `__session=${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        title: 'Mi Boda Especial 2024 - Actualizada',
        giftRegistry: {
          enabled: true,
          cashGiftEnabled: true,
        },
      }),
    })

    if (updateResponse.ok) {
      const event = await updateResponse.json()
      console.log('✓ Event updated successfully')
      console.log('  New title:', event.title)
      console.log('  Gift registry enabled:', event.giftRegistry?.enabled)
    } else {
      const error = await updateResponse.json()
      console.log('✗ Failed to update event:', error)
    }
  } catch (error) {
    console.log('✗ Error:', error)
  }
  console.log()

  // Test 5: Archive Event
  console.log('5. Testing DELETE /api/events/[id] (Archive Event)')
  try {
    const deleteResponse = await fetch(`${BASE_URL}/api/events/${createdEventId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': `__session=${AUTH_TOKEN}`,
      },
    })

    if (deleteResponse.ok) {
      const result = await deleteResponse.json()
      console.log('✓ Event archived successfully')
      console.log('  Message:', result.message)
    } else {
      const error = await deleteResponse.json()
      console.log('✗ Failed to archive event:', error)
    }
  } catch (error) {
    console.log('✗ Error:', error)
  }
  console.log()

  // Test 6: Verify Event is Archived
  console.log('6. Testing GET /api/events (Verify archived event not listed)')
  try {
    const listResponse = await fetch(`${BASE_URL}/api/events`, {
      headers: {
        'Cookie': `__session=${AUTH_TOKEN}`,
      },
    })

    if (listResponse.ok) {
      const events = await listResponse.json()
      const archivedEvent = events.find((e: any) => e._id === createdEventId)
      if (!archivedEvent) {
        console.log('✓ Archived event correctly excluded from list')
      } else {
        console.log('✗ Archived event still appears in list')
      }
    }
  } catch (error) {
    console.log('✗ Error:', error)
  }
  console.log()

  console.log('=== Tests Completed ===')
  console.log('\nNote: To run these tests, you need to:')
  console.log('1. Be logged in to the app')
  console.log('2. Copy your session token from browser cookies')
  console.log('3. Update AUTH_TOKEN in this script')
}

// Check if AUTH_TOKEN is set
if (AUTH_TOKEN === 'your_session_token_here') {
  console.log('⚠️  Please set AUTH_TOKEN in the script before running tests')
  console.log('\nTo get your auth token:')
  console.log('1. Login to http://localhost:3000')
  console.log('2. Open DevTools > Application > Cookies')
  console.log('3. Copy the __session cookie value')
  console.log('4. Set it as AUTH_TOKEN in this script')
} else {
  testEventsAPI()
}
