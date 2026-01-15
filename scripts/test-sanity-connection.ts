import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

async function testConnection() {
  console.log('=== Testing Sanity Connection ===\n')
  
  console.log('Environment variables:')
  console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)
  console.log('SANITY_API_TOKEN:', process.env.SANITY_API_TOKEN ? '✓ Set' : '✗ Not set')
  console.log()

  // Create Sanity client
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  try {
    // Test query
    const token = 'bbb42af25697c0de03d7d34cf4825e09851c419335e21e633489bd15fcf97849'
    
    console.log('Testing query with token:', token)
    console.log()
    
    const query = `*[_type == "invitation" && token == $token][0]{
      _id,
      guestName,
      token,
      event->{
        _id,
        title,
        template
      }
    }`
    
    const result = await client.fetch(query, { token } as Record<string, any>)
    
    if (result) {
      console.log('✅ SUCCESS! Invitation found:')
      console.log(JSON.stringify(result, null, 2))
    } else {
      console.log('❌ No invitation found with that token')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

testConnection()
