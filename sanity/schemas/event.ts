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
      validation: (Rule) => Rule.required().min(3).max(100),
      description: 'Event title',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly identifier for the event',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Event description',
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
          { title: 'Otro', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Type of event',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'Date and time of the event',
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
          { title: 'Template 4 - XV Años Minimalista', value: 'isla/4' },
          { title: 'Template 5 - Moderno Gradiente', value: 'isla/5' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Visual template for the invitation',
    }),
    
    // NUEVA SECCIÓN: Personalización de Diseño
    defineField({
      name: 'theme',
      title: 'Tema de Colores',
      type: 'object',
      fields: [
        {
          name: 'colorScheme',
          title: 'Esquema de Colores',
          type: 'string',
          options: {
            list: [
              { title: '🌈 Arcoíris (Índigo-Púrpura-Rosa)', value: 'rainbow' },
              { title: '💙 Azul Océano', value: 'ocean' },
              { title: '💜 Púrpura Real', value: 'purple' },
              { title: '💗 Rosa Romántico', value: 'pink' },
              { title: '🧡 Naranja Cálido', value: 'orange' },
              { title: '💚 Verde Esmeralda', value: 'green' },
              { title: '❤️ Rojo Pasión', value: 'red' },
              { title: '🖤 Elegante Negro', value: 'black' },
              { title: '🤍 Blanco Puro', value: 'white' },
              { title: '🌅 Atardecer (Naranja-Rosa)', value: 'sunset' },
              { title: '🌊 Tropical (Turquesa-Verde)', value: 'tropical' },
              { title: '🌸 Primavera (Rosa-Amarillo)', value: 'spring' },
            ],
            layout: 'dropdown',
          },
          initialValue: 'rainbow',
          description: 'Selecciona el esquema de colores del fondo',
        },
        {
          name: 'fontFamily',
          title: 'Fuente Tipográfica',
          type: 'string',
          options: {
            list: [
              { title: 'Sans Serif - Moderna y Limpia (Default)', value: 'sans' },
              { title: 'Serif - Formal y Elegante', value: 'serif' },
              { title: 'Playfair Display - Elegante y Sofisticada', value: 'playfair' },
              { title: 'Dancing Script - Cursiva Romántica', value: 'dancing' },
              { title: 'Pacifico - Divertida y Casual', value: 'pacifico' },
              { title: 'Bebas Neue - Moderna y Audaz', value: 'bebas' },
              { title: 'Montserrat - Profesional y Versátil', value: 'montserrat' },
              { title: 'Great Vibes - Cursiva Elegante', value: 'greatvibes' },
              { title: 'Lobster - Divertida y Llamativa', value: 'lobster' },
              { title: 'Raleway - Minimalista y Moderna', value: 'raleway' },
            ],
            layout: 'dropdown',
          },
          initialValue: 'sans',
          description: 'Selecciona la fuente para toda la invitación',
        },
      ],
      description: 'Personaliza los colores y fuentes de tu invitación',
    }),
    
    // NUEVA SECCIÓN: Imágenes y Multimedia
    defineField({
      name: 'heroImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        }
      ],
      description: 'Imagen principal del evento',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Descripción',
            }
          ],
        },
      ],
      description: 'Galería de fotos del evento',
    }),
    defineField({
      name: 'backgroundMusic',
      title: 'Música de Fondo',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      description: 'Archivo de música de fondo (MP3, WAV, etc.)',
    }),
    
    // NUEVA SECCIÓN: Contador
    defineField({
      name: 'showCountdown',
      title: 'Mostrar Contador',
      type: 'boolean',
      initialValue: true,
      description: 'Mostrar contador regresivo',
    }),
    
    // NUEVA SECCIÓN: Itinerario
    defineField({
      name: 'itinerary',
      title: 'Itinerario',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'time', title: 'Hora', type: 'string' },
            { name: 'activity', title: 'Actividad', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 2 },
            { name: 'icon', title: 'Emoji/Icono', type: 'string' },
          ],
        },
      ],
      description: 'Cronograma de actividades del evento',
    }),
    
    // NUEVA SECCIÓN: Padres y Padrinos
    defineField({
      name: 'parents',
      title: 'Padres',
      type: 'object',
      fields: [
        { name: 'father', title: 'Padre', type: 'string' },
        { name: 'mother', title: 'Madre', type: 'string' },
      ],
      description: 'Nombres de los padres',
    }),
    defineField({
      name: 'godparents',
      title: 'Padrinos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', title: 'Tipo', type: 'string', description: 'Ej: Padrinos de Velación' },
            { name: 'name', title: 'Nombre', type: 'string' },
          ],
        },
      ],
      description: 'Lista de padrinos',
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
        { name: 'time', title: 'Hora de Inicio', type: 'string', description: 'Ej: 4:00 PM' },
        { name: 'coordinates', title: 'Coordinates', type: 'geopoint' },
      ],
      description: 'Main event location',
    }),
    defineField({
      name: 'ceremonyLocation',
      title: 'Ceremony Location',
      type: 'object',
      fields: [
        { name: 'venueName', title: 'Venue Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'time', title: 'Time', type: 'string' },
      ],
      description: 'Ceremony location (optional)',
    }),
    defineField({
      name: 'receptionLocation',
      title: 'Reception Location',
      type: 'object',
      fields: [
        { name: 'venueName', title: 'Venue Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'time', title: 'Time', type: 'string' },
      ],
      description: 'Reception location (optional)',
    }),
    
    // NUEVA SECCIÓN: Mesa de Regalos
    defineField({
      name: 'giftRegistry',
      title: 'Mesa de Regalos',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Habilitada',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Mensaje',
          type: 'text',
          rows: 3,
          description: 'Mensaje personalizado para la mesa de regalos',
        },
        {
          name: 'stores',
          title: 'Tiendas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Nombre de la Tienda', type: 'string' },
                { name: 'code', title: 'Código de Registro', type: 'string' },
                { name: 'url', title: 'URL', type: 'url' },
              ],
            },
          ],
        },
        {
          name: 'cashGift',
          title: 'Regalo en Efectivo',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Habilitado', type: 'boolean' },
            { name: 'bankName', title: 'Banco', type: 'string' },
            { name: 'accountNumber', title: 'Número de Cuenta', type: 'string' },
            { name: 'clabe', title: 'CLABE', type: 'string' },
            { name: 'accountHolder', title: 'Titular', type: 'string' },
          ],
        },
      ],
      description: 'Configuración de mesa de regalos',
    }),
    
    defineField({
      name: 'customImages',
      title: 'Custom Images',
      type: 'object',
      fields: [
        { name: 'heroImage', title: 'Hero Image', type: 'url' },
        {
          name: 'galleryImages',
          title: 'Gallery Images',
          type: 'array',
          of: [{ type: 'url' }],
        },
      ],
      description: 'Custom images for the invitation',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
      ],
      description: 'Contact information for RSVP',
    }),
    
    // NUEVA SECCIÓN: Confirmación de Asistencia
    defineField({
      name: 'rsvpEnabled',
      title: 'Habilitar Confirmación de Asistencia',
      type: 'boolean',
      initialValue: true,
      description: 'Permitir que los invitados confirmen su asistencia',
    }),
    defineField({
      name: 'rsvpDeadline',
      title: 'Fecha Límite para Confirmar',
      type: 'date',
      description: 'Fecha límite para confirmar asistencia',
    }),
    
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
      description: 'User who created this event',
    }),
    defineField({
      name: 'ownerClerkId',
      title: 'Owner Clerk ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Clerk ID of the event owner (denormalized for faster queries)',
    }),
    defineField({
      name: 'isArchived',
      title: 'Is Archived',
      type: 'boolean',
      initialValue: false,
      description: 'Whether the event is archived (soft delete)',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'Timestamp when event was created',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'Timestamp when event was last updated',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eventType',
      date: 'eventDate',
    },
    prepare(selection) {
      const { title, subtitle, date } = selection
      return {
        title: title || 'Untitled Event',
        subtitle: `${subtitle || 'Unknown type'} - ${
          date ? new Date(date).toLocaleDateString() : 'No date'
        }`,
      }
    },
  },
})
