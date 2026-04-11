# 41st YLEA Form — Comprehensive Test Cases

**Application:** 41st Youth Leadership Excellence Awards (YLEA) 2026 Nomination Form
**URL:** https://ylea-form.vercel.app
**Admin URL:** https://ylea-form.vercel.app/admin
**Last Updated:** April 11, 2026

---

## Legend

- **P** = Priority (P0 = Critical, P1 = High, P2 = Medium, P3 = Low)
- **Status** = Pass / Fail / Blocked / Skipped

---

## A. WELCOME SCREEN

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| A1 | Welcome screen loads | Navigate to `/` | Welcome card appears with "41st YLEA" label, title, deadline, program year, submission mode, and "Start Nomination" button | P0 | |
| A2 | Deadline displays correctly | Load welcome screen | Deadline shows "April 10, 2026" | P1 | |
| A3 | Info box content | Load welcome screen | Shows Program Year "SY 2025-2026" and Submission Mode "Online Portfolio" | P1 | |
| A4 | Reference ID note visible | Load welcome screen | Red note: "Keep your Reference ID safe — use it to monitor your application status anytime." | P2 | |
| A5 | Start button navigates to form | Click "Start Nomination" | Form loads with Step 1 (General Info), progress bar appears | P0 | |
| A6 | Mobile responsive | Load on mobile viewport (< 600px) | Card adjusts padding, content remains readable | P2 | |

---

## B. PROGRESS BAR

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| B1 | Progress bar shows all 8 steps | Start nomination | 8 steps visible: General Info, School Info, Requirements, Academic, Leadership, Community, Video, Confirmation | P1 | |
| B2 | Current step highlighted | Navigate through steps | Active step has red dot, completed steps have green checkmark dot | P1 | |
| B3 | Inactive steps dimmed | Start on step 1 | Steps 2-8 are dimmed (opacity 0.4) | P2 | |
| B4 | Mobile hides labels | View on < 600px viewport | Step labels hidden, only dots visible | P2 | |

---

## C. STEP 1 — GENERAL INFORMATION

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| C1 | All fields render | Load Step 1 | Fields: Full Name, Complete Address, Municipality, Phone Number, Email, Birthday, Age, Sex | P0 | |
| C2 | All fields required | Leave all fields empty, try to continue | "Continue" button not visible, validation note shows "Please fill in all required fields to continue." | P0 | |
| C3 | Partial fill blocks navigation | Fill only Full Name and Address | Continue button still hidden | P0 | |
| C4 | Full fill enables navigation | Fill all fields including Sex radio | Continue button appears and is clickable | P0 | |
| C5 | Full Name placeholder | Focus Full Name field | Placeholder: "Dela Cruz, Juan M." | P3 | |
| C6 | Phone field type | Inspect Phone Number field | Input type is "tel" | P2 | |
| C7 | Email field type | Inspect Email field | Input type is "email" | P2 | |
| C8 | Age field type | Inspect Age field | Input type is "number" | P2 | |
| C9 | Sex radio options | View Sex field | Two options: Male, Female | P1 | |
| C10 | Sex radio selection | Select "Male", then "Female" | Only one option selected at a time | P1 | |
| C11 | Data persists on back navigation | Fill Step 1, go to Step 2, go back | All Step 1 fields retain their values | P1 | |
| C12 | Continue navigates to Step 2 | Fill all fields, click Continue | Step 2 (School Info) loads, progress bar updates | P0 | |

---

## D. STEP 2 — SCHOOL INFORMATION

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| D1 | All fields render | Load Step 2 | Fields: School Name, School Address, School Head Name/Email/Mobile, Advisor Name/Email/Mobile | P0 | |
| D2 | All fields required | Leave empty, check for Continue | Continue button hidden, validation note shown | P0 | |
| D3 | Full fill enables navigation | Fill all 8 fields | Continue button appears | P0 | |
| D4 | Back button works | Click "Back" | Returns to Step 1 with data preserved | P1 | |
| D5 | School Head Email field type | Inspect field | Input type is "email" | P2 | |
| D6 | School Head Mobile field type | Inspect field | Input type is "tel" | P2 | |
| D7 | Advisor Email field type | Inspect field | Input type is "email" | P2 | |
| D8 | Advisor Mobile field type | Inspect field | Input type is "tel" | P2 | |

