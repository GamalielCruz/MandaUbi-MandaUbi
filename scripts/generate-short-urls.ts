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

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

async function generateShortUrls() {
  try {
    console.log('🔍 Buscando todos los eventos...')
    
    // Buscar todos los eventos
    const events = await client.fetch(`
      *[_type == "event" && !isArchived] {
        _id,
        title,
        slug,
        eventType,
        eventDate,
        "invitationCount": count(*[_type == "invitation" && references(^._id)])
      }
    `)
    
    console.log(`✅ Encontrados ${events.length} eventos`)
    
    for (const event of events) {
      console.log(`\n📅 Procesando: ${event.title}`)
      
      let currentSlug = event.slug?.current
      
      if (!currentSlug) {
        // Generar slug automático
        currentSlug = generateSlugFromTitle(event.title)
        
        // Verificar si el slug ya existe
        const existingEvent = await client.fetch(`
          *[_type == "event" && slug.current == $slug && _id != $eventId][0]
        `, { slug: currentSlug, eventId: event._id })
        
        if (existingEvent) {
          // Si existe, agregar un número
          let counter = 1
          let newSlug = `${currentSlug}${counter}`
          
          while (true) {
            const exists = await client.fetch(`
              *[_type == "event" && slug.current == $slug && _id != $eventId][0]
            `, { slug: newSlug, eventId: event._id })
            
            if (!exists) {
              currentSlug = newSlug
              break
            }
            
            counter++
            newSlug = `${currentSlug}${counter}`
          }
        }
        
        // Actualizar el evento con el nuevo slug
        await client
          .patch(event._id)
          .set({
            slug: {
              _type: 'slug',
              current: currentSlug
            }
          })
          .commit()
        
        console.log(`✅ Slug creado: ${currentSlug}`)
      } else {
        console.log(`✅ Slug existente: ${currentSlug}`)
      }
      
      console.log(`🔗 URL corta: https://enviaubi.com/${currentSlug}`)
      console.log(`📨 Invitaciones: ${event.invitationCount}`)
    }
    
    console.log('\n🎉 ¡Todas las URLs cortas han sido generadas!')
    console.log('\n📋 Resumen de URLs:')
    
    // Mostrar resumen final
    const finalEvents = await client.fetch(`
      *[_type == "event" && !isArchived] {
        title,
        slug,
        eventType,
        "invitationCount": count(*[_type == "invitation" && references(^._id)])
      } | order(title asc)
    `)
    
    finalEvents.forEach((event: any, index: number) => {
      console.log(`${index + 1}. ${event.title} (${event.eventType})`)
      console.log(`   🔗 https://enviaubi.com/${event.slug.current}`)
      console.log(`   📨 ${event.invitationCount} invitaciones`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// Ejecutar el script
generateShortUrls()