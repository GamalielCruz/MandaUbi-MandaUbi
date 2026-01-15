import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use current date for latest API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster reads
  token: process.env.SANITY_API_TOKEN, // Required for write operations
}

// Create Sanity client (for server-side with token)
export const sanityClient = createClient(sanityConfig)

// Create public Sanity client (for client-side without token)
export const publicSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for public reads
})

// Helper function to generate image URLs
const builder = imageUrlBuilder(publicSanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Type-safe query helper
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  return publicSanityClient.fetch<T>(query, params)
}
