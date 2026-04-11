import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { FormData } from '../types'

export function renderWithRouter(ui: ReactNode, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

export const filledForm: FormData = {
  fullName: 'Dela Cruz, Juan M.',
  completeAddress: '123 Rizal St., San Jose',
  municipality: 'San Jose de Buenavista',
  phoneNumber: '09171234567',
  email: 'juan@example.com',
  birthday: '05/18/2008',
  age: '17',
  sex: 'Male',
  schoolLevel: 'Senior High School',
  schoolName: 'Antique National High School',
  schoolAddress: 'San Jose de Buenavista, Antique',
  schoolHeadName: 'Dr. Maria Santos',
  schoolHeadEmail: 'maria@school.edu',
  schoolHeadMobile: '09181234567',
  advisorName: 'Sir Roberto Villanueva',
  advisorEmail: 'roberto@school.edu',
  advisorMobile: '09081234567',
  nominationLetterFile: new File(['test'], 'nomination.pdf', { type: 'application/pdf' }),
  academicRecordsFile: new File(['test'], 'records.pdf', { type: 'application/pdf' }),
  pictureFile: new File(['test'], 'photo.jpg', { type: 'image/jpeg' }),
  academicClaims: [{
    id: 1, award: 'Math Olympiad', participation: 'Contestant',
    rank: '1st or its equivalent', level: 'Regional',
    proofFile: new File(['test'], 'proof.pdf', { type: 'application/pdf' }),
  }],
  leadershipClaims: [{
    id: 1, award: 'Student Council', participation: 'Lead Organizer',
    rank: 'President/Mayor/Chairperson', level: 'School', modality: 'Face-to-Face',
    proofFile: new File(['test'], 'proof.pdf', { type: 'application/pdf' }),
  }],
  communityClaims: [{
    id: 1, award: 'Clean-up Drive', participation: 'Lead Organizer',
    rank: 'President/Mayor/Chairperson', level: 'Barangay', modality: 'Face-to-Face',
    proofFile: new File(['test'], 'proof.pdf', { type: 'application/pdf' }),
  }],
  videoLink: 'https://youtube.com/watch?v=test123',
  confirmed: false,
}

export const emptyForm: FormData = {
  fullName: '', completeAddress: '', municipality: '', phoneNumber: '',
  email: '', birthday: '', age: '', sex: '',
  schoolLevel: '', schoolName: '', schoolAddress: '',
  schoolHeadName: '', schoolHeadEmail: '', schoolHeadMobile: '',
  advisorName: '', advisorEmail: '', advisorMobile: '',
  nominationLetterFile: null, academicRecordsFile: null, pictureFile: null,
  academicClaims: [{ id: 1, award: '', participation: '', rank: '', level: '', proofFile: null }],
  leadershipClaims: [{ id: 1, award: '', participation: '', rank: '', level: '', modality: '', proofFile: null }],
  communityClaims: [{ id: 1, award: '', participation: '', rank: '', level: '', modality: '', proofFile: null }],
  videoLink: '',
  confirmed: false,
}

export const mockApplication = {
  id: 'test-id-123',
  created_at: '2026-04-10T14:30:00Z',
  reference_id: 'YLEA-ABC12345',
  full_name: 'Dela Cruz, Juan M.',
  complete_address: '123 Rizal St., San Jose',
  municipality: 'San Jose de Buenavista',
  phone_number: '09171234567',
  email: 'juan@example.com',
  birthday: '05/18/2008',
  age: 17,
  sex: 'Male',
  school_level: 'Senior High School',
  school_name: 'Antique National High School',
  school_address: 'San Jose de Buenavista, Antique',
  school_head_name: 'Dr. Maria Santos',
  school_head_email: 'maria@school.edu',
  school_head_mobile: '09181234567',
  advisor_name: 'Sir Roberto Villanueva',
  advisor_email: 'roberto@school.edu',
  advisor_mobile: '09081234567',
  nomination_letter_url: 'https://example.com/nomination.pdf',
  academic_records_url: 'https://example.com/records.pdf',
  picture_url: 'https://example.com/photo.jpg',
  academic_claims: [
    { id: 1, award: 'Math Olympiad', participation: 'Contestant', rank: '1st or its equivalent', level: 'Regional', proofUrl: 'https://example.com/proof1.pdf' },
    { id: 2, award: 'Science Quiz', participation: 'Contestant', rank: '2nd or its equivalent', level: 'Division/Provincial', proofUrl: 'https://example.com/proof2.pdf' },
  ],
  leadership_claims: [
    { id: 1, award: 'Student Council', participation: 'Lead Organizer', rank: 'President/Mayor/Chairperson', level: 'School', modality: 'Face-to-Face', proofUrl: 'https://example.com/proof3.pdf' },
  ],
  community_claims: [
    { id: 1, award: 'Clean-up Drive', participation: 'Lead Organizer', rank: 'President/Mayor/Chairperson', level: 'Barangay', modality: 'Face-to-Face', proofUrl: 'https://example.com/proof4.pdf' },
  ],
  video_link: 'https://youtube.com/watch?v=test123',
  confirmed: true,
}

export const mockApplicationNoFiles = {
  ...mockApplication,
  id: 'test-id-456',
  full_name: 'Santos, Maria C.',
  reference_id: 'YLEA-XYZ98765',
  nomination_letter_url: null as string | null,
  academic_records_url: null as string | null,
  picture_url: null as string | null,
  academic_claims: [
    { id: 1, award: 'With honors', participation: 'N/A', rank: 'None', level: 'Homeroom' },
  ],
  leadership_claims: [
    { id: 1, award: 'Committee Chair', participation: 'Committee Chairperson', rank: 'Other Ranks/Positions', level: 'School', modality: 'Online' },
  ],
  community_claims: [] as { id: number; award: string; participation: string; rank: string; level: string; proofUrl?: string }[],
  video_link: '',
}
