# Implementation Plan: Sanity Backend Integration

## Overview

Este plan de implementación describe las tareas necesarias para integrar Sanity.io como backend con Clerk para autenticación en la plataforma de invitaciones digitales. Las tareas están organizadas en orden incremental, construyendo funcionalidad paso a paso con validación continua.

## Tasks

- [x] 1. Setup Sanity Project and Configuration
  - Crear proyecto en Sanity.io
  - Instalar dependencias de Sanity (`@sanity/client`, `@sanity/image-url`, `next-sanity`)
  - Configurar variables de entorno (SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN)
  - Crear archivo de configuración `lib/sanity.ts` con cliente de Sanity
  - _Requirements: 1.1, 2.1, 3.1_

- [x] 2. Define Sanity Schemas
  - [x] 2.1 Create User Schema
    - Crear archivo `sanity/schemas/user.ts` con todos los campos definidos en el diseño
    - Implementar validaciones de clerkId y email
    - _Requirements: 1.4, 1.5_

  - [x] 2.2 Create Event Schema
    - Crear archivo `sanity/schemas/event.ts` con todos los campos definidos en el diseño
    - Implementar validación de template y eventType
    - Configurar generación automática de slug
    - _Requirements: 2.2, 8.1, 10.1_

  - [x] 2.3 Create Invitation Schema
    - Crear archivo `sanity/schemas/invitation.ts` con todos los campos definidos en el diseño
    - Implementar validación de token y rsvpStatus
    - _Requirements: 3.2, 5.1_

  - [x] 2.4 Configure Sanity Studio
    - Crear archivo `sanity/schema.ts` que exporte todos los schemas
    - Configurar `sanity.config.ts` para el Studio
    - _Requirements: 1.1, 2.1, 3.1_

- [ ]* 2.5 Write property tests for schema validation
  - **Property 5: User document structure**
  - **Property 7: Event document structure**
  - **Property 14: Invitation document structure**
  - **Validates: Requirements 1.4, 2.2, 3.2**

- [ ] 3. Implement Utility Functions
  - [x] 3.1 Create token generation utility
    - Crear archivo `lib/utils/token.ts`
    - Implementar función `generateToken()` usando crypto.randomBytes
    - Asegurar tokens de al menos 32 caracteres
    - _Requirements: 3.1, 3.4_

  - [ ]* 3.2 Write property test for token generation
    - **Property 13: Invitation token generation and uniqueness**
    - **Validates: Requirements 3.1, 3.3, 3.4**

  - [x] 3.3 Create slug generation utility
    - Crear archivo `lib/utils/slug.ts`
    - Implementar función `generateSlug()` que normalice títulos
    - Remover caracteres especiales, convertir a lowercase, reemplazar espacios con guiones
    - _Requirements: 2.6, 10.4_

  - [ ]* 3.4 Write property test for slug generation
    - **Property 11: Slug generation and uniqueness**
    - **Validates: Requirements 2.6, 10.2, 10.4, 10.5**

- [ ] 4. Checkpoint - Verify utilities and schemas
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement Clerk Webhook Handler
  - [x] 5.1 Create webhook API route
    - Crear archivo `app/api/webhooks/clerk/route.ts`
    - Implementar verificación de firma con svix
    - Implementar manejo de eventos user.created, user.updated, user.deleted
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 5.2 Implement user creation logic
    - Crear documento user en Sanity cuando se recibe user.created
    - Mapear campos de Clerk a campos de Sanity
    - _Requirements: 1.1, 6.1_

  - [ ]* 5.3 Write property test for user creation
    - **Property 1: User creation from webhook**
    - **Validates: Requirements 1.1, 6.1**

  - [x] 5.4 Implement user update logic
    - Actualizar documento user en Sanity cuando se recibe user.updated
    - Actualizar timestamp updatedAt
    - _Requirements: 1.2, 6.2_

  - [ ]* 5.5 Write property test for user update
    - **Property 2: User update from webhook**
    - **Validates: Requirements 1.2, 6.2**

  - [x] 5.6 Implement user deletion logic
    - Marcar usuario como inactivo (soft delete) cuando se recibe user.deleted
    - _Requirements: 1.3, 6.3_

  - [ ]* 5.7 Write property test for user soft deletion
    - **Property 3: User soft deletion from webhook**
    - **Validates: Requirements 1.3, 6.3**

  - [ ]* 5.8 Write property tests for webhook responses
    - **Property 24: Webhook success response**
    - **Property 25: Webhook failure response**
    - **Validates: Requirements 6.5, 6.6**

