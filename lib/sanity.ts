import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use current date for latest API version
  useCdn: true, // Always use CDN for better performance
  token: process.env.SANITY_API_TOKEN, // Required for write operations
  perspective: 'published' as const, // Only fetch published documents
}

// Create Sanity client (for server-side with token)
export const sanityClient = createClient(sanityConfig)

// Create public Sanity client (for client-side without token)
export const publicSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Always use CDN for public reads
  perspective: 'published' as const, // Only fetch published documents
})

// Helper function to generate image URLs
const builder = imageUrlBuilder(publicSanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Type-safe query helper with CDN
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  return publicSanityClient.fetch<T>(query, params)
}
