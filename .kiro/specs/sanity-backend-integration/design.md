# Design Document: Sanity Backend Integration

## Overview

Este diseño describe la arquitectura e implementación de un backend completo para una plataforma de invitaciones digitales usando Sanity.io como CMS headless y base de datos única, integrado con Clerk para autenticación de organizadores. El sistema permite a usuarios autenticados crear y gestionar eventos e invitaciones, mientras que los invitados acceden mediante tokens únicos sin necesidad de autenticación.

### Key Design Decisions

1. **Sanity como única fuente de verdad**: Todos los datos se almacenan en Sanity, incluyendo perfiles de usuario sincronizados desde Clerk
2. **ClerkId como nexo**: El `clerkId` es el identificador que vincula usuarios de Clerk con documentos en Sanity
3. **Tokens para invitados**: Sistema de acceso basado en tokens únicos para invitados sin requerir autenticación
4. **Webhooks para sincronización**: Clerk notifica cambios de usuarios mediante webhooks que actualizan Sanity automáticamente
5. **Slugs para URLs amigables**: Eventos accesibles mediante slugs legibles en lugar de IDs técnicos
6. **Templates reutilizables**: Las plantillas visuales existentes (isla/0, isla/1, etc.) se referencian desde eventos

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Organizer   │  │   Guest      │  │   Public     │      │
│  │  Dashboard   │  │  Invitation  │  │   Pages      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Next.js API Routes)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Auth       │  │   Events     │  │  Invitations │      │
│  │  Middleware  │  │   API        │  │     API      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │   Webhooks   │  │    RSVP      │                         │
│  │   Handler    │  │    API       │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
           │                                        │
           ▼                                        ▼
┌──────────────────────┐              ┌──────────────────────┐
│       Clerk          │              │      Sanity.io       │
│  ┌────────────────┐  │              │  ┌────────────────┐  │
│  │  User Identity │  │              │  │  User Schema   │  │
│  │  Management    │  │              │  │  Event Schema  │  │
│  │  Authentication│  │              │  │  Invitation    │  │
│  │  Webhooks      │  │              │  │  Schema        │  │
│  └────────────────┘  │              │  └────────────────┘  │
└──────────────────────┘              └──────────────────────┘
```

### Data Flow

**Organizer Flow:**
1. Usuario se registra/autentica con Clerk
2. Clerk envía webhook → API crea/actualiza documento user en Sanity
3. Usuario autenticado crea evento → API almacena en Sanity con clerkId
4. Usuario crea invitaciones → API genera tokens y almacena en Sanity
5. Usuario consulta RSVPs → API consulta Sanity con GROQ

**Guest Flow:**
1. Invitado recibe URL con token único
2. Frontend solicita invitación con token → API valida y consulta Sanity
3. API retorna datos de invitación + evento + template
4. Invitado confirma/declina asistencia → API actualiza RSVP en Sanity

## Components and Interfaces

### Sanity Schemas

#### User Schema (`user.ts`)

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'clerkId',
      title: 'Clerk ID',
      type: 'string',
      validation: Rule => Rule.required().custom((clerkId) => {
        // Validación de formato de clerkId
        if (typeof clerkId !== 'string' || !clerkId.startsWith('user_')) {
          return 'Invalid Clerk ID format'
        }
        return true
      })
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string'
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string'
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'url'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime'
    })
  ]
})
```

