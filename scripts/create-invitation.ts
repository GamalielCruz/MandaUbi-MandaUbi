import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'
import crypto from 'crypto'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const EVENT_ID = 'cfb21306-411b-4a4f-afe4-c2d359e0abb2' // Diego's event

// Generate a secure random token
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

async function createInvitation() {
  // Create Sanity client
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  console.log('=== Creando invitación ===\n')

  try {
    // Verify event exists
    const event = await client.fetch(
      `*[_type == "event" && _id == $eventId][0]`,
      { eventId: EVENT_ID }
    )

    if (!event) {
      console.log('❌ Evento no encontrado')
      return
    }

    console.log(`✓ Evento encontrado: ${event.title}`)
    console.log()

    // Generate unique token
    const token = generateToken()

    // Create invitation document
    const invitationDoc = {
      _type: 'invitation',
      event: {
        _type: 'reference',
        _ref: EVENT_ID,
      },
      guestName: 'Familia García',
      guestEmail: 'familia.garcia@example.com',
      guestPhone: '+52 444 123 4567',
      token: token,
      numberOfGuests: 4,
      rsvpStatus: 'pending',
      rsvpDate: null,
      notes: 'Invitación de prueba',
      lastAccessedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Create invitation in Sanity
    const createdInvitation = await client.create(invitationDoc)

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ INVITACIÓN CREADA EXITOSAMENTE')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log()
    console.log(`📋 Detalles de la invitación:`)
    console.log(`   🆔 ID: ${createdInvitation._id}`)
    console.log(`   👤 Invitado: ${invitationDoc.guestName}`)
    console.log(`   📧 Email: ${invitationDoc.guestEmail}`)
    console.log(`   📱 Teléfono: ${invitationDoc.guestPhone}`)
    console.log(`   👥 Número de invitados: ${invitationDoc.numberOfGuests}`)
    console.log(`   ✅ Estado: ${invitationDoc.rsvpStatus}`)
    console.log()
    console.log(`🔑 Token: ${token}`)
    console.log()
    console.log(`🌐 URL de la invitación:`)
    console.log(`   http://localhost:3000/invitation/${token}`)
    console.log()
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log()
    console.log('💡 Copia la URL de arriba y ábrela en tu navegador')
    console.log('   para ver la invitación con el template isla/2')
    console.log()

  } catch (error) {
    console.error('❌ Error al crear invitación:', error)
  }
}

createInvitation()
