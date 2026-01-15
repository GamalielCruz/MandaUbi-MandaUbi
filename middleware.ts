import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/signin(.*)',
  '/signup(.*)',
  '/api/webhooks/clerk',
  '/api/guest/(.*)',
  '/api/events/(.*)',        // APIs de eventos públicos
  '/api/invitations/(.*)',   // APIs de invitaciones públicos
  '/api/rsvp',              // API de RSVP público
  '/invitation/(.*)',       // Páginas de invitaciones
  '/isla/(.*)',            // Plantillas de invitaciones
  '/aviso/(.*)',
  '/examples/(.*)',
  '/[^/]+',                // URLs cortas (cualquier slug de un nivel)
])

export default clerkMiddleware(async (auth, request) => {
  // Protect all routes except public ones
  if (!isPublicRoute(request)) {
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
