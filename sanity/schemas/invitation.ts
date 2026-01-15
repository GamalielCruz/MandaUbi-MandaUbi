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
      validation: (Rule) => Rule.required(),
      description: 'Event this invitation belongs to',
    }),
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Full name of the guest',
    }),
    defineField({
      name: 'guestEmail',
      title: 'Guest Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      description: 'Guest email address (optional)',
    }),
    defineField({
      name: 'guestPhone',
      title: 'Guest Phone',
      type: 'string',
      description: 'Guest phone number (optional)',
    }),
    defineField({
      name: 'token',
      title: 'Unique Token',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((token) => {
          // Validación de formato de token
          if (typeof token !== 'string' || token.length < 32) {
            return 'Token must be at least 32 characters long'
          }
          return true
        }),
      description: 'Unique access token for this invitation',
    }),
    defineField({
      name: 'numberOfGuests',
      title: 'Number of Guests',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(20),
      description: 'Number of guests allowed with this invitation',
    }),
    defineField({
      name: 'rsvpStatus',
      title: 'RSVP Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pending' },
          { title: 'Confirmado', value: 'confirmed' },
          { title: 'Declinado', value: 'declined' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
      description: 'RSVP status of the guest',
    }),
    defineField({
      name: 'rsvpDate',
      title: 'RSVP Date',
      type: 'datetime',
      description: 'Date when guest responded to RSVP',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
      description: 'Additional notes from organizer',
    }),
    defineField({
      name: 'lastAccessedAt',
      title: 'Last Accessed At',
      type: 'datetime',
      description: 'Last time the invitation was accessed via token',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'Timestamp when invitation was created',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'Timestamp when invitation was last updated',
    }),
  ],
  preview: {
    select: {
      title: 'guestName',
      subtitle: 'rsvpStatus',
      event: 'event.title',
    },
    prepare(selection) {
      const { title, subtitle, event } = selection
      return {
        title: title || 'Unnamed Guest',
        subtitle: `${subtitle || 'pending'} - ${event || 'No event'}`,
      }
    },
  },
})