#### Event Schema (`event.ts`)

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Boda', value: 'wedding' },
          { title: 'XV Años', value: 'quinceanera' },
          { title: 'Cumpleaños', value: 'birthday' },
          { title: 'Bautizo', value: 'baptism' },
          { title: 'Otro', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'template',
      title: 'Template',
      type: 'string',
      options: {
        list: [
          { title: 'Template 0 - XV Años Rosa', value: 'isla/0' },
          { title: 'Template 1 - Boda Elegante', value: 'isla/1' },
          { title: 'Template 2 - Cumpleaños Infantil', value: 'isla/2' },
          { title: 'Template 4 - XV Años Minimalista', value: 'isla/4' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'venueName', title: 'Venue Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'coordinates', title: 'Coordinates', type: 'geopoint' }
      ]
    }),
    defineField({
      name: 'ceremonyLocation',
      title: 'Ceremony Location',
      type: 'object',
      fields: [
        { name: 'venueName', title: 'Venue Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'time', title: 'Time', type: 'string' }
      ]
    }),
    defineField({
      name: 'receptionLocation',
      title: 'Reception Location',
      type: 'object',
      fields: [
        { name: 'venueName', title: 'Venue Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'time', title: 'Time', type: 'string' }
      ]
    }),
    defineField({
      name: 'giftRegistry',
      title: 'Gift Registry',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false },
        { name: 'stores', title: 'Stores', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Store Name', type: 'string' },
              { name: 'code', title: 'Registry Code', type: 'string' },
              { name: 'url', title: 'URL', type: 'url' }
            ]
          }
        ]},
        { name: 'cashGiftEnabled', title: 'Cash Gift Enabled', type: 'boolean' }
      ]
    }),
    defineField({
      name: 'customImages',
      title: 'Custom Images',
      type: 'object',
      fields: [
        { name: 'heroImage', title: 'Hero Image', type: 'url' },
        { name: 'galleryImages', title: 'Gallery Images', type: 'array', of: [{ type: 'url' }] }
      ]
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' }
      ]
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'ownerClerkId',
      title: 'Owner Clerk ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isArchived',
      title: 'Is Archived',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime'
    })
  ]
})
```

#### Invitation Schema (`invitation.ts`)

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'invitation',
  title: 'Invitation',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'guestEmail',
      title: 'Guest Email',
      type: 'string',
      validation: Rule => Rule.email()
    }),
    defineField({
      name: 'guestPhone',
      title: 'Guest Phone',
      type: 'string'
    }),
    defineField({
      name: 'token',
      title: 'Unique Token',
      type: 'string',
      validation: Rule => Rule.required().custom((token) => {
        // Validación de formato de token
        if (typeof token !== 'string' || token.length < 32) {
          return 'Token must be at least 32 characters'
        }
        return true
      })
    }),
    defineField({
      name: 'numberOfGuests',
      title: 'Number of Guests',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1).max(20)
    }),
    defineField({
      name: 'rsvpStatus',
      title: 'RSVP Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pending' },
          { title: 'Confirmado', value: 'confirmed' },
          { title: 'Declinado', value: 'declined' }
        ]
      },
      initialValue: 'pending',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'rsvpDate',
      title: 'RSVP Date',
      type: 'datetime'
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'lastAccessedAt',
      title: 'Last Accessed At',
      type: 'datetime'
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime'
    })
  ]
})
```

### API Routes

