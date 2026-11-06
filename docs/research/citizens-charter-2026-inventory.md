# Citizen's Charter 2026 service inventory

Inventory of the services in the Palo Citizen's Charter, prepared as the
"service inventory" step of the source plan. It lists service titles and page
numbers only. Nothing here is a verified service guide.

## Source

| Field | Value |
| --- | --- |
| Title on cover | Local Government Unit of Palo Citizen's Charter 2026 (2nd Edition) |
| URL | <http://210.213.142.34/home/homepage_data/pdf_chart/20260512/20260512.pdf> |
| Retrieved | 2026-11-06 (downloaded by the team) |
| Pages | 256 (Word-generated PDF with selectable text) |
| PDF created | 2026-10-21 (file metadata) |
| Approval date | Not stated on the cover; the URL path contains `20260512`. Confirm the approval date with the LGU |
| Languages | English only |
| Status | `needs_confirmation` |

## Findings

- **112 external services** across 20 offices or units, plus 7 internal
  (employee) services that BetterPalo does not need.
- Each service follows the RA 11032 layout: office, classification (Simple,
  Complex, Highly Technical), transaction type, who may avail, checklist of
  requirements with where to secure each, client steps, agency actions, fees,
  processing time, and person responsible.
- **Online permit link differs from the one found earlier.** The business
  permit service points to `https://bpbc4.ibpls.com/paloleyte/`, not
  `bpbc.ibpls.com/paloleyte/`. Test both before linking either.
- **Staff names.** "Person responsible" lists individual employees. BetterPalo
  should show the office and position only, not staff names, to follow the
  privacy rule in `docs/data-sources.md` and avoid pages going stale when staff
  change.
- **Fees by reference.** Some fees are given as "Based on the Municipal Tax and
  Revenue Code of 2022" rather than an amount (for example, business permits).
  The guide must say that and point to the office, not estimate an amount. The
  Revenue Code itself is a source to obtain.
- **Office directory.** Page 256 lists office phone numbers. These are
  officially published and may be used for offices, but test-call each one
  before publishing. Some rows did not extract cleanly and need reading from
  the PDF.
- **Charter errors to report to the LGU:**
  - Economic Enterprise Management Unit services B and C have the same title
    ("Processing of Acquiring Vacant Adjoining Stalls").
  - Planning and Development services F and G have nearly the same title, and G
    (pages 196 to 199) overlaps the start of the Social Welfare section (page
    197).
  - "Filling of Petition" should be "Filing of Petition" (Civil Registrar I and
    J).
- **Extraction.** The tables do not convert cleanly to text. Each pilot guide
  needs to be transcribed by reading the PDF page, then checked by a second
  person.

## Pilot shortlist (provisional)

To be confirmed by the demand check in ADR 0009. These are common, cover
different offices, and look complete in the Charter:

| Service | Office | Pages | Why |
| --- | --- | --- | --- |
| Issuance of Community Tax Certificate (cedula) | Treasurer | 225–227 | Simple; required by many other services; fees stated |
| Request of Issuance of Certified True Copy of Birth, Marriage and Death Certificate | Civil Registrar | 107–108 | Simple; very common request; fees stated |
| Granting of New and Renewal of Existing Business Permits | BPLO | 21–24 | Complex; tests requirements from other agencies, the online channel, and fees by reference |

Alternatives if demand points elsewhere: Senior Citizen ID (OSCA, 216–217), PWD
ID (Social Welfare, 205–207), Building Permit (Engineer, 128–131).

## External services by office

