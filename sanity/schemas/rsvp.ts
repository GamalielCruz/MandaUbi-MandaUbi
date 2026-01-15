import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'rsvp',
  title: 'RSVP',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
      description: 'Event this RSVP belongs to',
    }),
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Full name of the guest',
    }),
    defineField({
      name: 'attending',
      title: 'Attending',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
      description: 'Whether the guest is attending',
    }),
    defineField({
      name: 'numberOfGuests',
      title: 'Number of Guests',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.min(0).max(20),
      description: 'Number of guests attending',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 3,
      description: 'Optional message from the guest',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'Timestamp when RSVP was created',
    }),
  ],
  preview: {
    select: {
      title: 'guestName',
      subtitle: 'attending',
      event: 'event.title',
    },
    prepare(selection) {
      const { title, subtitle, event } = selection
      return {
        title: title || 'Unnamed Guest',
        subtitle: `${subtitle ? '✅ Asiste' : '❌ No asiste'} - ${event || 'No event'}`,
      }
    },
  },
})
