# Hugging Face sample-dataset card (template)

Publishing ONE real, well-documented sample dataset on the Hugging Face Hub is
the single highest-leverage off-site action: it is a high-authority backlink and
sits exactly where robotics researchers look. This is the README/dataset-card
template. Fill the `{{placeholders}}` with the real numbers from the sample you
publish - **do not invent figures**.

Suggested repo id: `oforo-ltd/nxted-industrial-egocentric-sample`
License: choose one you can honour (e.g. `cc-by-nc-4.0` for a non-commercial
sample, or a custom "evaluation use only" license that links to /trust).

---

```yaml
---
license: cc-by-nc-4.0
language:
  - en
tags:
  - robotics
  - egocentric
  - manipulation
  - imitation-learning
  - physical-ai
  - lerobot
task_categories:
  - robotics
pretty_name: nxted Industrial Egocentric Sample
size_categories:
  - n<1K
---
```

# nxted Industrial Egocentric Sample

A small, fully-documented **sample** of egocentric (first-person) human
demonstration data for robot manipulation, captured by nxted (OFORO LTD, UK).
This sample illustrates the structure and quality of nxted Capture deliveries.
It is **not** the full commercial dataset.

- **Homepage:** https://nxted.ai/capture
- **Provenance & compliance:** https://nxted.ai/trust
- **Contact / full datasets:** https://nxted.ai/contact

## Dataset summary

- **Task:** {{e.g. electrical-panel wiring}}
- **Episodes:** {{N}}
- **Usable hours:** {{N}}
- **Viewpoint:** egocentric (first-person), {{+ third-person reference if included}}
- **Signals:** RGB, {{depth}}, hand pose, 6-DoF trajectory, action labels
- **Formats included:** LeRobot, RLDS, HDF5
- **Contributors:** {{N}} credentialed {{trade}}, consented and fairly paid

## Structure

```
nxted_industrial_india_sample/
  dataset_card.md          # scope, splits, limitations
  consent_manifest.csv     # per-contributor consent + pay confirmation
  task_cards/              # what each episode demonstrates
  raw_video/               # original egocentric capture (redacted)
  processed_video/         # redacted, stabilised, trimmed
  metadata/               # calibration, 6-DoF poses, timestamps
  annotations/            # action labels, segments, success/failure
  quality_report.pdf       # inter-annotator agreement + QA
  lerobot/  rlds/  hdf5/   # robotics-ready exports
```

## Provenance, consent & limitations

- Contributors gave explicit, withdrawable consent and were paid above the local
  market rate. No contributors under 18.
- Faces, plates, screens and PII are redacted.
- Captured under India's DPDP Act; full datasets ship with a GDPR-aligned DPA.
- **Limitations:** this is a small sample for evaluation; coverage of
  environments and objects is intentionally narrow. See the dataset card for
  splits and known gaps.

## Citation

```
@misc{nxted_industrial_egocentric_sample,
  title  = {nxted Industrial Egocentric Sample},
  author = {OFORO LTD},
  year   = {2026},
  howpublished = {\url{https://nxted.ai/capture}}
}
```

## Also publish on

- **Kaggle Datasets** (same card + files) for a second discovery surface.
- Ensure the live `Dataset` JSON-LD on https://nxted.ai/capture stays accurate so
  the offering is eligible for **Google Dataset Search**.