| Office or unit | Services (Charter letter, pages) |
| --- | --- |
| Office of the Mayor – Administrative and HR Management | A Special Mayor's Permit (9–13); B Mayor's Certification (13–14); C Certification of No Objection for Cutting or Pruning Trees (14–17); D Request for Blood Units (17–18); E Authority to Conduct Research or Data Gathering (18–19) |
| Office of the Mayor – Business Permits and Licensing Office | A New and Renewal of Business Permits (21–24); B New and Renewal of Motorcab Franchise (24–26); C New and Renewal of Pedicab Franchise (26–27); D Certificate of Retirement of Business Permit (27–28); E Certification for Dropping of Motorcab Franchise (28–29); F Certification for Substitution of Motorcab Unit (29–30); G Certification for Transfer of Ownership (30) |
| Office of the Mayor – Economic Enterprise Management Unit (Palo Public Market) | A New Stall Award (32–34); B Acquiring Vacant Adjoining Stalls (34–35); C Acquiring Vacant Adjoining Stalls (35–37, duplicate title); D Stall Award for Transfer (37–38); E Collection of Rentals for Fixed Stalls and Utility Bills (38–39); F Certification / Market Clearance (39–40); G Application and Registration of Tabo Vendors (40–42) |
| Office of the Mayor – Public Employment Service Office | A Local and Special Recruitment Activity (44–45) |
| Office of the Mayor – Tourism, Culture, Arts and Media Office | A Tourism Information Service (47); B Tourism Data Request (48) |
| Office of the Sangguniang Bayan | A Sangguniang Bayan Documents and Related Certifications (50–51) |
| Office of the Municipal Accountant | A Processing of Barangay Supplemental Budget (53–54) |
| Office of the Municipal Agriculturist | A Technical Assistance to Farmers and Fisherfolk (56–57); B Issuance of Certification (57–59); C RSBSA, Fisherfolk, Boat and Gear Registration, Crop and Livestock Insurance (59–62) |
| Office of the Municipal Assessor | A Transfer of Ownership of Tax Declaration (64–66); B Revision of Tax Declaration (66–68); C Tax Declaration for the First Time (69–70); D Assessment of New Building and Machinery (71–73); E Cancellation of Assessment (73–74); F Certified Photocopy of Tax Declaration (75–76); G Certificate With or Without Improvement (76–78); H Certificate of No Property (78–79); I Certificate of Land Holdings (80–81); J Property History / Tracer (81–83); K Property History / Tracer, Complex (83–84); L Annotation and Cancellation of Bailbond, Mortgage, and Notice of Tax Lien (85) |
| Office of the Municipal Budget Officer | A Technical Assistance in the Review of Barangay and SK Budgets (87–89) |
| Office of the Municipal Civil Registrar | A Timely Registration of Birth (91–92); B Late Registration of Birth (92–94); C Registration of Marriage (94–95); D Timely Registration of Death (95–97); E Late Registration of Death (97–99); F Marriage License (99–100); G Admission of Paternity, RA 9255 (101–102); H Legitimation with Admission of Paternity (102–103); I Petition for Correction of Clerical Error, RA 9048 (103–104); J Petition for Change of First Name, RA 9048 (104–106); K Registration of Court Orders, Annulment and Adoption (106–107); L Certified True Copy of Birth, Marriage and Death Certificate (107–108); M Local Civil Registry Copy of Birth, Marriage and Death Certificate (108–109) |
| Office of the MDRRMO | A IEC Materials (111); B MDRRM Trainings and Seminars (112–113); C Request for Emergency Response (113–115); D MDRRMO Certification (115–116); E CCTV Review (116–117) |
| MDRRMO – Traffic and Security Management Unit | A Seminar Orientation and Inspection of Motorcab and Pedicab for Hire (119–120); annex: Municipal Ordinance No. 2025-14, Traffic Violation Penalties (121–122) |
| Office of the Municipal Engineer | A Electrical Permit (124–126); B Water Connection / Excavation Permit (126–128); C Building Permit (128–131); D Occupancy Permit (131–133); E Fencing Permit (133–135); F Demolition Permit (135–136); G Certificate of Annual Inspection (137–138) |
| Office of the Municipal Health Officer | A Outpatient Consultation (140–144); B Medico-Legal Examination (144–145); C Medical and Health Certificate (145–147); D Environmental Sanitation Certification (147–148); E Pre-Natal Care (149–150); F Family Planning (150–152); G Immunization (152–153); H Nutrition (153–154); I Anti-Tuberculosis Treatment (155–156); J Leprosy Treatment (156–158); K Rabies / Animal Bite Treatment (158–159); L Anti-Tetanus Treatment (159–160); M Dental Examination and Tooth Extraction (160–161); N Pre-Marriage Counseling Seminars (161–163); O Mental Health Services (163–164) |
| MHO – Palo One Stop Health Shop | A Diagnostic Procedure, Pay Patient (166–167); B Diagnostic Procedure, Indigent Patient (167–169); C Pay Patient from Partner LGUs (169–170); D Indigent Patient from Partner LGUs (170–171); annex: Cost of Procedures (172–173) |
| Office of the Municipal Planning and Development Coordinator | A Zoning Certification (175–177); B Locational Clearance (177–181); C Subdivision Plan, Approval, Development Permit, and Related (181–192); D Statistical and Non-Statistical Data Including Maps (192–193); E Barangay Certification (193–195); F Pre-Marriage Orientation and Counseling Certification (195–196); G Pre-Marriage Orientation and Counseling Certification (196–199, near-duplicate) |
| Office of the MSWDO | A Aid to Individuals in Crisis Situation (198–200); B Referrals to Schools, PCSO, Hospitals, PhilHealth (200–201); C Referrals for Free Legal Assistance (201–202); D Solo Parent ID, RA 8972 (202–203); E Referral for Adoption (203–205); F PWD ID, RA 9442 (205–207); G Referral for Residential Care (207–208); H Shelter / Housing Assistance (208–212); I Permit and Recognition of Child Development Centers (212–213); J National Child Development Center (213–214) |
| MSWDO – Office of the Senior Citizens Affairs | A New Senior Citizen ID and Booklets (216–217); B Replacement of Senior Citizen ID (217–220); C Social Pension Application (220–221); D PhilHealth Application (221–222); E Senior Citizens Helpdesk (222–223) |
| Office of the Municipal Treasurer | A Community Tax Certificate / cedula (225–227); B Collection of Real Property Taxes (227–228); C Real Property Tax Clearance or Certification (228–230); D Certified Copy of Tax Clearance, Official Receipt, and Certification of Transfer (230–231); E Issuance of Official Receipt (231–233) |

Also in the Charter: Feedback and Complaint Mechanism (255) and List of Offices
(256).
