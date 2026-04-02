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
