#!/bin/bash

# Script para desplegar Sanity Studio
# Maneja la incompatibilidad temporal con React 18

echo "🚀 Desplegando Sanity Studio..."
echo ""

# Guardar versiones actuales de React
echo "📦 Guardando versiones actuales de React..."
REACT_VERSION=$(npm list react --depth=0 | grep react@ | sed 's/.*react@//')
echo "React actual: $REACT_VERSION"

# Instalar React 17 temporalmente
echo ""
echo "⬇️  Instalando React 17 temporalmente..."
npm install --save-dev react@17 react-dom@17 --legacy-peer-deps

# Desplegar Studio
echo ""
echo "🎨 Desplegando Studio a Sanity..."
npx sanity deploy

# Restaurar React 18
echo ""
echo "⬆️  Restaurando React 18..."
npm install react@18 react-dom@18 --legacy-peer-deps

echo ""
echo "✅ ¡Deployment completado!"
echo ""
echo "Tu Studio estará disponible en:"
echo "https://[tu-hostname].sanity.studio"
echo ""
echo "También puedes acceder desde:"
echo "https://enviaubi.com/studio"
