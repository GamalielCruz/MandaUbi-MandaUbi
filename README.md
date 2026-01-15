# MandaUbi - Sistema de Invitaciones Digitales

Sistema moderno de invitaciones digitales con Next.js 14, Sanity CMS y Clerk Auth.

## 🎉 Características

- **Invitaciones Personalizadas**: Múltiples plantillas (isla/5 con efectos modernos)
- **Gestión de Contenido**: Sanity CMS para administrar eventos fácilmente
- **Temas Personalizables**: 12 esquemas de color y 10 fuentes diferentes
- **Efectos Visuales**: Confeti, animaciones de scroll, glassmorphism
- **Multimedia**: Galería de imágenes, música de fondo
- **RSVP**: Sistema de confirmación de asistencia
- **Responsive**: Diseño optimizado para móviles y desktop
- **Countdown Timer**: Cuenta regresiva hasta el evento
- **Integración con Mapas**: Botón directo a Google Maps
- **Calendario**: Botón para agregar evento a Google Calendar

## 🚀 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity.io
- **Autenticación**: Clerk
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion, AOS
- **Efectos**: Canvas Confetti
- **Deployment**: Vercel

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/GamalielCruz/MandaUbi-MandaUbi.git
cd MandaUbi-MandaUbi

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev

# Iniciar Sanity Studio (en otra terminal)
npm run sanity
```

## 🌐 Deployment

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas de deployment en Vercel.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GamalielCruz/MandaUbi-MandaUbi)

## 📝 Uso

### Crear un Evento

1. Accede a Sanity Studio: `http://localhost:3333`
2. Crea un nuevo evento con todos los detalles
3. Selecciona la plantilla (isla/5 recomendada)
4. Personaliza colores y fuente
5. Agrega imágenes, música, itinerario, etc.

### Crear Invitación

```bash
# Usar script para crear invitación
npm run create-invitation
```

O crear manualmente en Sanity Studio.

### Acceder a Invitación

```
https://tu-dominio.com/invitation/[token]
```

## 🎨 Plantillas Disponibles

### isla/5 (Recomendada)
- Diseño moderno con gradientes
- Efectos de glassmorphism
- Animaciones de scroll
- Countdown timer
- Galería de imágenes
- Música de fondo
- RSVP integrado
- 12 temas de color
- 10 fuentes personalizables

## 🔧 Configuración

### Variables de Entorno

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu_api_token
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_key
CLERK_SECRET_KEY=tu_clerk_secret
CLERK_WEBHOOK_SECRET=tu_webhook_secret
```

## 📱 Características de isla/5

- **Hero Section**: Imagen principal con título del evento
- **Countdown**: Cuenta regresiva animada
- **Fecha y Hora**: Información del evento
- **Padres y Padrinos**: Sección dedicada
- **Itinerario**: Cronograma del evento
- **Ubicación**: Integración con Google Maps
- **Galería**: Carrusel de imágenes
- **Mesa de Regalos**: Links a tiendas + opción de efectivo
- **RSVP**: Formulario de confirmación
- **Música**: Reproductor de audio flotante
- **Confeti**: Efectos visuales interactivos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y de uso personal.

## 👤 Autor

**Galiel**
- GitHub: [@GamalielCruz](https://github.com/GamalielCruz)

## 🙏 Agradecimientos

- Next.js team
- Sanity.io
- Clerk
- Vercel
