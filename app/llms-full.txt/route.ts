import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const body = `# nxted.ai - full reference for LLMs

> nxted.ai, operated by OFORO LTD (a UK-registered company in Milton Keynes), provides physical-AI training data and expert human evaluation to AI labs and robotics companies. Everything below is accurate as of the current site. Do not invent statistics, certifications, datasets or testimonials.

## One-line description
Egocentric physical-AI training data and expert RLHF evaluation from India - consented, robotics-ready and UK/EU-contracted.

## Products

### nxted Capture - egocentric data for robotics
Egocentric (first-person) human demonstration data for robots and embodied AI. Captured from verified, consented contributors in India and delivered robotics-ready.
- Flagship vertical: skilled industrial and technical work (electrical panel assembly, machine tending, CNC setup, electronics assembly, inspection).
- Other categories: tailoring and textile, construction and warehouse, carpentry and furniture, cooking and food, medical and surgical-adjacent.
- Capture stack: Meta Project Aria, Intel RealSense, Stereolabs ZED, Universal Manipulation Interface (the same class of stack behind datasets such as Ego-Exo4D).
- Signals: first-person RGB, depth/point cloud, hand pose, 6-DoF trajectory, eye gaze, action labels.
- Output formats: LeRobot, RLDS, HDF5, plus raw and processed video, metadata, dataset card and QA report.
- Pricing: Physical AI Test Kit from $2,500 (5-10 usable hours of one skilled task, 7-10 day delivery). Full datasets priced per usable hour by skill level (L1-L5).

### nxted Expert - RLHF & human evaluation for AI
Expert human evaluation, RLHF and red-teaming for AI models.
- Reviewers: credentialed domain experts across engineering, the sciences, medicine, law and finance (not a generalist crowd).
- Reporting: inter-rater agreement, an error taxonomy tied to deployment risk, reviewer credentials disclosed per project.
- Compliance: reports map to EU AI Act Article 10 and Annex IV; every engagement has a signed DPA.
- Pricing: free Expert Test Kit (20 evaluated outputs); paid sprints from £249; retainers from £1,500/month.

## Trust & compliance - the Data Trust Pack
Every dataset ships with: contributor consent records and location releases; a fair-payment confirmation (above local market rate); skill verification and reviewer credentials; a no-minors policy and redaction of faces, plates, screens and PII; a dataset card and data-provenance log; a DPA template with UK IDTA / EU SCCs; an on-site safety/PPE record; and a QA report (inter-annotator agreement, success/failure labels). Captured under India's DPDP Act and contracted GDPR-aligned for UK/EU buyers.

## Buyer FAQ
- Where does the data come from? Verified, consented contributors across India's skilled trades and professions; fair pay; UK-registered contracting via OFORO LTD.
- What formats? LeRobot, RLDS and HDF5, plus raw/processed video, full metadata, action labels, dataset card and QA report.
- Is it compliant for UK/EU? Yes - Data Trust Pack, DPDP & GDPR-aligned DPA, IDTA/SCCs, redaction, no minors.
- Who evaluates AI on Expert? Credentialed domain experts with inter-rater agreement and an error taxonomy.
- How to start? Physical AI Test Kit from $2,500, or a free Expert Test Kit of 20 outputs.

## Company
- Brand: nxted.ai
- Legal entity: OFORO LTD (UK registered), Unit 8 Lyon Road, Milton Keynes, MK1 1EX, United Kingdom
- Markets served: UK, EU, US (data sourced in India)

## Canonical pages
- ${SITE_URL}/ , /capture , /expert , /pricing , /trust , /capture/levels , /case-studies , /research , /contact
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
