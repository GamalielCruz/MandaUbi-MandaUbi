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
      validation: (Rule) =>
        Rule.required().custom((clerkId) => {
          // Validación de formato de clerkId
          if (typeof clerkId !== 'string' || !clerkId.startsWith('user_')) {
            return 'Invalid Clerk ID format. Must start with "user_"'
          }
          if (clerkId.length < 10) {
            return 'Clerk ID is too short'
          }
          return true
        }),
      description: 'Unique identifier from Clerk authentication service',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      description: 'User email address',
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      description: 'User first name',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      description: 'User last name',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'url',
      description: 'URL to user profile image',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether the user account is active',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'Timestamp when user was created',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'Timestamp when user was last updated',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'clerkId',
      media: 'profileImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'No email',
        subtitle: subtitle || 'No Clerk ID',
      }
    },
  },
})
