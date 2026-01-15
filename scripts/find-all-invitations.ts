import dotenv from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

async function findAllInvitations() {
  // Create Sanity client
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  console.log('=== Buscando todas las invitaciones ===\n')

  try {
    // Query all invitations with event details
    const query = `
      *[_type == "invitation"] {
        _id,
        guestName,
        guestEmail,
        guestPhone,
        token,
        numberOfGuests,
        rsvpStatus,
        createdAt,
        event->{
          _id,
          title,
          slug,
          eventType,
          eventDate,
          template
        }
      } | order(createdAt desc)
    `

    const invitations = await client.fetch(query)

    if (invitations.length === 0) {
      console.log('❌ No se encontraron invitaciones')
      console.log('\nPara crear una invitación, usa la API:')
      console.log('POST http://localhost:3000/api/invitations')
      return
    }

    console.log(`✓ Se encontraron ${invitations.length} invitación(es):\n`)

    invitations.forEach((inv: any, index: number) => {
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      console.log(`${index + 1}. INVITACIÓN PARA: ${inv.guestName}`)
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
      
      if (inv.event) {
        console.log(`   📅 Evento: ${inv.event.title}`)
        console.log(`   🎭 Tipo: ${inv.event.eventType}`)
        console.log(`   📆 Fecha: ${new Date(inv.event.eventDate).toLocaleDateString('es-MX')}`)
        console.log(`   🎨 Template: ${inv.event.template}`)
        console.log(`   🔗 Slug: ${inv.event.slug?.current || 'N/A'}`)
      } else {
        console.log(`   ⚠️  Evento: No encontrado`)
      }
      
      console.log(`   👥 Número de invitados: ${inv.numberOfGuests}`)
      console.log(`   📧 Email: ${inv.guestEmail || 'N/A'}`)
      console.log(`   📱 Teléfono: ${inv.guestPhone || 'N/A'}`)
      console.log(`   ✅ Estado RSVP: ${inv.rsvpStatus}`)
      console.log(`   🔑 Token: ${inv.token}`)
      console.log(`   🌐 URL: http://localhost:3000/invitation/${inv.token}`)
      console.log()
    })

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('=== RESUMEN ===')
    console.log(`Total de invitaciones: ${invitations.length}`)
    console.log(`✅ Confirmadas: ${invitations.filter((i: any) => i.rsvpStatus === 'confirmed').length}`)
    console.log(`❌ Declinadas: ${invitations.filter((i: any) => i.rsvpStatus === 'declined').length}`)
    console.log(`⏳ Pendientes: ${invitations.filter((i: any) => i.rsvpStatus === 'pending').length}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  } catch (error) {
    console.error('❌ Error al buscar invitaciones:', error)
  }
}

findAllInvitations()
