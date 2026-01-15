# 🔗 Guía de URLs Cortas - MandaUbi

## ¿Qué son las URLs Cortas?

Las URLs cortas permiten compartir invitaciones con enlaces amigables y fáciles de recordar, en lugar de URLs largas con tokens complejos.

### Antes (URL larga):
```
https://enviaubi.com/isla/5?eventId=cfb21306-411b-4a4f-afe4-c2d359e0abb2&token=bbb42af25697c0de03d7d34cf4825e09851c419335e21e633489bd15fcf97849
```

### Ahora (URL corta):
```
https://enviaubi.com/DiegoCruz
```

## 🚀 Cómo Funciona

1. **Slug Personalizado**: Cada evento tiene un slug único (ej: `DiegoCruz`)
2. **Redirección Automática**: La URL corta redirige a la invitación principal
3. **Fallback Inteligente**: Si no hay invitaciones, redirige a la plantilla del evento

## 📋 Gestión de URLs Cortas

### Crear URL Corta para Evento Existente

```bash
# Ejecutar script para generar URLs cortas
npx tsx scripts/generate-short-urls.ts
```

### Personalizar Slug en Sanity Studio

1. Ve a Sanity Studio: `http://localhost:3333`
2. Abre el evento que quieres editar
3. Modifica el campo "Slug"
4. Guarda los cambios

### Ver Todas las URLs Cortas

Visita: `https://enviaubi.com/admin/short-urls`

## 🛠️ Scripts Disponibles

### 1. Generar URLs Cortas para Todos los Eventos
```bash
npx tsx scripts/generate-short-urls.ts
```
- Crea slugs automáticos para eventos sin slug
- Evita duplicados agregando números
- Muestra resumen de todas las URLs

### 2. Actualizar Slug Específico
```bash
npx tsx scripts/update-slug.ts
```
- Actualiza el slug de un evento específico
- Útil para personalizar URLs

### 3. Crear URL Corta para Evento
```bash
npx tsx scripts/create-short-url.ts
```
- Busca evento específico y crea/muestra su URL corta

## 📊 Ejemplos de Uso

### Evento de Cumpleaños
- **Título**: "Diego - 3 Años"
- **Slug**: `DiegoCruz`
- **URL Corta**: `https://enviaubi.com/DiegoCruz`

### Evento de Boda
- **Título**: "María & Juan"
- **Slug**: `MariaYJuan`
- **URL Corta**: `https://enviaubi.com/MariaYJuan`

### Evento de XV Años
- **Título**: "XV Años de Sofía"
- **Slug**: `XVSofia`
- **URL Corta**: `https://enviaubi.com/XVSofia`

## 🔧 Configuración Técnica

### Estructura de Archivos
```
app/
├── [slug]/
│   └── page.tsx          # Página de redirección
├── api/
│   ├── events/slug/[slug]/
│   │   └── route.ts      # API para buscar por slug
│   └── admin/short-urls/
│       └── route.ts      # API para admin
└── admin/short-urls/
    └── page.tsx          # Panel de administración
```

### Flujo de Redirección

1. Usuario visita `enviaubi.com/DiegoCruz`
2. Página `[slug]` busca evento por slug
3. Si encuentra invitaciones, redirige a `/invitation/[token]`
4. Si no hay invitaciones, redirige a `/isla/5?eventId=[id]`
5. Si no encuentra evento, muestra error 404

## 📱 Beneficios

### Para Usuarios
- ✅ URLs fáciles de recordar y compartir
- ✅ Menos errores al escribir
- ✅ Más profesional y limpio
- ✅ Funciona en WhatsApp, SMS, redes sociales

### Para Administradores
- ✅ Panel de control centralizado
- ✅ Fácil gestión de múltiples eventos
- ✅ Estadísticas de invitaciones
- ✅ Personalización completa

## 🔍 Resolución de Problemas

### URL Corta No Funciona
1. Verificar que el evento tenga slug en Sanity
2. Comprobar que el evento no esté archivado
3. Revisar logs en Vercel para errores

### Slug Duplicado
- El sistema automáticamente agrega números (ej: `evento1`, `evento2`)
- Puedes personalizar manualmente en Sanity Studio

### Redirección Incorrecta
- Verificar que el evento tenga invitaciones activas
- Comprobar que la plantilla esté configurada correctamente

## 📈 Métricas y Análisis

### Información Disponible
- Número de invitaciones por evento
- Fecha de creación del evento
- Tipo de evento
- Estado de las invitaciones

### Próximas Funcionalidades
- [ ] Estadísticas de clics
- [ ] QR codes automáticos
- [ ] URLs temporales
- [ ] Análisis de compartidos

## 🎯 Mejores Prácticas

### Naming de Slugs
- **Usar nombres descriptivos**: `DiegoCruz` mejor que `evento1`
- **Evitar caracteres especiales**: Solo letras, números y guiones
- **Mantener corto**: Máximo 20 caracteres
- **Ser consistente**: Usar mismo formato para todos

### Compartir URLs
- **WhatsApp**: Funciona perfectamente con preview
- **Redes Sociales**: Se ve profesional
- **Tarjetas Físicas**: Fácil de escribir
- **QR Codes**: Ideal para imprimir

## 🚀 Deployment

Las URLs cortas funcionan automáticamente en producción. No requiere configuración adicional.

### Verificar en Producción
1. Crear evento en Sanity Studio
2. Generar slug con script
3. Probar URL: `https://enviaubi.com/[slug]`
4. Verificar redirección correcta

---

**¡Las URLs cortas están listas para usar!** 🎉

Para soporte técnico, revisa los logs en Vercel o contacta al desarrollador.