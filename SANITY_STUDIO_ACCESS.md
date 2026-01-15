# 🎨 Acceso a Sanity Studio

## 📍 Opciones de Acceso

### Opción 1: Desde tu Dominio (Recomendado)
```
https://enviaubi.com/studio
```
Esta ruta te redirigirá automáticamente al Studio hospedado por Sanity.

### Opción 2: Acceso Directo a Sanity
```
https://mandaubi.sanity.studio
```
Acceso directo al Studio hospedado por Sanity (requiere deployment).

### Opción 3: Desarrollo Local
```bash
npm run sanity
```
Luego visita: `http://localhost:3333`

## 🚀 Desplegar Sanity Studio

### Método 1: Desde Sanity Dashboard (Más Fácil)

1. Ve a https://www.sanity.io/manage
2. Selecciona tu proyecto: **Invitaciones Digitales** (b0omcq87)
3. Ve a la sección "Studio"
4. Haz clic en "Deploy Studio"
5. Sigue las instrucciones

### Método 2: Desde CLI (Requiere Fix)

Actualmente hay un problema de compatibilidad con React 18. Para solucionarlo:

```bash
# Temporal: Downgrade a React 17 solo para deployment
npm install --save-dev react@17 react-dom@17

# Desplegar
npm run sanity:deploy

# Restaurar React 18
npm install react@18 react-dom@18
```

## 🔐 Autenticación

### Primera Vez
1. Visita el Studio
2. Haz clic en "Sign in"
3. Usa tu cuenta de Google/GitHub/Email
4. Sanity te dará acceso automáticamente

### Usuarios Adicionales
Para agregar más usuarios:
1. Ve a https://www.sanity.io/manage
2. Selecciona tu proyecto
3. Ve a "Members"
4. Invita usuarios por email

## 📝 Gestión de Contenido

### Crear Evento
1. Accede al Studio
2. Haz clic en "Event" en el menú lateral
3. Clic en "Create new Event"
4. Llena los campos:
   - **Title**: Nombre del evento
   - **Slug**: URL corta (ej: `DiegoCruz`)
   - **Event Type**: Tipo de evento
   - **Event Date**: Fecha y hora
   - **Template**: Selecciona `isla/5`
   - **Theme**: Colores y fuente
   - **Location**: Dirección y coordenadas
   - **Hero Image**: Imagen principal
   - **Gallery**: Fotos adicionales
   - **Background Music**: Audio de fondo
   - **Itinerary**: Cronograma
   - **Parents/Godparents**: Información familiar
   - **Gift Registry**: Mesa de regalos
   - **RSVP**: Configuración de confirmaciones
5. Haz clic en "Publish"

### Crear Invitación
1. En el Studio, ve a "Invitation"
2. Clic en "Create new Invitation"
3. Selecciona el evento
4. Ingresa nombre del invitado
5. Número de invitados
6. El token se genera automáticamente
7. Haz clic en "Publish"

### Ver URL Corta
Después de crear el evento:
```
https://enviaubi.com/[slug]
```
Ejemplo: `https://enviaubi.com/DiegoCruz`

## 🔧 Configuración Actual

### Proyecto Sanity
- **Project ID**: b0omcq87
- **Dataset**: production
- **API Version**: 2024-01-01
- **CDN**: Habilitado ✅

### URLs
- **Studio Local**: http://localhost:3333
- **Studio Producción**: https://mandaubi.sanity.studio (requiere deployment)
- **Redirect**: https://enviaubi.com/studio
- **Dashboard**: https://www.sanity.io/manage

## 🐛 Troubleshooting

### No puedo acceder al Studio
1. Verifica que estés logueado en Sanity
2. Verifica que tengas permisos en el proyecto
3. Intenta limpiar caché del navegador

### Cambios no se ven en producción
1. Asegúrate de hacer clic en "Publish" (no solo guardar)
2. Espera 60 segundos para propagación del CDN
3. Limpia caché del navegador

### Error al desplegar Studio
Usa el Método 1 (Sanity Dashboard) que es más confiable.

## 📱 Acceso Móvil

El Studio funciona en móviles pero es mejor usar desktop para:
- Subir imágenes
- Editar contenido extenso
- Configuración avanzada

## 🎯 Próximos Pasos

1. **Desplegar Studio**: Usa Sanity Dashboard
2. **Crear Eventos**: Usa el Studio
3. **Compartir URLs**: Usa las URLs cortas
4. **Monitorear**: Revisa analytics en Vercel

---

**Acceso Rápido**: https://enviaubi.com/studio 🚀
