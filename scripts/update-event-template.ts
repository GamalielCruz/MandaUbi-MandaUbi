import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const EVENT_ID = 'cfb21306-411b-4a4f-afe4-c2d359e0abb2' // Diego's event

async function updateEventTemplate() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  console.log('=== Actualizando template del evento ===\n')

  try {
    await client
      .patch(EVENT_ID)
      .set({ template: 'isla/5' })
      .commit()

    console.log('✅ Template actualizado exitosamente a isla/5')
    console.log()
    console.log('Ahora puedes acceder a la invitación:')
    console.log('http://localhost:3000/invitation/bbb42af25697c0de03d7d34cf4825e09851c419335e21e633489bd15fcf97849')
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

updateEventTemplate()
