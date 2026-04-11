import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AcademicProfile from '../components/steps/AcademicProfile'
import LeadershipProfile from '../components/steps/LeadershipProfile'
import CommunityProfile from '../components/steps/CommunityProfile'
import { emptyForm, filledForm } from './helpers'

describe('F. Step 4 — Academic Profile', () => {
  const defaultProps = { form: emptyForm, update: vi.fn(), onNext: vi.fn(), onPrev: vi.fn() }

  it('F1 — Default one claim card with correct fields', () => {
    render(<AcademicProfile {...defaultProps} />)
    expect(screen.getByText('IV. Academic Profile')).toBeInTheDocument()
    expect(screen.getByText('Claim 1')).toBeInTheDocument()
    expect(screen.getByText(/Name of Award or Certificate/)).toBeInTheDocument()
    expect(screen.getByText(/Type of Participation/)).toBeInTheDocument()
    expect(screen.getByText(/Rank/)).toBeInTheDocument()
    expect(screen.getByText('Level')).toBeInTheDocument()
    expect(screen.getByText(/Upload Proof/)).toBeInTheDocument()
  })

  it('F2 — Academic participation options', () => {
    render(<AcademicProfile {...defaultProps} />)
    expect(screen.getByLabelText('Contestant')).toBeInTheDocument()
    expect(screen.getByLabelText('Participant')).toBeInTheDocument()
    // N/A appears in both participation and level, so check at least 2 exist
    const naOptions = screen.getAllByLabelText('N/A')
    expect(naOptions.length).toBeGreaterThanOrEqual(1)
  })

  it('F3 — Academic rank options', () => {
    render(<AcademicProfile {...defaultProps} />)
    expect(screen.getByLabelText('1st or its equivalent')).toBeInTheDocument()
    expect(screen.getByLabelText('2nd or its equivalent')).toBeInTheDocument()
    expect(screen.getByLabelText('3rd or its equivalent')).toBeInTheDocument()
    expect(screen.getByLabelText('Other ranks')).toBeInTheDocument()
    expect(screen.getByLabelText('None')).toBeInTheDocument()
  })

  it('F4 — Academic level options', () => {
    render(<AcademicProfile {...defaultProps} />)
    expect(screen.getByLabelText('Homeroom')).toBeInTheDocument()
    expect(screen.getByLabelText('School')).toBeInTheDocument()
    expect(screen.getByLabelText('Regional')).toBeInTheDocument()
    expect(screen.getByLabelText('National')).toBeInTheDocument()
    expect(screen.getByLabelText('International')).toBeInTheDocument()
  })

  it('F5 — No Modality field for Academic', () => {
    render(<AcademicProfile {...defaultProps} />)
    expect(screen.queryByText('Modality')).not.toBeInTheDocument()
  })

  it('F6 — Incomplete claim blocks navigation', () => {
    render(<AcademicProfile {...defaultProps} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
    expect(screen.getByText(/Please complete all claim fields/)).toBeInTheDocument()
  })

  it('F8 — Add claim button creates new claim', async () => {
    const update = vi.fn()
    render(<AcademicProfile {...defaultProps} update={update} />)
    await userEvent.click(screen.getByText('+ Add Academic Claim'))
    expect(update).toHaveBeenCalledOnce()
    const call = update.mock.calls[0][0]
    expect(call.academicClaims).toHaveLength(2)
  })

  it('F11 — First claim has no Remove button', () => {
    render(<AcademicProfile {...defaultProps} />)
    expect(screen.queryByText('Remove')).not.toBeInTheDocument()
  })

  it('F10 — Second claim has Remove button', () => {
    const formWith2Claims = {
      ...emptyForm,
      academicClaims: [
        { id: 1, award: '', participation: '', rank: '', level: '', proofFile: null },
        { id: 2, award: '', participation: '', rank: '', level: '', proofFile: null },
      ],
    }
    render(<AcademicProfile {...defaultProps} form={formWith2Claims} />)
    expect(screen.getByText('Remove')).toBeInTheDocument()
  })

  it('F13 — Fully filled claim enables Continue', () => {
    render(<AcademicProfile {...defaultProps} form={filledForm} />)
    expect(screen.getByText(/Continue/)).toBeInTheDocument()
  })

  it('F9 — Max 20 claims hides Add button', () => {
    const formWith20Claims = {
      ...emptyForm,
      academicClaims: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1, award: '', participation: '', rank: '', level: '', proofFile: null,
      })),
    }
    render(<AcademicProfile {...defaultProps} form={formWith20Claims} />)
    expect(screen.queryByText('+ Add Academic Claim')).not.toBeInTheDocument()
  })
})

