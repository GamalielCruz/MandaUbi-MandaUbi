# Requirements Document

## Introduction

Este documento define los requerimientos para la integración de un backend completo usando Sanity.io como CMS y base de datos, junto con Clerk para la gestión de autenticación y usuarios, en una plataforma de invitaciones digitales a eventos. El sistema permitirá a organizadores crear y gestionar eventos e invitaciones, mientras que los invitados podrán acceder a sus invitaciones mediante tokens únicos sin necesidad de autenticación.

## Glossary

- **System**: La plataforma completa de invitaciones digitales
- **Sanity**: El CMS headless y base de datos que almacena todos los datos del sistema
- **Clerk**: El servicio de autenticación que gestiona identidades de usuarios organizadores
- **Organizer**: Usuario autenticado que crea y gestiona eventos e invitaciones
- **Guest**: Persona que recibe una invitación y puede acceder mediante token único
- **Event**: Un evento (boda, XV años, cumpleaños, etc.) creado por un organizador
- **Invitation**: Una invitación específica asociada a un evento y enviada a un invitado
- **Template**: Plantilla visual predefinida para renderizar invitaciones (isla/0, isla/1, etc.)
- **ClerkId**: Identificador único de usuario proporcionado por Clerk
- **Token**: Cadena única y segura que permite acceso a una invitación sin autenticación
- **RSVP**: Confirmación de asistencia de un invitado
- **Webhook**: Endpoint HTTP que recibe notificaciones de eventos de Clerk
- **GROQ**: Lenguaje de consulta de Sanity para recuperar datos

## Requirements

### Requirement 1: User Profile Management

**User Story:** Como organizador, quiero que mi perfil se sincronice automáticamente con Sanity cuando me registro en Clerk, para que mis datos estén disponibles en el sistema.

#### Acceptance Criteria

1. WHEN un usuario se registra en Clerk, THE System SHALL crear automáticamente un documento de tipo `user` en Sanity con el clerkId
2. WHEN un usuario actualiza su perfil en Clerk, THE System SHALL actualizar el documento correspondiente en Sanity
3. WHEN un usuario se elimina de Clerk, THE System SHALL marcar el documento como inactivo en Sanity
4. THE User_Document SHALL almacenar clerkId, email, nombre, fecha de creación y estado
5. THE System SHALL validar que el clerkId sea único en Sanity

### Requirement 2: Event Creation and Management

**User Story:** Como organizador autenticado, quiero crear y gestionar eventos, para poder organizar mis celebraciones digitales.

#### Acceptance Criteria

1. WHEN un organizador crea un evento, THE System SHALL almacenar el evento en Sanity vinculado a su clerkId
2. THE Event_Document SHALL incluir título, descripción, fecha, ubicación, tipo de evento, template seleccionado y slug único
3. WHEN un organizador solicita sus eventos, THE System SHALL retornar solo los eventos donde él es el propietario
4. WHEN un organizador actualiza un evento, THE System SHALL verificar que el clerkId coincida con el propietario
5. WHEN un organizador elimina un evento, THE System SHALL marcar el evento como archivado sin eliminarlo físicamente
6. THE System SHALL generar automáticamente un slug único basado en el título del evento

### Requirement 3: Invitation Creation and Token Generation

**User Story:** Como organizador, quiero crear invitaciones para mis eventos con tokens únicos, para que los invitados puedan acceder sin necesidad de cuenta.

#### Acceptance Criteria

1. WHEN un organizador crea una invitación, THE System SHALL generar un token único y seguro
2. THE Invitation_Document SHALL incluir referencia al evento, nombre del invitado, email opcional, teléfono opcional, token único y estado de RSVP
3. THE System SHALL validar que el token sea único en toda la base de datos
4. WHEN se genera un token, THE System SHALL usar un algoritmo criptográficamente seguro
5. THE System SHALL permitir crear múltiples invitaciones para un mismo evento

### Requirement 4: Guest Access via Token

**User Story:** Como invitado, quiero acceder a mi invitación usando un token único, para ver los detalles del evento sin necesidad de crear una cuenta.

#### Acceptance Criteria

1. WHEN un invitado accede con un token válido, THE System SHALL retornar la invitación completa con datos del evento
2. WHEN un invitado accede con un token inválido, THE System SHALL retornar un error descriptivo
3. THE System SHALL permitir acceso de solo lectura a invitados no autenticados
4. THE System SHALL incluir en la respuesta: datos del evento, template, ubicación, fecha y estado de RSVP
5. THE System SHALL registrar el último acceso del invitado mediante el token

### Requirement 5: RSVP Management

**User Story:** Como invitado, quiero confirmar o declinar mi asistencia, para que el organizador sepa si asistiré al evento.

#### Acceptance Criteria

