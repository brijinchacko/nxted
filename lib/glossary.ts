export interface GlossaryTerm {
  slug: string;
  term: string;
  short: string; // 40-60 word definition (the citable unit)
  body: string[]; // 1-2 short paragraphs
  related?: { label: string; href: string }[];
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'egocentric-data',
    term: 'Egocentric data',
    short:
      'Egocentric data is video recorded from the first-person point of view of the person performing a task - what a robot’s own camera would see - usually with depth, hand pose and a 6-DoF trajectory. It is the scarce ingredient for teaching robots manipulation, because there is no web-scale corpus of physical actions.',
    body: [
      'Egocentric (first-person) capture aligns the viewpoint with a robot’s head- or wrist-mounted sensors, which is why policies trained on it transfer. Large research efforts such as Ego4D and Ego-Exo4D were built to capture this viewpoint at scale.',
    ],
    related: [
      { label: 'What is egocentric data (guide)', href: '/research/what-is-egocentric-data' },
      { label: 'Egocentric data for robotics', href: '/capture' },
    ],
  },
  {
    slug: 'physical-ai',
    term: 'Physical AI',
    short:
      'Physical AI is artificial intelligence that perceives and acts in the physical world - humanoid robots, manipulators and embodied agents - rather than only producing text or images. Its main bottleneck is data: first-person demonstrations of real physical tasks, which must be recorded rather than scraped.',
    body: [
      'Unlike digital AI, physical AI interacts with objects, contact forces and consequences, and there is no comparable archive of physical action. That is why the data layer, not compute or model size, is usually the constraint.',
    ],
    related: [
      { label: 'What is physical AI (guide)', href: '/research/what-is-physical-ai' },
      { label: 'nxted Capture', href: '/capture' },
    ],
  },
  {
    slug: 'vision-language-action',
    term: 'Vision-language-action (VLA) model',
    short:
      'A vision-language-action (VLA) model takes camera images and a natural-language instruction and outputs robot actions, extending vision-language models from text output to physical control. VLAs are trained on large collections of demonstration episodes, so their performance depends heavily on data volume, diversity and annotation.',
    body: [
      'Notable examples include Google DeepMind’s RT-2 and the open OpenVLA. Human egocentric demonstrations are increasingly used to pre-train or augment VLA policies because they are cheaper and more diverse than robot teleoperation.',
    ],
    related: [
      { label: 'VLA models and the data they need', href: '/research/vision-language-action-models-data' },
    ],
  },
  {
    slug: 'rlhf',
    term: 'RLHF (reinforcement learning from human feedback)',
    short:
      'RLHF improves an AI model by training it against human judgements of its outputs: humans rank or rate responses, a reward model learns those preferences, and the model is optimised toward them. The quality of the result depends heavily on who provides the feedback and how it is measured.',
    body: [
      'The modern recipe was popularised by OpenAI’s InstructGPT. For high-risk domains, domain-expert evaluation catches errors that generalist crowds miss.',
    ],
    related: [
      { label: 'What is RLHF (guide)', href: '/research/what-is-rlhf-human-evaluation' },
      { label: 'nxted Expert', href: '/expert' },
    ],
  },
  {
    slug: 'embodied-ai',
    term: 'Embodied AI',
    short:
      'Embodied AI is AI that learns and acts through a physical or simulated body that senses and moves in an environment - robots and embodied agents - as opposed to disembodied models that only process text or images. It needs interaction data, not just web data.',
    body: [
      'Embodied AI overlaps closely with physical AI; both depend on demonstrations of real tasks across diverse environments and objects.',
    ],
    related: [{ label: 'What is physical AI', href: '/research/what-is-physical-ai' }],
  },
  {
    slug: 'teleoperation',
    term: 'Teleoperation (robot data collection)',
    short:
      'Teleoperation is when a human drives a robot to perform a task while the robot’s own actions are recorded, producing action-aligned training data on the exact platform you will deploy. It is precise but slow and expensive to scale, so it is often blended with cheaper human egocentric video.',
    body: [
      'Tools such as ALOHA and the Universal Manipulation Interface (UMI) are used to collect teleoperation and to narrow the gap between human and robot data.',
    ],
    related: [
      { label: 'Human egocentric video vs teleoperation', href: '/research/human-egocentric-video-vs-teleoperation' },
    ],
  },
  {
    slug: 'rlds',
    term: 'RLDS',
    short:
      'RLDS (Reinforcement Learning Datasets) is a TensorFlow-Datasets format for episodic robot and RL data. It is the format behind the cross-embodiment Open X-Embodiment / RT-X collection, making it a natural choice when training on or alongside that data.',
    body: [],
    related: [
      { label: 'RLDS format page', href: '/formats/rlds' },
      { label: 'LeRobot vs RLDS vs HDF5', href: '/research/lerobot-vs-rlds-vs-hdf5' },
    ],
  },
  {
    slug: 'lerobot',
    term: 'LeRobot',
    short:
      'LeRobot is Hugging Face’s open robotics library and dataset format, storing episodes as Parquet (state and action) plus MP4 video and JSON metadata, with first-class tooling and easy sharing on the Hugging Face Hub.',
    body: [],
    related: [
      { label: 'LeRobot format page', href: '/formats/lerobot' },
      { label: 'LeRobot vs RLDS vs HDF5', href: '/research/lerobot-vs-rlds-vs-hdf5' },
    ],
  },
  {
    slug: 'hdf5',
    term: 'HDF5 (robotics)',
    short:
      'HDF5 is a general, self-describing scientific container from the HDF Group, widely used in robotics by the ALOHA and robomimic conventions. It stores trajectories as nested groups and arrays, with mature libraries in many languages.',
    body: [],
    related: [
      { label: 'HDF5 format page', href: '/formats/hdf5' },
      { label: 'LeRobot vs RLDS vs HDF5', href: '/research/lerobot-vs-rlds-vs-hdf5' },
    ],
  },
  {
    slug: 'data-provenance',
    term: 'Data provenance (robotics datasets)',
    short:
      'Data provenance is the documented record of where each piece of training data came from - who produced it, with what consent, and how it was processed. For robotics datasets it includes a provenance log tracing every clip to its source, plus a dataset card describing scope and limitations.',
    body: [
      'Provenance is increasingly a buying requirement under data-governance rules such as the EU AI Act and India’s DPDP Act.',
    ],
    related: [
      { label: 'Data Trust Pack', href: '/trust' },
      { label: 'Consent-first robotics data', href: '/research/consent-first-robotics-data' },
    ],
  },
  {
    slug: 'dpdp-act',
    term: 'DPDP Act (India)',
    short:
      'The Digital Personal Data Protection Act, 2023 is India’s data-protection law, setting obligations around consent, purpose limitation and data-principal rights. For India-sourced AI training data that contains personal information, capture must be consented and compliant with the DPDP Act.',
    body: [],
    related: [
      { label: 'Consent-first robotics data', href: '/research/consent-first-robotics-data' },
      { label: 'Trust & compliance', href: '/trust' },
    ],
  },
  {
    slug: 'eu-ai-act',
    term: 'EU AI Act',
    short:
      'The EU AI Act (Regulation (EU) 2024/1689) is the European Union’s law for artificial intelligence. It places data-governance duties on providers of high-risk AI systems - notably Article 10 (data quality and provenance) and Annex IV (technical documentation) - which your training-data vendor is part of.',
    body: [],
    related: [
      { label: 'EU AI Act position', href: '/legal/ai-act' },
      { label: 'Consent-first robotics data', href: '/research/consent-first-robotics-data' },
    ],
  },
];

export const glossaryBySlug = (slug: string) => GLOSSARY.find((g) => g.slug === slug);
