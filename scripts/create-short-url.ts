import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

async function createShortUrl() {
  try {
    console.log('🔍 Buscando evento de Diego...')
    
    // Buscar el evento de Diego
    const event = await client.fetch(`
      *[_type == "event" && title match "*Diego*"][0] {
        _id,
        title,
        slug,
        eventType,
        eventDate
      }
    `)
    
    if (!event) {
      console.log('❌ No se encontró el evento de Diego')
      return
    }
    
    console.log('✅ Evento encontrado:', event.title)
    console.log('📅 Fecha:', event.eventDate)
    console.log('🎂 Tipo:', event.eventType)
    
    // Verificar si ya tiene slug
    if (event.slug?.current) {
      console.log('✅ El evento ya tiene slug:', event.slug.current)
      console.log(`🔗 URL corta: https://enviaubi.com/${event.slug.current}`)
    } else {
      console.log('⚠️  El evento no tiene slug. Creando uno...')
      
      // Crear slug personalizado
      const customSlug = 'DiegoCruz'
      
      // Actualizar el evento con el slug
      await client
        .patch(event._id)
        .set({
          slug: {
            _type: 'slug',
            current: customSlug
          }
        })
        .commit()
      
      console.log('✅ Slug creado:', customSlug)
      console.log(`🔗 URL corta: https://enviaubi.com/${customSlug}`)
    }
    
    // Mostrar información de invitaciones
    const invitations = await client.fetch(`
      *[_type == "invitation" && references($eventId)] {
        _id,
        token,
        guestName
      }
    `, { eventId: event._id })
    
    console.log(`\n📨 Invitaciones encontradas: ${invitations.length}`)
    invitations.forEach((inv: any, index: number) => {
      console.log(`${index + 1}. ${inv.guestName} - Token: ${inv.token.substring(0, 20)}...`)
    })
    
    if (invitations.length > 0) {
      console.log(`\n🎯 URL de invitación principal: https://enviaubi.com/invitation/${invitations[0].token}`)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// Ejecutar el script
createShortUrl()