---

## E. STEP 3 — REQUIREMENTS (File Uploads)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| E1 | All upload fields render | Load Step 3 | Three upload fields: Nomination Letter, Academic Records, 2x2 Picture | P0 | |
| E2 | All uploads required | Don't upload any file | Continue button hidden, validation note shown | P0 | |
| E3 | Nomination Letter accepts PDF/JPG/PNG | Upload a .pdf file | File accepted, shown in input | P0 | |
| E4 | Academic Records accepts PDF/JPG/PNG | Upload a .jpg file | File accepted | P0 | |
| E5 | 2x2 Picture accepts JPG/PNG only | Upload a .png file | File accepted | P0 | |
| E6 | Helper text for Nomination Letter | View field | Shows "Signed by the school head or principal and addressed to JCI Antique Kruhay President Lord Leomer Pomperada." | P2 | |
| E7 | Helper text for Academic Records | View field | Shows "Form 137 for Elementary / SF 10 for Senior HS..." | P2 | |
| E8 | Helper text for Picture | View field | Shows "A clear 2x2 picture taken within the last twelve (12) months." | P2 | |
| E9 | All three uploaded enables Continue | Upload all three files | Continue button appears | P0 | |
| E10 | Back button works | Click Back | Returns to Step 2 with data preserved | P1 | |
| E11 | Large file upload (>5MB) | Upload a 10MB PDF | Verify behavior — should either upload or show error (check Supabase storage limits) | P1 | |

---

## F. STEP 4 — ACADEMIC PROFILE (Claims)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| F1 | Default one claim card | Load Step 4 | One claim card with fields: Award, Participation, Rank, Level, Upload Proof | P0 | |
| F2 | Participation options (Academic) | View Participation radio | Options: Contestant, Participant, N/A | P1 | |
| F3 | Rank options (Academic) | View Rank radio | Options: 1st or its equivalent, 2nd or its equivalent, 3rd or its equivalent, Other ranks, None | P1 | |
| F4 | Level options (Academic) | View Level radio | Options: Homeroom, Grade, School, District, Cluster, Division/Provincial, Regional, National, International, N/A | P1 | |
| F5 | No Modality field for Academic | View claim card | Modality field should NOT appear (academic type only) | P1 | |
| F6 | Proof upload required | Leave proof empty | Continue button hidden | P0 | |
| F7 | Proof upload accepts PDF/JPG/PNG | Upload a .pdf proof file | File accepted | P0 | |
| F8 | Add claim button | Click "+ Add Academic Claim" | New claim card appears as Claim 2 | P1 | |
| F9 | Maximum 20 claims | Add 20 claims total | Add button disappears after 20th claim | P1 | |
| F10 | Remove claim button | Click "Remove" on Claim 2 | Claim 2 removed, only Claim 1 remains | P1 | |
| F11 | First claim not removable | View Claim 1 | No "Remove" button on first claim | P1 | |
| F12 | All fields required per claim | Fill award but leave others empty | Continue button hidden | P0 | |
| F13 | Fully filled claim enables Continue | Fill all fields + upload proof | Continue button appears | P0 | |
| F14 | Multiple claims all valid | Add 3 claims, fill all completely | Continue button appears | P1 | |
| F15 | Multiple claims one incomplete | Add 3 claims, leave one proof empty | Continue button hidden | P1 | |

---