- [ ] 6. Checkpoint - Verify webhook integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement Events API
  - [x] 7.1 Create GET /api/events route
    - Crear archivo `app/api/events/route.ts`
    - Implementar autenticación con Clerk
    - Consultar eventos del usuario autenticado usando GROQ
    - Filtrar eventos archivados
    - _Requirements: 2.3, 9.5_

  - [ ]* 7.2 Write property test for event ownership filtering
    - **Property 8: Event ownership filtering**
    - **Validates: Requirements 2.3, 9.5**

  - [x] 7.3 Create POST /api/events route
    - Implementar creación de eventos
    - Generar slug único usando utility
    - Vincular evento con usuario autenticado
    - _Requirements: 2.1, 2.6_

  - [ ]* 7.4 Write property test for event creation
    - **Property 6: Event creation with owner linkage**
    - **Validates: Requirements 2.1**

  - [x] 7.5 Create PATCH /api/events/[id] route
    - Implementar actualización de eventos
    - Verificar autorización (ownership)
    - _Requirements: 2.4, 7.1_

  - [ ]* 7.6 Write property test for event update authorization
    - **Property 9: Event update authorization**
    - **Validates: Requirements 2.4, 7.1**

  - [x] 7.7 Create DELETE /api/events/[id] route
    - Implementar soft delete (marcar como archivado)
    - Verificar autorización
    - _Requirements: 2.5_

  - [ ]* 7.8 Write property test for event soft deletion
    - **Property 10: Event soft deletion**
    - **Validates: Requirements 2.5**

- [ ] 8. Implement Event Access by Slug
  - [x] 8.1 Create GET /api/events/slug/[slug] route
    - Consultar evento por slug usando GROQ
    - Retornar evento completo
    - _Requirements: 10.3_

  - [ ]* 8.2 Write property test for slug access
    - **Property 12: Event access by slug**
    - **Validates: Requirements 10.3**

- [ ] 9. Checkpoint - Verify events API
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement Invitations API
  - [x] 10.1 Create POST /api/invitations route
    - Implementar creación de invitaciones
    - Generar token único usando utility
    - Verificar que el evento pertenece al usuario autenticado
    - _Requirements: 3.1, 3.5_

  - [ ]* 10.2 Write property test for invitation creation
    - **Property 15: Multiple invitations per event**
    - **Validates: Requirements 3.5**

  - [x] 10.3 Create GET /api/events/[id]/invitations route
    - Consultar todas las invitaciones de un evento
    - Verificar autorización (ownership del evento)
    - Incluir conteos de RSVP
    - _Requirements: 5.5_

  - [ ]* 10.4 Write property test for RSVP aggregation
    - **Property 22: RSVP aggregation**
    - **Validates: Requirements 5.5**

- [ ] 11. Implement Guest Invitation Access
  - [x] 11.1 Create GET /api/guest/invitation/[token] route
    - Consultar invitación por token usando GROQ
    - Poblar datos del evento (usar GROQ projection)
    - Actualizar lastAccessedAt
    - No requiere autenticación
    - _Requirements: 4.1, 4.4, 4.5_

  - [ ]* 11.2 Write property test for guest access with valid token
    - **Property 16: Guest access with valid token**
    - **Validates: Requirements 4.1, 4.4**

  - [ ]* 11.3 Write property test for guest access with invalid token
    - **Property 17: Guest access with invalid token**
    - **Validates: Requirements 4.2**

  - [ ]* 11.4 Write property test for last access tracking
    - **Property 18: Last access tracking**
    - **Validates: Requirements 4.5**

- [ ] 12. Implement RSVP Management
  - [x] 12.1 Create POST /api/guest/rsvp route
    - Validar token de invitación
    - Actualizar rsvpStatus (confirmed/declined)
    - Actualizar rsvpDate con timestamp actual
    - No requiere autenticación
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 12.2 Write property test for RSVP confirmation
    - **Property 19: RSVP confirmation**
    - **Validates: Requirements 5.1, 5.4**

  - [ ]* 12.3 Write property test for RSVP declination
    - **Property 20: RSVP declination**
    - **Validates: Requirements 5.2, 5.4**

  - [ ]* 12.4 Write property test for RSVP mutability
    - **Property 21: RSVP mutability**
    - **Validates: Requirements 5.3**

