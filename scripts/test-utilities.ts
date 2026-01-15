import { generateToken, isValidToken } from '../lib/utils/token'
import { generateSlug, generateUniqueSlug, isValidSlug } from '../lib/utils/slug'

console.log('=== Testing Token Generation ===\n')

// Test token generation
const token1 = generateToken()
console.log('Generated token:', token1)
console.log('Token length:', token1.length)
console.log('Is valid token:', isValidToken(token1))
console.log()

// Test multiple tokens are unique
const token2 = generateToken()
console.log('Second token:', token2)
console.log('Tokens are different:', token1 !== token2)
console.log()

// Test invalid tokens
console.log('Short token is invalid:', !isValidToken('abc'))
console.log('Empty token is invalid:', !isValidToken(''))
console.log()

console.log('=== Testing Slug Generation ===\n')

// Test slug generation
const testTitles = [
  'Mi Boda Especial 2024!',
  'Fiesta de Cumpleaños #30',
  'Reunión Familiar - Navidad',
  'Evento Corporativo: Año Nuevo',
  'Celebración   con   espacios',
  'MAYÚSCULAS y minúsculas',
  'Ñoño & Niña',
]

testTitles.forEach(title => {
  const slug = generateSlug(title)
  console.log(`"${title}"`)
  console.log(`  → "${slug}"`)
  console.log(`  Valid: ${isValidSlug(slug)}`)
  console.log()
})

// Test unique slug generation
console.log('=== Testing Unique Slug Generation ===\n')
const uniqueSlug1 = generateUniqueSlug('Mi Evento', true)
const uniqueSlug2 = generateUniqueSlug('Mi Evento', true)
console.log('Unique slug 1:', uniqueSlug1)
console.log('Unique slug 2:', uniqueSlug2)
console.log('Slugs are different:', uniqueSlug1 !== uniqueSlug2)
console.log()

console.log('✓ All utility tests completed!')
