# 🎨 Cómo Acceder a Sanity Studio

## ✅ OPCIÓN 1: Acceso Directo (MÁS FÁCIL)

### Paso 1: Ve al Dashboard de Sanity
```
https://www.sanity.io/manage
```

### Paso 2: Inicia Sesión
- Usa tu cuenta de Google, GitHub o Email
- Si es tu primera vez, crea una cuenta

### Paso 3: Selecciona tu Proyecto
- Busca: **"Invitaciones Digitales"**
- Project ID: `b0omcq87`
- Haz clic en el proyecto

### Paso 4: Edita Contenido
Tienes dos opciones:

#### A) Usar Vision (Query Tool)
1. Clic en "Vision" en el menú lateral
2. Puedes hacer queries GROQ
3. Ver y editar datos directamente

#### B) Usar Content Studio
1. Clic en "Content" en el menú lateral
2. Verás todos tus documentos
3. Puedes crear, editar y eliminar

## 🖥️ OPCIÓN 2: Studio Local (Para Desarrollo)

### Paso 1: Abre Terminal
```bash
cd C:\Users\gamal\Downloads\MandaUbi-MandaUbi\MandaUbi-MandaUbi
```

### Paso 2: Inicia el Studio
```bash
npm run sanity
```

### Paso 3: Abre en Navegador
```
http://localhost:3333
```

## 🌐 OPCIÓN 3: Desde tu Dominio

### Actualmente:
```
https://enviaubi.com/studio
```
Esta URL te redirige al Studio hospedado por Sanity.

## 📝 Gestión de Contenido

### Crear un Nuevo Evento

1. **En Sanity Dashboard**:
   - Ve a https://www.sanity.io/manage
   - Selecciona tu proyecto
   - Clic en "Content"
   - Clic en "Event" → "Create"

2. **Campos Importantes**:
   ```
   Title: "Nombre del Evento"
   Slug: "nombreevento" (para URL corta)
   Event Type: birthday/wedding/quinceanera/baptism
   Event Date: Fecha y hora del evento
   Template: isla/5
   Theme:
     - Color Scheme: rainbow/ocean/purple/etc
     - Font Family: sans/serif/Dancing Script/etc
   Location:
     - Venue Name: Nombre del lugar
     - Address: Dirección completa
     - Coordinates: lat y lng
   Hero Image: Imagen principal
   Gallery: Fotos adicionales
   Background Music: Archivo de audio
   ```

3. **Publicar**:
   - Haz clic en "Publish" (esquina superior derecha)
   - ¡Listo! Tu evento está en línea

### Crear una Invitación

1. En Sanity, ve a "Invitation" → "Create"
2. Campos:
   ```
   Event: Selecciona el evento
   Guest Name: Nombre del invitado
   Number of Guests: Cantidad de personas
   Token: Se genera automáticamente
   ```
3. Haz clic en "Publish"

### Ver la Invitación

Después de crear el evento con slug "DiegoCruz":
```
https://enviaubi.com/DiegoCruz
```

## 🔐 Gestión de Usuarios

### Agregar Más Usuarios

1. Ve a https://www.sanity.io/manage
2. Selecciona tu proyecto
3. Clic en "Members" en el menú lateral
4. Clic en "Invite member"
5. Ingresa el email
6. Selecciona el rol:
   - **Administrator**: Acceso completo
   - **Editor**: Puede editar contenido
   - **Viewer**: Solo puede ver

## 📱 Acceso Móvil

El Dashboard de Sanity funciona en móviles:
```
https://www.sanity.io/manage
```

Pero es mejor usar desktop para:
- Subir imágenes grandes
- Editar contenido extenso
- Configuración avanzada

## 🎯 Resumen Rápido

### Para Editar Contenido HOY:
1. Ve a: https://www.sanity.io/manage
2. Inicia sesión
3. Selecciona "Invitaciones Digitales"
4. Clic en "Content"
5. ¡Edita lo que necesites!

### Para Desarrollo Local:
```bash
npm run sanity
```
Luego abre: http://localhost:3333

### Para Compartir Invitaciones:
```
https://enviaubi.com/[slug-del-evento]
```

## 🆘 ¿Necesitas Ayuda?

### No puedo iniciar sesión
- Verifica tu email
- Intenta "Forgot password"
- Usa Google/GitHub login

### No veo mi proyecto
- Verifica que estés usando la cuenta correcta
- El Project ID es: `b0omcq87`
- Contacta a quien creó el proyecto

### Cambios no se ven
- Asegúrate de hacer clic en "Publish"
- Espera 60 segundos
- Limpia caché del navegador (Ctrl + Shift + R)

---

**🚀 Acceso Rápido**: https://www.sanity.io/manage

**📧 Tu Proyecto**: Invitaciones Digitales (b0omcq87)

**🌐 Tu Sitio**: https://enviaubi.com
