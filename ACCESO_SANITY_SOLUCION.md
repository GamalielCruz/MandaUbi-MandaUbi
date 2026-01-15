# � SOLUcCIÓN: Acceso a Sanity Studio

## ❌ Problema Actual

El comando `npm run sanity` falla con este error:
```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './compiler-runtime' is not defined by "exports" in react/package.json
```

**Causa**: Sanity Studio v5.3.1 tiene un bug de compatibilidad con React 18. El Studio intenta importar `react/compiler-runtime` que no existe en React 18.

## ✅ SOLUCIÓN IMPLEMENTADA: Panel de Administración Web

Como no podemos usar Sanity Studio debido al bug, hemos creado un **panel de administración web** que te permite editar eventos directamente desde el navegador.

### 🌐 Cómo Acceder

1. **Abre tu navegador** y ve a:
   ```
   https://enviaubi.com/admin/eventos
   ```

2. **No necesitas login** - El panel es público y usa autenticación por token

3. **Verás todos tus eventos** con la opción de editarlos

### ✏️ Cómo Editar un Evento

1. Haz clic en el botón **"Editar"** del evento que quieres modificar
2. Modifica los campos que necesites:
   - **Título**: Nombre del evento
   - **Slug**: URL corta (ej: "DiegoCruz" → https://enviaubi.com/DiegoCruz)
   - **Fecha del Evento**: Fecha y hora
   - **Lugar**: Nombre del lugar
   - **Dirección**: Dirección completa
3. Haz clic en **"Guardar"** para aplicar los cambios
4. Verás un mensaje de confirmación ✅

### 🔧 Campos Editables

El panel actual permite editar:
- ✅ Título del evento
- ✅ Slug (URL corta)
- ✅ Fecha y hora del evento
- ✅ Nombre del lugar
- ✅ Dirección

### 🚀 Ventajas

- ✅ **Sin terminal**: Todo desde el navegador
- ✅ **Sin login**: Acceso directo
- ✅ **Interfaz simple**: Fácil de usar
- ✅ **Cambios inmediatos**: Se aplican al instante
- ✅ **Funciona en producción**: Disponible en https://enviaubi.com

### 🔐 Seguridad

El panel usa un token de administración configurado en las variables de entorno:
- `ADMIN_TOKEN`: Token del servidor
- `NEXT_PUBLIC_ADMIN_TOKEN`: Token del cliente

**Importante**: Estos tokens están configurados en `.env.local` y en Vercel.

## 📋 Otras Opciones de Administración

### 1. Panel de Short URLs
```
https://enviaubi.com/admin/short-urls
```
Ver todos los eventos con sus URLs cortas.

### 2. Dashboard de Sanity (Solo Lectura)
```
https://www.sanity.io/manage/personal/project/b0omcq87
```
Puedes ver los datos pero no editarlos visualmente.

## 🔮 Futuro: Cuando se Arregle el Bug

Cuando Sanity arregle el bug de React 18, podrás usar:
```bash
npm run sanity
```

Y también podrás desplegar el Studio:
```bash
npx sanity deploy
```

Pero por ahora, usa el panel de administración web en `/admin/eventos`.

## 📝 Resumen

**Para editar eventos SIN usar la terminal:**
1. Ve a https://enviaubi.com/admin/eventos
2. Haz clic en "Editar"
3. Modifica los campos
4. Guarda los cambios

¡Listo! 🎉