1. WHEN un invitado confirma asistencia, THE System SHALL actualizar el estado de RSVP a "confirmed"
2. WHEN un invitado declina asistencia, THE System SHALL actualizar el estado de RSVP a "declined"
3. THE System SHALL permitir cambiar el estado de RSVP múltiples veces
4. THE System SHALL registrar la fecha y hora de cada cambio de estado
5. WHEN un organizador consulta RSVPs, THE System SHALL retornar el conteo de confirmados, declinados y pendientes

### Requirement 6: Clerk Webhook Integration

**User Story:** Como sistema, quiero recibir webhooks de Clerk, para mantener sincronizados los datos de usuarios entre Clerk y Sanity.

#### Acceptance Criteria

1. WHEN Clerk envía un webhook de `user.created`, THE System SHALL crear un nuevo documento user en Sanity
2. WHEN Clerk envía un webhook de `user.updated`, THE System SHALL actualizar el documento user correspondiente en Sanity
3. WHEN Clerk envía un webhook de `user.deleted`, THE System SHALL marcar el usuario como inactivo en Sanity
4. THE System SHALL verificar la firma del webhook para validar autenticidad
5. THE System SHALL responder con código 200 a webhooks procesados exitosamente
6. IF el procesamiento falla, THEN THE System SHALL responder con código 500 y registrar el error

### Requirement 7: Authorization and Security

**User Story:** Como sistema, quiero asegurar que solo los propietarios puedan editar sus eventos, mientras que los invitados solo puedan ver sus invitaciones.

#### Acceptance Criteria

1. WHEN un organizador intenta editar un evento, THE System SHALL verificar que su clerkId coincida con el propietario
2. WHEN un invitado accede con token, THE System SHALL permitir solo operaciones de lectura y actualización de RSVP
3. THE System SHALL rechazar intentos de acceso no autorizados con código 403
4. THE System SHALL validar tokens en cada solicitud de invitado
5. THE System SHALL usar variables de entorno para credenciales sensibles de Sanity y Clerk

### Requirement 8: Template Association

**User Story:** Como organizador, quiero seleccionar una plantilla visual para mi evento, para que las invitaciones se muestren con el diseño elegido.

#### Acceptance Criteria

1. WHEN un organizador crea un evento, THE System SHALL permitir seleccionar un template de la lista disponible
2. THE System SHALL almacenar la referencia del template (isla/0, isla/1, isla/2, isla/4) en el evento
3. WHEN un invitado accede a su invitación, THE System SHALL retornar el template asociado al evento
4. THE System SHALL validar que el template seleccionado exista en el sistema
5. THE System SHALL permitir cambiar el template de un evento existente

### Requirement 9: Data Querying with GROQ

**User Story:** Como desarrollador, quiero consultas GROQ optimizadas, para recuperar datos eficientemente desde Sanity.

#### Acceptance Criteria

1. THE System SHALL usar GROQ para consultar eventos de un organizador específico
2. THE System SHALL usar GROQ para consultar invitaciones de un evento con datos poblados del evento
3. THE System SHALL usar GROQ para consultar una invitación por token incluyendo datos del evento
4. THE System SHALL usar proyecciones GROQ para retornar solo los campos necesarios
5. THE System SHALL usar filtros GROQ para excluir documentos archivados o inactivos

### Requirement 10: Slug-based URL Generation

**User Story:** Como organizador, quiero que mis eventos tengan URLs amigables basadas en slugs, para compartir enlaces legibles.

#### Acceptance Criteria

1. WHEN se crea un evento, THE System SHALL generar un slug único basado en el título
2. THE System SHALL validar que el slug sea único antes de crear el evento
3. THE System SHALL permitir acceso a eventos mediante slug en lugar de ID
4. THE System SHALL normalizar slugs removiendo caracteres especiales y espacios
5. IF un slug ya existe, THEN THE System SHALL agregar un sufijo numérico para hacerlo único

### Requirement 11: Event Data Persistence

**User Story:** Como organizador, quiero que todos los datos de mi evento se almacenen de forma estructurada, para poder recuperarlos y editarlos posteriormente.

#### Acceptance Criteria

1. THE Event_Document SHALL almacenar datos de ubicación incluyendo nombre del lugar, dirección y coordenadas opcionales
2. THE Event_Document SHALL almacenar datos de fecha y hora del evento
3. THE Event_Document SHALL almacenar configuración de mesa de regalos (opcional)
4. THE Event_Document SHALL almacenar URLs de imágenes personalizadas (opcional)
5. THE Event_Document SHALL almacenar datos de contacto del organizador para confirmaciones

### Requirement 12: Invitation Data Persistence

**User Story:** Como organizador, quiero que los datos de cada invitación se almacenen completamente, para hacer seguimiento de mis invitados.

#### Acceptance Criteria

1. THE Invitation_Document SHALL almacenar nombre completo del invitado
2. THE Invitation_Document SHALL almacenar datos de contacto (email y/o teléfono)
3. THE Invitation_Document SHALL almacenar número de acompañantes permitidos
4. THE Invitation_Document SHALL almacenar notas adicionales del organizador
5. THE Invitation_Document SHALL almacenar timestamps de creación y última actualización
