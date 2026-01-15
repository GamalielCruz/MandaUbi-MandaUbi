import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'
import * as readline from 'readline'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve))
}

async function editEvent() {
  try {
    console.log('🎨 Editor de Eventos - MandaUbi\n')
    
    // Buscar todos los eventos
    const events = await client.fetch(`
      *[_type == "event"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        eventType,
        eventDate
      }
    `)
    
    if (events.length === 0) {
      console.log('❌ No hay eventos disponibles')
      rl.close()
      return
    }
    
    console.log('📋 Eventos disponibles:\n')
    events.forEach((event: any, index: number) => {
      console.log(`${index + 1}. ${event.title}`)
      console.log(`   Slug: ${event.slug?.current || 'Sin slug'}`)
      console.log(`   Tipo: ${event.eventType}`)
      console.log(`   Fecha: ${new Date(event.eventDate).toLocaleDateString('es-ES')}`)
      console.log('')
    })
    
    const selection = await question('Selecciona el número del evento a editar: ')
    const selectedIndex = parseInt(selection) - 1
    
    if (selectedIndex < 0 || selectedIndex >= events.length) {
      console.log('❌ Selección inválida')
      rl.close()
      return
    }
    
    const selectedEvent = events[selectedIndex]
    console.log(`\n✅ Editando: ${selectedEvent.title}\n`)
    
    console.log('¿Qué deseas editar?')
    console.log('1. Título')
    console.log('2. Slug (URL corta)')
    console.log('3. Fecha del evento')
    console.log('4. Ubicación')
    console.log('5. Ver todo el evento')
    console.log('0. Cancelar')
    
    const option = await question('\nOpción: ')
    
    switch (option) {
      case '1':
        const newTitle = await question('Nuevo título: ')
        await client.patch(selectedEvent._id).set({ title: newTitle }).commit()
        console.log('✅ Título actualizado')
        break
        
      case '2':
        const newSlug = await question('Nuevo slug (sin espacios): ')
        await client.patch(selectedEvent._id).set({ 
          slug: { _type: 'slug', current: newSlug }
        }).commit()
        console.log(`✅ Slug actualizado: https://enviaubi.com/${newSlug}`)
        break
        
      case '3':
        const newDate = await question('Nueva fecha (YYYY-MM-DD): ')
        const newTime = await question('Hora (HH:MM): ')
        const dateTime = `${newDate}T${newTime}:00.000Z`
        await client.patch(selectedEvent._id).set({ eventDate: dateTime }).commit()
        console.log('✅ Fecha actualizada')
        break
        
      case '4':
        console.log('\n📍 Ubicación:')
        const venueName = await question('Nombre del lugar: ')
        const address = await question('Dirección: ')
        const city = await question('Ciudad: ')
        const state = await question('Estado: ')
        
        await client.patch(selectedEvent._id).set({ 
          location: {
            venueName,
            address,
            city,
            state
          }
        }).commit()
        console.log('✅ Ubicación actualizada')
        break
        
      case '5':
        const fullEvent = await client.fetch(`*[_id == $id][0]`, { id: selectedEvent._id })
        console.log('\n📄 Evento completo:')
        console.log(JSON.stringify(fullEvent, null, 2))
        break
        
      case '0':
        console.log('❌ Cancelado')
        break
        
      default:
        console.log('❌ Opción inválida')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    rl.close()
  }
}

// Ejecutar
editEvent()