#### Webhook Handler (`/api/webhooks/clerk`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { sanityClient } from '@/lib/sanity'

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set')
  }

  // Get headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle event
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    await sanityClient.create({
      _type: 'user',
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
      profileImage: image_url,
      isActive: true,
      createdAt: new Date().toISOString()
    })
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    const user = await sanityClient.fetch(
      `*[_type == "user" && clerkId == $clerkId][0]`,
      { clerkId: id }
    )

    if (user) {
      await sanityClient
        .patch(user._id)
        .set({
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
          profileImage: image_url,
          updatedAt: new Date().toISOString()
        })
        .commit()
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const user = await sanityClient.fetch(
      `*[_type == "user" && clerkId == $clerkId][0]`,
      { clerkId: id }
    )

    if (user) {
      await sanityClient
        .patch(user._id)
        .set({
          isActive: false,
          updatedAt: new Date().toISOString()
        })
        .commit()
    }
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
```

#### Events API (`/api/events`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { sanityClient } from '@/lib/sanity'
import { generateSlug } from '@/lib/utils'

// GET /api/events - Get all events for authenticated user
export async function GET(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const events = await sanityClient.fetch(
    `*[_type == "event" && ownerClerkId == $clerkId && isArchived == false] | order(eventDate desc) {
      _id,
      title,
      slug,
      description,
      eventType,
      eventDate,
      template,
      location,
      ceremonyLocation,
      receptionLocation,
      giftRegistry,
      customImages,
      contactInfo,
      createdAt,
      "invitationCount": count(*[_type == "invitation" && references(^._id)]),
      "confirmedCount": count(*[_type == "invitation" && references(^._id) && rsvpStatus == "confirmed"])
    }`,
    { clerkId: userId }
  )

  return NextResponse.json({ events }, { status: 200 })
}

// POST /api/events - Create new event
export async function POST(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  // Get user reference
  const user = await sanityClient.fetch(
    `*[_type == "user" && clerkId == $clerkId][0]`,
    { clerkId: userId }
  )

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Generate unique slug
  let slug = generateSlug(body.title)
  let slugExists = await sanityClient.fetch(
    `*[_type == "event" && slug.current == $slug][0]`,
    { slug }
  )

  let counter = 1
  while (slugExists) {
    slug = `${generateSlug(body.title)}-${counter}`
    slugExists = await sanityClient.fetch(
      `*[_type == "event" && slug.current == $slug][0]`,
      { slug }
    )
    counter++
  }

  const event = await sanityClient.create({
    _type: 'event',
    ...body,
    slug: { _type: 'slug', current: slug },
    owner: { _type: 'reference', _ref: user._id },
    ownerClerkId: userId,
    isArchived: false,
    createdAt: new Date().toISOString()
  })

  return NextResponse.json({ event }, { status: 201 })
}
```

#### Invitations API (`/api/invitations`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { sanityClient } from '@/lib/sanity'
import { generateToken } from '@/lib/utils'

// POST /api/invitations - Create new invitation
export async function POST(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { eventId, guestName, guestEmail, guestPhone, numberOfGuests, notes } = body

  // Verify event ownership
  const event = await sanityClient.fetch(
    `*[_type == "event" && _id == $eventId && ownerClerkId == $clerkId][0]`,
    { eventId, clerkId: userId }
  )

  if (!event) {
    return NextResponse.json({ error: 'Event not found or unauthorized' }, { status: 404 })
  }

  // Generate unique token
  let token = generateToken()
  let tokenExists = await sanityClient.fetch(
    `*[_type == "invitation" && token == $token][0]`,
    { token }
  )

  while (tokenExists) {
    token = generateToken()
    tokenExists = await sanityClient.fetch(
      `*[_type == "invitation" && token == $token][0]`,
      { token }
    )
  }

  const invitation = await sanityClient.create({
    _type: 'invitation',
    event: { _type: 'reference', _ref: eventId },
    guestName,
    guestEmail,
    guestPhone,
    token,
    numberOfGuests,
    notes,
    rsvpStatus: 'pending',
    createdAt: new Date().toISOString()
  })

  return NextResponse.json({ invitation }, { status: 201 })
}
```

#### Guest Invitation API (`/api/guest/invitation/[token]`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 })
  }

  const invitation = await sanityClient.fetch(
    `*[_type == "invitation" && token == $token][0] {
      _id,
      guestName,
      numberOfGuests,
      rsvpStatus,
      rsvpDate,
      token,
      "event": event-> {
        _id,
        title,
        description,
        eventType,
        eventDate,
        template,
        location,
        ceremonyLocation,
        receptionLocation,
        giftRegistry,
        customImages,
        contactInfo
      }
    }`,
    { token }
  )

  if (!invitation) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
  }

  // Update last accessed
  await sanityClient
    .patch(invitation._id)
    .set({ lastAccessedAt: new Date().toISOString() })
    .commit()

  return NextResponse.json({ invitation }, { status: 200 })
}
```

#### RSVP API (`/api/guest/rsvp`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { token, rsvpStatus } = body

  if (!token || !rsvpStatus) {
    return NextResponse.json({ error: 'Token and rsvpStatus are required' }, { status: 400 })
  }

  if (!['confirmed', 'declined'].includes(rsvpStatus)) {
    return NextResponse.json({ error: 'Invalid rsvpStatus' }, { status: 400 })
  }

  const invitation = await sanityClient.fetch(
    `*[_type == "invitation" && token == $token][0]`,
    { token }
  )

  if (!invitation) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
  }

  await sanityClient
    .patch(invitation._id)
    .set({
      rsvpStatus,
      rsvpDate: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    .commit()

  return NextResponse.json({ success: true }, { status: 200 })
}
```

## Data Models

### User Document

```typescript
interface User {
  _id: string
  _type: 'user'
  clerkId: string // Unique identifier from Clerk
  email: string
  firstName?: string
  lastName?: string
  profileImage?: string
  isActive: boolean
  createdAt: string // ISO 8601 datetime
  updatedAt?: string // ISO 8601 datetime
}
```

### Event Document

```typescript
interface Event {
  _id: string
  _type: 'event'
  title: string
  slug: { _type: 'slug'; current: string }
  description?: string
  eventType: 'wedding' | 'quinceanera' | 'birthday' | 'baptism' | 'other'
  eventDate: string // ISO 8601 datetime
  template: 'isla/0' | 'isla/1' | 'isla/2' | 'isla/4'
  location?: {
    venueName?: string
    address?: string
    city?: string
    state?: string
    coordinates?: { lat: number; lng: number }
  }
  ceremonyLocation?: {
    venueName?: string
    address?: string
    time?: string
  }
  receptionLocation?: {
    venueName?: string
    address?: string
    time?: string
  }
  giftRegistry?: {
    enabled: boolean
    stores?: Array<{
      name: string
      code: string
      url: string
    }>
    cashGiftEnabled?: boolean
  }
  customImages?: {
    heroImage?: string
    galleryImages?: string[]
  }
  contactInfo?: {
    phone?: string
    whatsapp?: string
    email?: string
  }
  owner: { _type: 'reference'; _ref: string } // Reference to user
  ownerClerkId: string // Denormalized for faster queries
  isArchived: boolean
  createdAt: string // ISO 8601 datetime
  updatedAt?: string // ISO 8601 datetime
}
```

### Invitation Document

```typescript
interface Invitation {
  _id: string
  _type: 'invitation'
  event: { _type: 'reference'; _ref: string } // Reference to event
  guestName: string
  guestEmail?: string
  guestPhone?: string
  token: string // Unique access token
  numberOfGuests: number
  rsvpStatus: 'pending' | 'confirmed' | 'declined'
  rsvpDate?: string // ISO 8601 datetime
  notes?: string
  lastAccessedAt?: string // ISO 8601 datetime
  createdAt: string // ISO 8601 datetime
  updatedAt?: string // ISO 8601 datetime
}
```

## Correctness Properties

*Una propiedad es una característica o comportamiento que debe mantenerse verdadero en todas las ejecuciones válidas del sistema—esencialmente, una declaración formal sobre lo que el sistema debe hacer. Las propiedades sirven como puente entre las especificaciones legibles por humanos y las garantías de correctitud verificables por máquina.*


### Property Reflection

Después de analizar todos los criterios de aceptación, he identificado las siguientes redundancias:

**Redundancias identificadas:**
- Propiedades 6.1, 6.2, 6.3 son redundantes con 1.1, 1.2, 1.3 (webhooks de Clerk crean/actualizan/eliminan usuarios)
- Propiedad 7.1 es redundante con 2.4 (verificación de propietario al editar)
- Propiedades 8.2, 8.3 son redundantes con 2.2 y 4.4 (almacenamiento y retorno de template)
- Propiedad 10.1 es redundante con 2.6 (generación de slug único)
- Propiedades 11.1-11.5 son redundantes con 2.2 (estructura de Event_Document)
- Propiedades 12.1-12.5 son redundantes con 3.2 (estructura de Invitation_Document)

**Propiedades consolidadas:**
Las propiedades de estructura de documentos (2.2, 3.2, 1.4) pueden consolidarse en propiedades más amplias que verifiquen la integridad completa del esquema.

**Propiedades no testeables:**
- 4.3, 7.2: Reglas de autorización complejas que requieren simulación completa del sistema de permisos
- 7.5: Práctica de configuración, no comportamiento funcional
- 9.1-9.4: Decisiones de implementación de consultas GROQ, no comportamientos funcionales testeables

### Correctness Properties

Property 1: User creation from webhook
*For any* valid Clerk user.created webhook payload, creating a user document in Sanity should result in a document with clerkId, email, and isActive=true fields populated correctly
**Validates: Requirements 1.1, 6.1**

Property 2: User update from webhook
*For any* valid Clerk user.updated webhook payload for an existing user, updating the user document in Sanity should reflect all changed fields (email, firstName, lastName, profileImage) and update the updatedAt timestamp
**Validates: Requirements 1.2, 6.2**

Property 3: User soft deletion from webhook
*For any* valid Clerk user.deleted webhook payload for an existing user, the user document in Sanity should have isActive set to false without physical deletion
**Validates: Requirements 1.3, 6.3**

Property 4: ClerkId uniqueness
*For any* two user documents in Sanity, their clerkId fields must be different
**Validates: Requirements 1.5**

Property 5: User document structure
*For any* user document created in Sanity, it must contain all required fields: clerkId, email, isActive, and createdAt
**Validates: Requirements 1.4**

Property 6: Event creation with owner linkage
*For any* authenticated organizer creating an event, the event document in Sanity should have ownerClerkId matching the organizer's clerkId and a valid reference to the user document
**Validates: Requirements 2.1**

Property 7: Event document structure
*For any* event document created in Sanity, it must contain all required fields: title, slug, eventType, eventDate, template, ownerClerkId, and isArchived=false
**Validates: Requirements 2.2, 11.1, 11.2, 11.3, 11.4, 11.5**

Property 8: Event ownership filtering
*For any* organizer querying their events, the returned list should contain only events where ownerClerkId matches the organizer's clerkId and isArchived is false
**Validates: Requirements 2.3, 9.5**

Property 9: Event update authorization
*For any* attempt to update an event by an organizer, the operation should succeed only if the organizer's clerkId matches the event's ownerClerkId
**Validates: Requirements 2.4, 7.1**

Property 10: Event soft deletion
*For any* event deletion by its owner, the event document should have isArchived set to true without physical deletion from Sanity
**Validates: Requirements 2.5**

Property 11: Slug generation and uniqueness
*For any* event title, the generated slug should be URL-safe (lowercase, no special characters, hyphens for spaces), and if a slug already exists, a numeric suffix should be appended to make it unique
**Validates: Requirements 2.6, 10.1, 10.2, 10.4, 10.5**

Property 12: Event access by slug
*For any* event with a valid slug, querying by that slug should return the same event as querying by its _id
**Validates: Requirements 10.3**

Property 13: Invitation token generation and uniqueness
*For any* invitation created, the generated token should be at least 32 characters long, cryptographically random, and unique across all invitations in Sanity
**Validates: Requirements 3.1, 3.3, 3.4**

Property 14: Invitation document structure
*For any* invitation document created in Sanity, it must contain all required fields: event reference, guestName, token, numberOfGuests, rsvpStatus='pending', and createdAt
**Validates: Requirements 3.2, 12.1, 12.2, 12.3, 12.4, 12.5**

Property 15: Multiple invitations per event
*For any* event, creating multiple invitations with different guest names should succeed, and all invitations should reference the same event
**Validates: Requirements 3.5**

Property 16: Guest access with valid token
*For any* valid invitation token, querying the invitation should return the complete invitation document with populated event data including title, eventDate, template, and location
**Validates: Requirements 4.1, 4.4, 8.3**

Property 17: Guest access with invalid token
*For any* non-existent or malformed token, querying the invitation should return an error response
**Validates: Requirements 4.2**

Property 18: Last access tracking
*For any* invitation accessed by token, the lastAccessedAt field should be updated to the current timestamp
**Validates: Requirements 4.5**

Property 19: RSVP confirmation
*For any* invitation with token, updating rsvpStatus to 'confirmed' should persist the change and update rsvpDate to the current timestamp
**Validates: Requirements 5.1, 5.4**

Property 20: RSVP declination
*For any* invitation with token, updating rsvpStatus to 'declined' should persist the change and update rsvpDate to the current timestamp
**Validates: Requirements 5.2, 5.4**

Property 21: RSVP mutability
*For any* invitation, changing rsvpStatus multiple times (e.g., pending → confirmed → declined → confirmed) should always persist the latest status and update rsvpDate each time
**Validates: Requirements 5.3**

Property 22: RSVP aggregation
*For any* event with multiple invitations, the count of invitations with rsvpStatus='confirmed' plus count with rsvpStatus='declined' plus count with rsvpStatus='pending' should equal the total number of invitations for that event
**Validates: Requirements 5.5**

Property 23: Webhook signature verification
*For any* webhook request without a valid svix signature, the webhook handler should reject the request and return an error response
**Validates: Requirements 6.4**

Property 24: Webhook success response
*For any* valid webhook request that is processed successfully, the webhook handler should return HTTP status code 200
**Validates: Requirements 6.5**

Property 25: Webhook failure response
*For any* webhook request that fails during processing (e.g., Sanity write error), the webhook handler should return HTTP status code 500
**Validates: Requirements 6.6**

Property 26: Unauthorized access rejection
*For any* API request attempting to access or modify a resource without proper authorization (missing clerkId or mismatched ownership), the API should return HTTP status code 403
**Validates: Requirements 7.3**

Property 27: Token validation on guest requests
*For any* guest API request, the token must be validated before processing, and invalid tokens should result in error responses
**Validates: Requirements 7.4**

Property 28: Template selection validation
*For any* event creation or update, if the template value is not one of the valid options ('isla/0', 'isla/1', 'isla/2', 'isla/4'), the operation should fail with a validation error
**Validates: Requirements 8.4**

Property 29: Template update persistence
*For any* event, updating the template field to a different valid template value should persist the change and allow subsequent queries to return the new template
**Validates: Requirements 8.5**

## Error Handling

### Error Categories

1. **Authentication Errors (401)**
   - Missing or invalid Clerk authentication
   - Expired session tokens
   - Response: `{ error: 'Unauthorized', message: 'Authentication required' }`

2. **Authorization Errors (403)**
   - Attempting to access/modify resources owned by another user
   - Invalid invitation tokens
   - Response: `{ error: 'Forbidden', message: 'You do not have permission to access this resource' }`

3. **Validation Errors (400)**
   - Missing required fields
   - Invalid data formats (e.g., invalid email, invalid template)
   - Invalid RSVP status values
   - Response: `{ error: 'Validation Error', message: 'Detailed validation message', fields: ['field1', 'field2'] }`

4. **Not Found Errors (404)**
   - Event not found
   - Invitation not found
   - User not found
   - Response: `{ error: 'Not Found', message: 'Resource not found' }`

5. **Conflict Errors (409)**
   - Duplicate clerkId
   - Duplicate token (should be prevented by generation logic)
   - Response: `{ error: 'Conflict', message: 'Resource already exists' }`

6. **Server Errors (500)**
   - Sanity write/read failures
   - Webhook processing failures
   - Unexpected errors
   - Response: `{ error: 'Internal Server Error', message: 'An unexpected error occurred' }`

### Error Handling Strategy

1. **Graceful Degradation**: If Sanity is temporarily unavailable, cache requests and retry with exponential backoff
2. **Detailed Logging**: Log all errors with context (user, operation, timestamp) for debugging
3. **User-Friendly Messages**: Return clear, actionable error messages to clients
4. **Webhook Retry**: Clerk will retry failed webhooks automatically; ensure idempotency
5. **Transaction Safety**: Use Sanity transactions for operations that modify multiple documents

## Testing Strategy

### Unit Testing

Unit tests will verify specific functions and edge cases:

- **Token Generation**: Test that `generateToken()` produces tokens of correct length and format
- **Slug Generation**: Test that `generateSlug()` correctly normalizes titles and handles special characters
- **Webhook Signature Verification**: Test that invalid signatures are rejected
- **Data Validation**: Test that schema validation catches invalid data
- **Error Responses**: Test that error handlers return correct status codes and messages

### Property-Based Testing

Property-based tests will verify universal correctness properties across many generated inputs. Each test will run a minimum of 100 iterations with randomized data.

**Testing Framework**: We will use `fast-check` for TypeScript property-based testing.

**Test Configuration**:
```typescript
import fc from 'fast-check'

// Example configuration
fc.assert(
  fc.property(
    // generators here
    (input) => {
      // property assertion here
    }
  ),
  { numRuns: 100 } // Minimum 100 iterations
)
```

**Property Test Examples**:

1. **Property 1: User creation from webhook**
   - Generate random Clerk webhook payloads
   - Verify user documents are created with correct fields
   - Tag: `Feature: sanity-backend-integration, Property 1: User creation from webhook`

2. **Property 11: Slug generation and uniqueness**
   - Generate random event titles (including special characters, spaces, unicode)
   - Verify slugs are URL-safe and unique
   - Tag: `Feature: sanity-backend-integration, Property 11: Slug generation and uniqueness`

3. **Property 13: Invitation token generation and uniqueness**
   - Generate multiple invitations
   - Verify all tokens are unique and meet length/randomness requirements
   - Tag: `Feature: sanity-backend-integration, Property 13: Invitation token generation and uniqueness`

4. **Property 21: RSVP mutability**
   - Generate random sequences of RSVP status changes
   - Verify final state matches last change and rsvpDate updates each time
   - Tag: `Feature: sanity-backend-integration, Property 21: RSVP mutability`

### Integration Testing

Integration tests will verify end-to-end flows:

- **Organizer Flow**: Register → Create Event → Create Invitations → View RSVPs
- **Guest Flow**: Access Invitation by Token → View Event Details → Confirm RSVP
- **Webhook Flow**: Clerk sends webhook → User created/updated in Sanity
- **Authorization Flow**: Attempt unauthorized access → Verify rejection

### Test Data Management

- **Sanity Test Dataset**: Use a separate Sanity dataset for testing (e.g., `test` or `development`)
- **Clerk Test Environment**: Use Clerk's test environment with test API keys
- **Data Cleanup**: Clean up test data after each test run to prevent pollution
- **Fixtures**: Create reusable test fixtures for common scenarios (sample events, invitations, users)

### Testing Priorities

1. **Critical Path**: User sync, event creation, invitation access (highest priority)
2. **Security**: Authorization checks, token validation, webhook signature verification
3. **Data Integrity**: Uniqueness constraints, referential integrity, soft deletion
4. **Edge Cases**: Empty fields, special characters, concurrent operations
5. **Performance**: Query optimization, response times (lower priority for initial implementation)
