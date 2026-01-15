/**
 * Generates a URL-friendly slug from a given title string.
 * 
 * The slug is normalized by:
 * - Converting to lowercase
 * - Removing accents and diacritics
 * - Replacing spaces and special characters with hyphens
 * - Removing consecutive hyphens
 * - Trimming hyphens from start and end
 * 
 * @param title - The title string to convert to a slug
 * @returns A URL-safe slug string
 * 
 * @example
 * generateSlug("Mi Boda Especial 2024!")
 * // Returns: "mi-boda-especial-2024"
 * 
 * generateSlug("Fiesta de Cumpleaños #30")
 * // Returns: "fiesta-de-cumpleanos-30"
 */
export function generateSlug(title: string): string {
  if (!title) {
    return ''
  }

  return title
    .toLowerCase()
    // Normalize unicode characters (remove accents)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove consecutive hyphens
    .replace(/-+/g, '-')
    // Trim hyphens from start and end
    .replace(/^-+|-+$/g, '')
}

/**
 * Generates a unique slug by appending a random suffix if needed.
 * 
 * This is useful when you need to ensure slug uniqueness in the database.
 * The suffix is a short random string (6 characters).
 * 
 * @param title - The title string to convert to a slug
 * @param addSuffix - Whether to add a random suffix (default: false)
 * @returns A URL-safe slug string, optionally with random suffix
 * 
 * @example
 * generateUniqueSlug("Mi Evento", true)
 * // Returns: "mi-evento-a1b2c3"
 */
export function generateUniqueSlug(title: string, addSuffix: boolean = false): string {
  const baseSlug = generateSlug(title)
  
  if (!addSuffix) {
    return baseSlug
  }
  
  // Generate a short random suffix (6 characters)
  const suffix = Math.random().toString(36).substring(2, 8)
  
  return `${baseSlug}-${suffix}`
}

/**
 * Validates that a slug meets URL-safety requirements.
 * 
 * @param slug - The slug string to validate
 * @returns true if slug is valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  // Check that slug is not empty
  if (!slug || slug.length === 0) {
    return false
  }
  
  // Check that slug only contains lowercase letters, numbers, and hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}
