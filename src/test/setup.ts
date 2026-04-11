import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

// Mock Supabase
vi.mock('../lib/supabase', () => {
  const mockFrom = vi.fn(() => ({
    insert: vi.fn(() => Promise.resolve({ error: null })),
    select: vi.fn(() => ({
      order: vi.fn(() => Promise.resolve({ data: [], error: null })),
      eq: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({ data: null, error: null })),
      })),
    })),
  }))

  const mockAuth = {
    signInWithPassword: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
    signOut: vi.fn(() => Promise.resolve({ error: null })),
    getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
  }

  const mockStorage = {
    from: vi.fn(() => ({
      upload: vi.fn(() => Promise.resolve({ data: { path: 'test/file' }, error: null })),
      getPublicUrl: vi.fn(() => ({ data: { publicUrl: 'https://example.com/test-file.pdf' } })),
    })),
  }

  return {
    supabase: {
      from: mockFrom,
      auth: mockAuth,
      storage: mockStorage,
    },
    uploadFile: vi.fn(() => Promise.resolve('https://example.com/test-file.pdf')),
    generateReferenceId: vi.fn(() => 'YLEA-TEST1234'),
  }
})

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: 'test-id-123' }),
  }
})