## G. STEP 5 — LEADERSHIP PROFILE (Claims)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| G1 | Modality field present | View claim card | Modality radio field is visible (unlike Academic) | P1 | |
| G2 | Modality options | View Modality radio | Options: Face-to-Face, Online, Hybrid, N/A | P1 | |
| G3 | Participation options (Leadership) | View Participation radio | Options: Lead Organizer, Committee Chairperson, Committee Member, Participant/Member, Others | P1 | |
| G4 | Rank options (Leadership) | View Rank radio | Full leadership-specific ranks including President/Mayor, VP, Editor-in-Chief, etc. | P1 | |
| G5 | Level options (Leadership) | View Level radio | Same as Academic: Homeroom through International + N/A | P1 | |
| G6 | Modality required for validation | Fill all except Modality | Continue button hidden | P0 | |
| G7 | Add/Remove claims work | Add and remove leadership claims | Same behavior as Academic claims (max 20, first not removable) | P1 | |

---

## H. STEP 6 — COMMUNITY SERVICE PROFILE (Claims)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| H1 | Modality field present | View claim card | Modality radio field is visible | P1 | |
| H2 | Participation options (Community) | View Participation radio | Options: Lead Organizer, Committee Chairperson, Committee Member, Participant/Member, Others, N/A | P1 | |
| H3 | Rank options (Community) | View Rank radio | Community-specific: President/Mayor, VP, Member/Participant, 1st-3rd, Other, None | P1 | |
| H4 | Level options (Community) | View Level radio | Community-specific: Barangay, Municipal, Cluster, Provincial, Regional, National, International, N/A | P1 | |
| H5 | All fields + modality required | Fill all except one field | Continue button hidden | P0 | |
| H6 | Add/Remove claims work | Add and remove community claims | Same behavior as other claim types | P1 | |

---

## I. STEP 7 — VIDEO LINK

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| I1 | Video link field renders | Load Step 7 | Single URL input field with helper text | P0 | |
| I2 | Field required | Leave empty | Continue button hidden, validation note shown | P0 | |
| I3 | Helper text correct | View field | Shows "Share your video via YouTube, Facebook, Vimeo, or any platform..." | P2 | |
| I4 | Valid URL enables Continue | Enter a YouTube link | Continue button appears | P0 | |
| I5 | Whitespace-only rejected | Enter "   " (spaces only) | Continue button hidden (trimmed length = 0) | P1 | |
| I6 | Input type is URL | Inspect field | Input type is "url" | P2 | |

---

## J. STEP 8 — CONFIRMATION & SUBMISSION

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| J1 | Terms and conditions display | Load Step 8 | Three terms: Data Privacy, Truthfulness, Confirmation | P0 | |
| J2 | Important notice shown | View header | "IMPORTANT NOTICE: Once submitted, no further edits can be made." | P1 | |
| J3 | Checkbox unchecked by default | Load Step 8 | Checkbox is unchecked | P1 | |
| J4 | Submit disabled without checkbox | Don't check checkbox | "Submit Nomination" button is disabled | P0 | |
| J5 | Submit enabled with checkbox | Check the checkbox | "Submit Nomination" button becomes enabled | P0 | |
| J6 | Back button works | Click Back | Returns to Step 7 with video link preserved | P1 | |
| J7 | Successful submission | Check box, click Submit | Loading state shows "Submitting...", then success screen appears | P0 | |
| J8 | Submit button disabled during submission | Click Submit | Button shows "Submitting..." and is disabled (no double submit) | P0 | |
| J9 | Back button disabled during submission | Click Submit, try Back | Back button is disabled while submitting | P1 | |
| J10 | Error handling | Simulate network error (disconnect WiFi, click Submit) | Error message appears in red box below terms | P1 | |

---

## K. SUCCESS SCREEN

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| K1 | Success screen displays | Complete submission | Green checkmark icon, "Nomination Submitted!" title | P0 | |
| K2 | Reference ID shown | View success screen | Reference ID in red bold text (format: YLEA-XXXXXXXX) | P0 | |
| K3 | Reference ID format | Check Reference ID | Starts with "YLEA-", followed by 8 alphanumeric characters (no O, 0, 1, I, L) | P2 | |
| K4 | Save note shown | View success screen | "Keep this safe — use it to monitor your application status." | P2 | |

---