- [ ] 13. Checkpoint - Verify invitations and RSVP
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Implement Authorization and Security
  - [ ] 14.1 Create auth middleware
    - Crear archivo `lib/middleware/auth.ts`
    - Implementar verificación de Clerk authentication
    - Implementar verificación de ownership para recursos
    - _Requirements: 7.1, 7.3_

  - [ ]* 14.2 Write property test for unauthorized access rejection
    - **Property 26: Unauthorized access rejection**
    - **Validates: Requirements 7.3**

  - [ ] 14.3 Implement token validation for guest routes
    - Crear función de validación de tokens
    - Aplicar en todas las rutas de guest
    - _Requirements: 7.4_

  - [ ]* 14.4 Write property test for token validation
    - **Property 27: Token validation on guest requests**
    - **Validates: Requirements 7.4**

- [ ] 15. Implement Template Validation
  - [ ] 15.1 Add template validation to event creation/update
    - Validar que template sea uno de los valores permitidos
    - Retornar error descriptivo si es inválido
    - _Requirements: 8.4_

  - [ ]* 15.2 Write property test for template validation
    - **Property 28: Template selection validation**
    - **Validates: Requirements 8.4**

  - [ ]* 15.3 Write property test for template update
    - **Property 29: Template update persistence**
    - **Validates: Requirements 8.5**

- [ ] 16. Implement Error Handling
  - [ ] 16.1 Create error handler utilities
    - Crear archivo `lib/utils/errors.ts`
    - Implementar funciones para cada tipo de error (401, 403, 404, 409, 500)
    - Incluir logging de errores
    - _Requirements: All_

  - [ ] 16.2 Apply error handling to all API routes
    - Envolver lógica de rutas en try-catch
    - Retornar respuestas de error consistentes
    - _Requirements: All_

  - [ ]* 16.3 Write unit tests for error responses
    - Test que cada tipo de error retorna el código HTTP correcto
    - Test que los mensajes de error son descriptivos
    - _Requirements: All_

- [ ] 17. Setup Clerk Integration
  - [x] 17.1 Install and configure Clerk
    - Instalar `@clerk/nextjs`
    - Configurar variables de entorno (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_WEBHOOK_SECRET)
    - Configurar ClerkProvider en layout
    - _Requirements: 1.1, 6.1_

  - [x] 17.2 Configure Clerk webhooks
    - Configurar webhook endpoint en Clerk dashboard
    - Seleccionar eventos: user.created, user.updated, user.deleted
    - Copiar webhook secret a variables de entorno
    - _Requirements: 6.1, 6.2, 6.3_

- [ ] 18. Create GROQ Query Utilities
  - [ ] 18.1 Create query helpers
    - Crear archivo `lib/queries/events.ts` con queries GROQ para eventos
    - Crear archivo `lib/queries/invitations.ts` con queries GROQ para invitaciones
    - Crear archivo `lib/queries/users.ts` con queries GROQ para usuarios
    - Usar proyecciones para retornar solo campos necesarios
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ]* 18.2 Write unit tests for GROQ queries
    - Test que queries retornan estructura esperada
    - Test que filtros funcionan correctamente
    - _Requirements: 9.1, 9.2, 9.3_

- [ ] 19. Implement ClerkId Uniqueness Validation
  - [ ] 19.1 Add uniqueness check to user creation
    - Antes de crear usuario, verificar que clerkId no existe
    - Retornar error 409 si ya existe
    - _Requirements: 1.5_

  - [ ]* 19.2 Write property test for clerkId uniqueness
    - **Property 4: ClerkId uniqueness**
    - **Validates: Requirements 1.5**

- [ ] 20. Final Integration Testing
  - [ ]* 20.1 Write integration test for organizer flow
    - Test completo: Register → Create Event → Create Invitations → View RSVPs
    - _Requirements: All organizer requirements_

  - [ ]* 20.2 Write integration test for guest flow
    - Test completo: Access Invitation → View Event → Confirm RSVP
    - _Requirements: All guest requirements_

  - [ ]* 20.3 Write integration test for webhook flow
    - Test completo: Clerk webhook → User created/updated in Sanity
    - _Requirements: 1.1, 1.2, 1.3, 6.1, 6.2, 6.3_

- [ ] 21. Documentation and Deployment Preparation
  - [ ] 21.1 Create API documentation
    - Documentar todos los endpoints con ejemplos
    - Documentar estructura de requests y responses
    - Documentar códigos de error

  - [ ] 21.2 Create environment variables template
    - Crear archivo `.env.example` con todas las variables necesarias
    - Documentar cómo obtener cada valor

  - [ ] 21.3 Update README with setup instructions
    - Instrucciones para configurar Sanity
    - Instrucciones para configurar Clerk
    - Instrucciones para ejecutar el proyecto localmente

- [ ] 22. Final Checkpoint - Complete System Verification
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all requirements are implemented
  - Verify all properties are tested

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- All tests should use Sanity test dataset to avoid polluting production data
