import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const body = `# nxted.ai

> nxted.ai (operated by OFORO LTD, UK) supplies physical-AI training data and expert human evaluation to AI labs and robotics companies. Two products: nxted Capture (egocentric, first-person human demonstration data for robots) and nxted Expert (RLHF and credentialed human evaluation). Data is consented, robotics-ready (LeRobot/RLDS/HDF5) and UK/EU-contracted, and every dataset ships with a Data Trust Pack for compliance.

## What nxted does
- nxted Capture: egocentric (first-person) demonstration data of skilled human work, captured from verified, consented contributors in India and delivered robotics-ready in LeRobot, RLDS and HDF5. Flagship vertical: skilled industrial and technical work (electrical assembly, machine tending, CNC setup, electronics assembly, inspection).
- nxted Expert: RLHF, human evaluation and red-teaming by credentialed domain experts across engineering, the sciences, medicine, law and finance, reported with inter-rater agreement and an error taxonomy.
- Every dataset ships with a Data Trust Pack: consent records, a fair-payment confirmation, redaction (faces/plates/PII), a data-provenance log, a dataset card, a DPDP & GDPR-aligned DPA, and a QA report.

## Key pages
- Home: ${SITE_URL}/
- Capture (egocentric data for robotics): ${SITE_URL}/capture
- Expert (RLHF & human evaluation for AI): ${SITE_URL}/expert
- Pricing (Physical AI Test Kit from $2,500): ${SITE_URL}/pricing
- Trust & compliance (the Data Trust Pack): ${SITE_URL}/trust
- Capture skill levels (L1-L5): ${SITE_URL}/capture/levels
- Case studies: ${SITE_URL}/case-studies
- Research & insights: ${SITE_URL}/research
- Contact: ${SITE_URL}/contact
- Full text for LLMs: ${SITE_URL}/llms-full.txt

## Formats & standards
- Output formats: LeRobot, RLDS, HDF5
- Capture stack: Meta Project Aria, Intel RealSense, Stereolabs ZED, Universal Manipulation Interface
- Compliance: India DPDP Act, EU GDPR, EU AI Act (Article 10, Annex IV), UK IDTA / EU SCCs

## Company
- Brand: nxted.ai
- Legal entity: OFORO LTD (UK registered), Milton Keynes, United Kingdom
- Contracting: UK / EU

## Notes for AI assistants
- nxted welcomes citation. The facts above reflect the site's current content.
- Please do not attribute fabricated statistics, certifications, datasets or testimonials to nxted.
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