## L. SUPABASE DATA INTEGRITY

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| L1 | Application saved to database | Submit form, check Supabase table editor | New row in `ylea_applications` with all fields populated | P0 | |
| L2 | Reference ID matches | Compare success screen ref ID with database | Identical reference_id in database | P0 | |
| L3 | File URLs saved | Check nomination_letter_url, academic_records_url, picture_url columns | Non-null URLs pointing to Supabase Storage | P0 | |
| L4 | Files accessible | Click file URLs from database | Files open/download correctly | P0 | |
| L5 | Claims JSON structure | Inspect academic_claims JSONB | Array of objects with: id, award, participation, rank, level, proofUrl | P0 | |
| L6 | Claim proof URLs saved | Check proofUrl in claims JSON | Non-null URLs for each claim's proof file | P0 | |
| L7 | Claim proof files accessible | Open proofUrl links | Files open/download correctly | P0 | |
| L8 | Leadership claims have modality | Inspect leadership_claims JSONB | Each claim object includes modality field | P1 | |
| L9 | Community claims have modality | Inspect community_claims JSONB | Each claim object includes modality field | P1 | |
| L10 | Age stored as integer | Check age column | Integer value, not string | P2 | |
| L11 | Confirmed is true | Check confirmed column | Boolean true | P1 | |
| L12 | Timestamp recorded | Check created_at column | Timestamp present and approximately matches submission time | P1 | |

---

## M. STORAGE (Supabase Storage)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| M1 | Files uploaded to correct bucket | Check Supabase Storage | Files in `ylea-files` bucket | P0 | |
| M2 | File path structure | Check file paths | Organized as `YLEA-XXXXXXXX/filename` (e.g., `YLEA-ABC12345/nomination-letter`) | P1 | |
| M3 | Claim proofs uploaded | Check storage for claim files | Files like `YLEA-ABC12345/academic-claim-1-proof` exist | P0 | |
| M4 | Public URLs work | Open public URL in incognito browser | File loads without authentication | P1 | |
| M5 | Upload failure graceful | Disable storage (e.g., invalid bucket name) | Form still submits but file URLs are null in database | P1 | |

---

## N. ADMIN LOGIN (`/admin`)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| N1 | Login page loads | Navigate to `/admin` | Login card with "Admin Panel", email field, password field, "Sign In" button | P0 | |
| N2 | "41ST YLEA" label shown | View login page | Red label at top | P2 | |
| N3 | Empty fields blocked | Click Sign In with empty fields | Browser validation prevents submission (fields are required) | P1 | |
| N4 | Invalid credentials | Enter wrong email/password, click Sign In | Error message displayed (e.g., "Invalid login credentials") | P0 | |
| N5 | Valid credentials | Enter correct admin email/password | Redirects to `/admin/dashboard` | P0 | |
| N6 | Loading state during login | Click Sign In with valid credentials | Button shows "Signing in..." and is disabled | P1 | |
| N7 | Already logged in redirect | Navigate to `/admin` while logged in | Auto-redirects to `/admin/dashboard` | P1 | |
| N8 | Email field autofocus | Load login page | Email field is focused | P3 | |

---

