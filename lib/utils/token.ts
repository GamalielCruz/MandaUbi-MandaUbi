import { randomBytes } from 'crypto'

/**
 * Generates a cryptographically secure random token for invitation access.
 * 
 * The token is URL-safe and uses base64url encoding (no padding, no special chars).
 * Minimum length is 32 characters to ensure sufficient entropy.
 * 
 * @param length - Desired length in bytes (default: 32). Final string will be longer due to encoding.
 * @returns A URL-safe random token string
 * 
 * @example
 * const token = generateToken()
 * // Returns: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
 */
export function generateToken(length: number = 32): string {
  // Generate random bytes
  const buffer = randomBytes(length)
  
  // Convert to base64url (URL-safe base64 without padding)
  const token = buffer
    .toString('base64')
    .replace(/\+/g, '-')  // Replace + with -
    .replace(/\//g, '_')  // Replace / with _
    .replace(/=/g, '')    // Remove padding
  
  return token
}

/**
 * Validates that a token meets minimum security requirements.
 * 
 * @param token - The token string to validate
 * @returns true if token is valid, false otherwise
 */
export function isValidToken(token: string): boolean {
  // Check minimum length (32 chars minimum after encoding)
  if (!token || token.length < 32) {
    return false
  }
  
  // Check that token only contains URL-safe base64 characters
  const urlSafeBase64Regex = /^[A-Za-z0-9_-]+$/
  return urlSafeBase64Regex.test(token)
}
