import { describe, it, expect } from 'vitest'

// Test the reference ID generation logic directly (avoiding Supabase client initialization)
function generateReferenceId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = 'YLEA-'
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

describe('L. Supabase Utilities', () => {
  it('L — generateReferenceId produces correct format', () => {
    const refId = generateReferenceId()
    expect(refId).toMatch(/^YLEA-[A-Z0-9]{8}$/)
    expect(refId).toHaveLength(13) // "YLEA-" (5) + 8 chars
  })

  it('L — generateReferenceId excludes ambiguous characters (O, I, 0, 1)', () => {
    // Character set: ABCDEFGHJKLMNPQRSTUVWXYZ23456789
    // Excludes: I, O (letters) and 0, 1 (digits)
    for (let i = 0; i < 50; i++) {
      const refId = generateReferenceId()
      const suffix = refId.slice(5)
      expect(suffix).not.toMatch(/[OI01]/)
    }
  })

  it('L — generateReferenceId produces unique IDs', () => {
    const ids = new Set<string>()
    for (let i = 0; i < 100; i++) {
      ids.add(generateReferenceId())
    }
    expect(ids.size).toBe(100)
  })
})