## O. ADMIN DASHBOARD (`/admin/dashboard`)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| O1 | Dashboard loads with applications | Log in as admin | Table displays all applications from database | P0 | |
| O2 | Auth guard — not logged in | Navigate to `/admin/dashboard` without logging in | Redirects to `/admin` login | P0 | |
| O3 | Application count shown | View header | Shows "X total" count matching number of applications | P1 | |
| O4 | Table columns correct | View table headers | Columns: #, Reference ID, Full Name, Municipality, School, Level, Submitted, (View button) | P0 | |
| O5 | Applications ordered by newest first | Check table | Most recent submission at top (descending by created_at) | P1 | |
| O6 | Reference ID format in table | View Reference ID column | Styled as monospace red code badge | P2 | |
| O7 | Submitted date formatted | View Submitted column | Format: "Apr 10, 2026, 02:30 PM" (en-PH locale) | P2 | |
| O8 | Search by name | Type applicant name in search box | Table filters to matching applications | P0 | |
| O9 | Search by reference ID | Type "YLEA-" + partial ID in search | Table filters to matching application | P0 | |
| O10 | Search by email | Type applicant email | Table filters to matching application | P1 | |
| O11 | Search by school name | Type school name | Table filters to matching applications | P1 | |
| O12 | Search case insensitive | Search with different casing | Results still match | P1 | |
| O13 | Search no results | Search for "zzzznonexistent" | Shows "No applications match your search." | P1 | |
| O14 | Municipality filter dropdown | Click municipality dropdown | Lists all unique municipalities from applications, sorted A-Z | P1 | |
| O15 | Municipality filter works | Select a municipality | Table shows only applications from that municipality | P1 | |
| O16 | Combined search + filter | Enter name in search AND select municipality | Table filters by both criteria | P1 | |
| O17 | Clear search | Delete search text | All applications (per filter) shown again | P1 | |
| O18 | Clear filter | Select "All Municipalities" | All applications (per search) shown again | P1 | |
| O19 | Refresh button | Click "Refresh" | Applications re-fetched from database | P1 | |
| O20 | View button navigates | Click "View" on an application | Navigates to `/admin/application/:id` | P0 | |
| O21 | Sign Out button | Click "Sign Out" | Logs out, redirects to `/admin` login | P0 | |
| O22 | Footer count | View footer | Shows "Showing X of Y applications" (filtered vs total) | P2 | |
| O23 | Empty state | No applications in database | Shows "No applications yet." | P2 | |
| O24 | Mobile responsive | View on mobile viewport | Table scrolls horizontally, toolbar stacks | P2 | |

---

## P. ADMIN APPLICATION DETAIL (`/admin/application/:id`)

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| P1 | Detail page loads | Click "View" on an application | Full application detail page loads | P0 | |
| P2 | Auth guard — not logged in | Navigate to `/admin/application/xxx` without logging in | Redirects to `/admin` login | P0 | |
| P3 | Back button works | Click "Back" button | Returns to `/admin/dashboard` | P1 | |
| P4 | Applicant name in header | View header | Full name displayed as page title | P1 | |
| P5 | Reference ID in header | View header | Reference ID shown as styled code badge | P1 | |
| P6 | **General Information section** | View section | All 8 fields: Full Name, Address, Municipality, Phone, Email, Birthday, Age, Sex | P0 | |
| P7 | **School Information section** | View section | All 9 fields: Level, School Name/Address, Head Name/Email/Mobile, Advisor Name/Email/Mobile | P0 | |
| P8 | **Uploaded Documents section** | View section | Three file rows: Nomination Letter, Academic Records, Picture | P0 | |
| P9 | File links open in new tab | Click "View File" on a document | File opens in new browser tab | P0 | |
| P10 | Missing file shows "Not uploaded" | View document with null URL | Shows italic "Not uploaded" text | P1 | |
| P11 | **Video Link section** | View section | Clickable link to submitted video, opens in new tab | P1 | |
| P12 | Missing video shows message | View with no video link | Shows "No video submitted" | P2 | |
| P13 | **Academic Claims section** | View section | All academic claims listed with Award, Participation, Rank, Level | P0 | |
| P14 | Academic claim proof links | View claim with proof | "View Proof" link displayed and clickable | P0 | |
| P15 | Academic claim missing proof | View claim without proofUrl | Shows "No proof uploaded" in italic | P1 | |
| P16 | **Leadership Claims section** | View section | All leadership claims listed with Modality field included | P0 | |
| P17 | Leadership claim proof links | View claim with proof | "View Proof" link displayed and clickable | P0 | |
| P18 | **Community Claims section** | View section | All community claims listed with Modality field included | P0 | |
| P19 | Community claim proof links | View claim with proof | "View Proof" link displayed and clickable | P0 | |
| P20 | **Submission Details section** | View section | Reference ID, Confirmed (Yes/No), Submitted At timestamp | P1 | |
| P21 | Empty claims section | View type with no valid claims | Shows "No claims submitted" | P2 | |
| P22 | Invalid application ID | Navigate to `/admin/application/nonexistent-id` | Shows "Application not found." | P1 | |
| P23 | Multiple claims display | View application with 5+ claims | All claims render correctly with sequential numbering | P1 | |
| P24 | Mobile responsive | View on mobile viewport | Rows stack vertically, values left-aligned | P2 | |

