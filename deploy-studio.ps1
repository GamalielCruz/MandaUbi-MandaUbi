# Script para desplegar Sanity Studio en Windows
# Maneja la incompatibilidad temporal con React 18

Write-Host "🚀 Desplegando Sanity Studio..." -ForegroundColor Cyan
Write-Host ""

# Instalar React 17 temporalmente
Write-Host "⬇️  Instalando React 17 temporalmente..." -ForegroundColor Yellow
npm install --save-dev react@17 react-dom@17 --legacy-peer-deps

# Desplegar Studio
Write-Host ""
Write-Host "🎨 Desplegando Studio a Sanity..." -ForegroundColor Green
npx sanity deploy

# Restaurar React 18
Write-Host ""
Write-Host "⬆️  Restaurando React 18..." -ForegroundColor Yellow
npm install react@18 react-dom@18 --legacy-peer-deps

Write-Host ""
Write-Host "✅ ¡Deployment completado!" -ForegroundColor Green
Write-Host ""
Write-Host "Tu Studio estará disponible en:" -ForegroundColor Cyan
Write-Host "https://[tu-hostname].sanity.studio"
Write-Host ""
Write-Host "También puedes acceder desde:" -ForegroundColor Cyan
Write-Host "https://enviaubi.com/studio"