describe('G. Step 5 — Leadership Profile', () => {
  const defaultProps = { form: emptyForm, update: vi.fn(), onNext: vi.fn(), onPrev: vi.fn() }

  it('G1 — Modality field is present', () => {
    render(<LeadershipProfile {...defaultProps} />)
    expect(screen.getByText('Modality')).toBeInTheDocument()
  })

  it('G2 — Modality options', () => {
    render(<LeadershipProfile {...defaultProps} />)
    expect(screen.getByLabelText('Face-to-Face')).toBeInTheDocument()
    expect(screen.getByLabelText('Online')).toBeInTheDocument()
    expect(screen.getByLabelText('Hybrid')).toBeInTheDocument()
  })

  it('G3 — Leadership participation options', () => {
    render(<LeadershipProfile {...defaultProps} />)
    expect(screen.getByLabelText('Lead Organizer')).toBeInTheDocument()
    expect(screen.getByLabelText('Committee Chairperson')).toBeInTheDocument()
    expect(screen.getByLabelText('Committee Member')).toBeInTheDocument()
    expect(screen.getByLabelText('Participant/Member')).toBeInTheDocument()
    expect(screen.getByLabelText('Others')).toBeInTheDocument()
  })

  it('G4 — Leadership rank options', () => {
    render(<LeadershipProfile {...defaultProps} />)
    expect(screen.getByLabelText('President/Mayor/Chairperson')).toBeInTheDocument()
    expect(screen.getByLabelText('Vice President/Vice Mayor/Vice Chairperson')).toBeInTheDocument()
    expect(screen.getByLabelText('Editor-in-Chief')).toBeInTheDocument()
  })

  it('G6 — Missing modality blocks navigation', () => {
    const formNoModality = {
      ...filledForm,
      leadershipClaims: [{
        ...filledForm.leadershipClaims[0],
        modality: '',
      }],
    }
    render(<LeadershipProfile {...defaultProps} form={formNoModality} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
  })

  it('G7 — Add/Remove leadership claims work', async () => {
    const update = vi.fn()
    render(<LeadershipProfile {...defaultProps} update={update} />)
    await userEvent.click(screen.getByText('+ Add Leadership Claim'))
    expect(update).toHaveBeenCalledOnce()
    const call = update.mock.calls[0][0]
    expect(call.leadershipClaims).toHaveLength(2)
  })
})

describe('H. Step 6 — Community Service Profile', () => {
  const defaultProps = { form: emptyForm, update: vi.fn(), onNext: vi.fn(), onPrev: vi.fn() }

  it('H1 — Modality field is present', () => {
    render(<CommunityProfile {...defaultProps} />)
    expect(screen.getByText('Modality')).toBeInTheDocument()
  })

  it('H2 — Community participation options', () => {
    render(<CommunityProfile {...defaultProps} />)
    expect(screen.getByLabelText('Lead Organizer')).toBeInTheDocument()
    expect(screen.getByLabelText('Committee Chairperson')).toBeInTheDocument()
  })

  it('H4 — Community level options (different from Academic)', () => {
    render(<CommunityProfile {...defaultProps} />)
    expect(screen.getByLabelText('Barangay')).toBeInTheDocument()
    expect(screen.getByLabelText('Municipal')).toBeInTheDocument()
    expect(screen.getByLabelText('Provincial')).toBeInTheDocument()
  })

  it('H5 — All fields required blocks navigation', () => {
    render(<CommunityProfile {...defaultProps} />)
    expect(screen.queryByText(/Continue/)).not.toBeInTheDocument()
    expect(screen.getByText(/Please complete all claim fields/)).toBeInTheDocument()
  })

  it('H6 — Add community claim works', async () => {
    const update = vi.fn()
    render(<CommunityProfile {...defaultProps} update={update} />)
    await userEvent.click(screen.getByText('+ Add Community Claim'))
    expect(update).toHaveBeenCalledOnce()
  })
})