---

## Q. ROUTING & NAVIGATION

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| Q1 | `/` loads form | Navigate to root | Welcome screen / nomination form loads | P0 | |
| Q2 | `/admin` loads login | Navigate to `/admin` | Admin login page loads | P0 | |
| Q3 | `/admin/dashboard` protected | Navigate directly without auth | Redirects to `/admin` | P0 | |
| Q4 | `/admin/application/:id` protected | Navigate directly without auth | Redirects to `/admin` | P0 | |
| Q5 | SPA routing on Vercel | Hard refresh on `/admin/dashboard` | Page loads correctly (not 404) — vercel.json rewrites working | P0 | |
| Q6 | Unknown route | Navigate to `/random-page` | Blank page (no crash) | P3 | |

---

## R. CROSS-BROWSER & DEVICE TESTING

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| R1 | Chrome desktop | Run full form submission + admin | All features work | P0 | |
| R2 | Firefox desktop | Run full form submission + admin | All features work | P1 | |
| R3 | Safari desktop (Mac) | Run full form submission + admin | All features work | P2 | |
| R4 | Chrome mobile (Android) | Run full form submission | Form is usable, file uploads work | P0 | |
| R5 | Safari mobile (iOS) | Run full form submission | Form is usable, file uploads work | P1 | |
| R6 | Tablet viewport | View form and admin dashboard | Layout adapts properly | P2 | |

---

## S. EDGE CASES & SECURITY

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| S1 | Double submission prevention | Click Submit rapidly twice | Only one record created in database | P0 | |
| S2 | XSS in text fields | Enter `<script>alert('xss')</script>` in Full Name | Script not executed, stored as plain text | P0 | |
| S3 | SQL injection in fields | Enter `'; DROP TABLE ylea_applications; --` | No effect, stored as plain text (Supabase parameterized queries) | P0 | |
| S4 | Very long text input | Enter 5000 characters in Full Name | Form handles gracefully (submits or shows validation) | P2 | |
| S5 | Special characters | Enter names with accents/tildes (e.g., "Jose Rizal Jr., III") | Stored and displayed correctly | P1 | |
| S6 | Network interruption during upload | Disable network mid-file-upload | Error message shown or form handles gracefully | P1 | |
| S7 | Supabase anon key not exposed for admin reads | Check browser network tab as unauthenticated user | Cannot read `ylea_applications` without Supabase auth session (RLS enforced) | P0 | |
| S8 | Admin RLS policy | Try to SELECT from `ylea_applications` using only anon key (no auth) | Request rejected by RLS | P0 | |
| S9 | Form state not shared across tabs | Open form in two tabs, submit one | Other tab unaffected | P2 | |
| S10 | Page refresh clears form | Fill form partially, refresh browser | Form resets to welcome screen (expected, no persistence) | P3 | |

---

## T. PERFORMANCE

| # | Test Case | Steps | Expected Result | P | Status |
|---|-----------|-------|-----------------|---|--------|
| T1 | Initial page load time | Load `/` on 4G connection | Page loads within 3 seconds | P1 | |
| T2 | Admin dashboard with 50+ applications | Load dashboard | Table renders without lag | P2 | |
| T3 | File upload with 3 proofs per claim type (20 each) | Submit max claims with all proofs | Submission completes (may take time but doesn't crash) | P2 | |
| T4 | Multiple concurrent submissions | Two users submit simultaneously | Both submissions saved correctly with unique reference IDs | P1 | |

---

## SIGN-OFF

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Tester | | | |
| Developer | | | |
| Project Owner | | | |

---

*Total Test Cases: 128*
*Generated for: 41st YLEA Nomination Form v1.0*
