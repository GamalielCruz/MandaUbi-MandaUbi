# 🎨 Guía Completa de Deployment de Sanity Studio

## 🎯 Resumen

Tu Studio ya está configurado y funcionando localmente. Para acceder desde cualquier lugar, necesitas desplegarlo a Sanity.

## ✅ Opción Recomendada: Usar Studio Local

**Por ahora, la forma más fácil es:**

```bash
npm run sanity
```

Luego abre: `http://localhost:3333`

Todos los cambios que hagas se sincronizan automáticamente con la base de datos de Sanity y se verán en producción.

---

## 🚀 Desplegar Studio a Sanity (Para Acceso Remoto)

### Método 1: Script Automático (Windows)

Ejecuta en PowerShell:

```powershell
npm run studio:deploy
```

Este script:
1. ✅ Instala React 17 temporalmente
2. ✅ Despliega el Studio
3. ✅ Restaura React 18
4. ✅ Todo automático

### Método 2: Manual

```bash
# 1. Instalar React 17 temporalmente
npm install --save-dev react@17 react-dom@17 --legacy-peer-deps

# 2. Desplegar
npx sanity deploy

# 3. Restaurar React 18
npm install react@18 react-dom@18 --legacy-peer-deps
```

### Durante el Deployment

Te preguntará:

1. **Hostname**: Elige un nombre único (ej: `mandaubi`, `enviaubi`)
2. **Add appId**: Presiona Enter (opcional)

El Studio estará disponible en:
```
https://[tu-hostname].sanity.studio
```

---

## 🌐 Acceso al Studio

### Opción 1: Local (Recomendado para desarrollo)
```
http://localhost:3333
```
- ✅ Más rápido
- ✅ Sin problemas de compatibilidad
- ✅ Cambios en tiempo real

### Opción 2: Remoto (Después de desplegar)
```
https://mandaubi.sanity.studio
```
- ✅ Acceso desde cualquier lugar
- ✅ Compartir con equipo
- ✅ No requiere npm run sanity

### Opción 3: Desde tu Dominio
```
https://enviaubi.com/studio
```
- ✅ Redirige automáticamente al Studio
- ✅ URL personalizada

---

## 📝 Gestión de Contenido

### Crear Evento

1. Abre el Studio (local o remoto)
2. Clic en "Event" en el menú lateral
3. Clic en "Create" (botón +)
4. Llena los campos:

```
Title: "Nombre del Evento"
Slug: "nombreevento" (para URL corta)
Event Type: birthday/wedding/quinceanera/baptism
Event Date: Fecha y hora
Template: isla/5
Theme:
  - Color Scheme: rainbow/ocean/purple/pink/etc
  - Font Family: sans/serif/Dancing Script/etc
Location:
  - Venue Name: Nombre del lugar
  - Address: Dirección completa
  - City: Ciudad
  - State: Estado
  - Coordinates: 
    - lat: 20.501721
    - lng: -100.157685
Hero Image: Subir imagen principal
Gallery: Subir fotos adicionales
Background Music: Subir archivo de audio (MP3)
Itinerary: Cronograma del evento
Parents: Nombres de los padres
Godparents: Nombres de los padrinos
Gift Registry: Mesa de regalos
RSVP: Configuración de confirmaciones
```

5. Haz clic en "Publish" (esquina superior derecha)

### Crear Invitación

1. En el Studio, clic en "Invitation"
2. Clic en "Create"
3. Campos:
```
Event: Selecciona el evento
Guest Name: Nombre del invitado
Number of Guests: Cantidad de personas
Token: Se genera automáticamente
```
4. Haz clic en "Publish"

### Ver la Invitación

URL corta:
```
https://enviaubi.com/[slug-del-evento]
```

Ejemplo:
```
https://enviaubi.com/DiegoCruz
```

---

## 🔧 Configuración de CORS

Si tienes problemas de acceso, agrega tu dominio a CORS:

1. Ve a https://www.sanity.io/manage
2. Selecciona tu proyecto "EnviaUbi"
3. Clic en "API" en el menú
4. En "CORS Origins", agrega:
   - `https://enviaubi.com`
   - `https://mandaubi.sanity.studio`
   - `http://localhost:3333` (para desarrollo)

---

## 🐛 Troubleshooting

### Error al Desplegar

**Problema**: `Package subpath './compiler-runtime' is not defined`

**Solución**: Usa el script `npm run studio:deploy` que maneja esto automáticamente.

### Studio No Carga

**Problema**: Página en blanco o error 404

**Soluciones**:
1. Verifica que desplegaste con `npx sanity deploy`
2. Espera 1-2 minutos para propagación
3. Limpia caché del navegador
4. Usa el Studio local mientras tanto

### Cambios No Se Ven

**Problema**: Edité en el Studio pero no veo cambios en el sitio

**Soluciones**:
1. Asegúrate de hacer clic en "Publish" (no solo guardar)
2. Espera 60 segundos para propagación del CDN
3. Limpia caché del navegador (Ctrl + Shift + R)
4. Verifica que el evento esté publicado (no en borrador)

### No Puedo Iniciar Sesión

**Problema**: El Studio pide login

**Soluciones**:
1. Usa tu cuenta de Google/GitHub/Email
2. Verifica que tengas permisos en el proyecto
3. Contacta al administrador del proyecto

---

## 📊 Comparación de Opciones

| Característica | Local | Remoto | Desde Dominio |
|----------------|-------|--------|---------------|
| Velocidad | ⚡⚡⚡ | ⚡⚡ | ⚡⚡ |
| Acceso | Solo local | Cualquier lugar | Cualquier lugar |
| Requiere npm | Sí | No | No |
| Setup | Fácil | Medio | Automático |
| Compartir | No | Sí | Sí |

---

## 🎯 Recomendación Final

### Para Desarrollo Diario:
```bash
npm run sanity
```
Abre: `http://localhost:3333`

### Para Acceso Remoto:
```bash
npm run studio:deploy
```
Luego: `https://mandaubi.sanity.studio`

### Para Compartir con Clientes:
```
https://enviaubi.com/studio
```
(Redirige automáticamente)

---

## 📞 Soporte

- **Documentación Sanity**: https://www.sanity.io/docs
- **Dashboard**: https://www.sanity.io/manage
- **Tu Proyecto**: EnviaUbi (b0omcq87)

---

**🚀 ¡Tu sistema de invitaciones está listo!**

- ✅ URLs cortas funcionando
- ✅ Invitaciones públicas
- ✅ Studio configurado
- ✅ APIs optimizadas
- ✅ Todo en producción

**URL de ejemplo**: https://enviaubi.com/DiegoCruz 🎉
