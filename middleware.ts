import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/signin(.*)',
  '/signup(.*)',
  '/api/webhooks/clerk',
  '/api/guest/(.*)',
  '/api/events/(.*)',
  '/api/invitations/(.*)',
  '/api/rsvp',
  '/invitation/(.*)',
  '/isla/(.*)',
  '/aviso/(.*)',
  '/examples/(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl
  
  // Check if it's a short URL (single segment, not starting with known paths)
  const isShortUrl = /^\/[a-zA-Z0-9-_]+$/.test(pathname) && 
    !pathname.startsWith('/api') && 
    !pathname.startsWith('/signin') && 
    !pathname.startsWith('/signup') && 
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/studio')
  
  // Protect all routes except public ones and short URLs
  if (!isPublicRoute(request) && !isShortUrl) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
