import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

async function findAllEvents() {
  // Create Sanity client
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  console.log('=== Buscando todos los eventos ===\n')

  try {
    // Query all events
    const query = `
      *[_type == "event"] {
        _id,
        title,
        slug,
        description,
        eventType,
        eventDate,
        template,
        location,
        contactInfo,
        ownerClerkId,
        createdAt
      } | order(createdAt desc)
    `

    const events = await client.fetch(query)

    if (events.length === 0) {
      console.log('❌ No se encontraron eventos')
      console.log('\nCrea un evento desde Sanity Studio:')
      console.log('http://localhost:3333')
      return
    }

    console.log(`✓ Se encontraron ${events.length} evento(s):\n`)

    events.forEach((event: any, index: number) => {
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      console.log(`${index + 1}. EVENTO: ${event.title}`)
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      console.log(`   🆔 ID: ${event._id}`)
      console.log(`   🔗 Slug: ${event.slug?.current || 'N/A'}`)
      console.log(`   📝 Descripción: ${event.description || 'N/A'}`)
      console.log(`   🎭 Tipo: ${event.eventType}`)
      console.log(`   📆 Fecha: ${new Date(event.eventDate).toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`)
      console.log(`   🎨 Template: ${event.template}`)
      
      if (event.location) {
        console.log(`   📍 Ubicación: ${event.location.venueName || 'N/A'}`)
        console.log(`      Dirección: ${event.location.address || 'N/A'}`)
        console.log(`      Ciudad: ${event.location.city || 'N/A'}, ${event.location.state || 'N/A'}`)
      }
      
      if (event.contactInfo) {
        console.log(`   📞 Contacto:`)
        if (event.contactInfo.phone) console.log(`      Tel: ${event.contactInfo.phone}`)
        if (event.contactInfo.whatsapp) console.log(`      WhatsApp: ${event.contactInfo.whatsapp}`)
        if (event.contactInfo.email) console.log(`      Email: ${event.contactInfo.email}`)
      }
      
      console.log(`   👤 Owner ID: ${event.ownerClerkId}`)
      console.log()
      console.log(`   🌐 Para crear invitaciones, usa:`)
      console.log(`      POST http://localhost:3000/api/invitations`)
      console.log(`      Body: {`)
      console.log(`        "eventId": "${event._id}",`)
      console.log(`        "guestName": "Nombre del Invitado",`)
      console.log(`        "numberOfGuests": 2`)
      console.log(`      }`)
      console.log()
    })

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('=== RESUMEN ===')
    console.log(`Total de eventos: ${events.length}`)
    const eventTypes = events.reduce((acc: any, e: any) => {
      acc[e.eventType] = (acc[e.eventType] || 0) + 1
      return acc
    }, {})
    Object.entries(eventTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`)
    })
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  } catch (error) {
    console.error('❌ Error al buscar eventos:', error)
  }
}

findAllEvents()
