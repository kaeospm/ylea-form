export type Claim = {
  id: number
  award: string
  participation: string
  rank: string
  level: string
  modality?: string
  proofFile: File | null
  proofUrl?: string
}

export type FormData = {
  // General Info
  fullName: string
  completeAddress: string
  municipality: string
  phoneNumber: string
  email: string
  birthday: string
  age: string
  sex: string
  // School Info
  schoolLevel: string
  schoolName: string
  schoolAddress: string
  schoolHeadName: string
  schoolHeadEmail: string
  schoolHeadMobile: string
  advisorName: string
  advisorEmail: string
  advisorMobile: string
  // Requirements
  nominationLetterFile: File | null
  academicRecordsFile: File | null
  pictureFile: File | null
  // Claims
  academicClaims: Claim[]
  leadershipClaims: Claim[]
  communityClaims: Claim[]
  // Video
  videoLink: string
  // Confirmation
  confirmed: boolean
}

export type ApplicationRow = {
  id: string
  created_at: string
  reference_id: string
  full_name: string
  complete_address: string
  municipality: string
  phone_number: string
  email: string
  birthday: string
  age: number
  sex: string
  school_level: string
  school_name: string
  school_address: string
  school_head_name: string
  school_head_email: string
  school_head_mobile: string
  advisor_name: string
  advisor_email: string
  advisor_mobile: string
  nomination_letter_url: string | null
  academic_records_url: string | null
  picture_url: string | null
  academic_claims: Claim[]
  leadership_claims: Claim[]
  community_claims: Claim[]
  video_link: string
  confirmed: boolean
}
