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

async function updateSlug() {
  try {
    console.log('🔍 Buscando evento de Diego...')
    
    // Buscar el evento de Diego
    const event = await client.fetch(`
      *[_type == "event" && title match "*Diego*"][0] {
        _id,
        title,
        slug
      }
    `)
    
    if (!event) {
      console.log('❌ No se encontró el evento de Diego')
      return
    }
    
    console.log('✅ Evento encontrado:', event.title)
    console.log('📝 Slug actual:', event.slug?.current || 'Sin slug')
    
    // Actualizar con slug personalizado
    const newSlug = 'DiegoCruz'
    
    await client
      .patch(event._id)
      .set({
        slug: {
          _type: 'slug',
          current: newSlug
        }
      })
      .commit()
    
    console.log('✅ Slug actualizado a:', newSlug)
    console.log(`🔗 Nueva URL corta: https://enviaubi.com/${newSlug}`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// Ejecutar el script
updateSlug()