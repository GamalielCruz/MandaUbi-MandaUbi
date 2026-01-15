import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Invitaciones Digitales',

  projectId: 'b0omcq87',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(), // Useful for testing GROQ queries
  ],

  schema: {
    types: schemaTypes,
  },
})
