import type { EntityPage } from '@/components/seo/EntityPageView';

const TEST_KIT = { ctaHref: '/portal/capture/new', ctaLabel: 'Request a Physical AI Test Kit' };

// ─────────────────────────── Vertical landing pages ───────────────────────────
export const VERTICALS: EntityPage[] = [
  {
    slug: 'electrical-assembly',
    eyebrow: 'Industrial vertical',
    accent: 'capture',
    title: 'Electrical Assembly Robot Training Data',
    metaTitle: 'Electrical Assembly Robot Training Data | nxted',
    metaDesc:
      'Egocentric demonstration data of skilled electrical assembly - panel wiring, termination, inspection - for robot training. Consented, robotics-ready (LeRobot/RLDS/HDF5).',
    keywords: ['electrical assembly robot training data', 'industrial manipulation dataset', 'panel wiring data'],
    question: 'What is electrical-assembly training data for robots?',
    directAnswer:
      'Electrical-assembly training data is egocentric (first-person) video of skilled electricians wiring panels, terminating circuits and assembling components - with depth, hand pose and action labels. It teaches robots the fine bimanual manipulation, tool use and inspection that generic factory footage and open datasets do not cover.',
    sections: [
      {
        heading: 'What nxted captures',
        body: 'Recorded from the worker’s point of view by credentialed electricians, with a safety and PPE record for each site.',
        bullets: [
          'Panel wiring, termination and dressing of cable looms',
          'DIN-rail mounting and component placement',
          'Connector insertion, crimping and torque steps',
          'Continuity and visual inspection',
          'Hand pose, 6-DoF trajectories and action/success labels',
        ],
      },
      {
        heading: 'Why electrical-assembly data is scarce and valuable',
        body: 'Open robot datasets such as Open X-Embodiment skew toward tabletop pick-and-place. Electrical work needs qualified people, fine tolerances and real safety controls, so it is rarely free or gig-collectable - while automation demand in manufacturing is high. Peer-reviewed imitation-learning scaling laws (ICLR 2025) show generalisation tracks the diversity of environments and objects, which industrial capture provides.',
      },
      {
        heading: 'How nxted delivers it',
        body: 'Every dataset ships robotics-ready in LeRobot, RLDS and HDF5, with full metadata, a dataset card and a Data Trust Pack (consent, fair pay, redaction, provenance, QA). Start with a Physical AI Test Kit before committing to a full dataset.',
      },
    ],
    faq: [
      { q: 'What is electrical-assembly robot training data?', a: 'Egocentric demonstrations of skilled electrical work - panel wiring, termination, component placement and inspection - annotated with hand pose and action labels, used to train manipulation policies.' },
      { q: 'Why not just use factory CCTV footage?', a: 'CCTV is third-person, unlabelled and rarely consented. Robots need first-person demonstrations with action and pose data from qualified workers - especially for safety-critical electrical tasks.' },
      { q: 'What formats is it delivered in?', a: 'LeRobot, RLDS and HDF5, plus raw and processed video, metadata, a dataset card and a QA report.' },
      { q: 'Is the capture consented and safe?', a: 'Yes - credentialed contributors, paid above local market rate, explicit consent, redaction, and an on-site safety/PPE record, under a DPDP and GDPR-aligned DPA.' },
    ],
    related: [
      { label: 'nxted Capture', href: '/capture' },
      { label: 'Industrial manipulation datasets', href: '/research/industrial-manipulation-datasets' },
      { label: 'Electronics assembly data', href: '/data/electronics-assembly' },
      { label: 'LeRobot format', href: '/formats/lerobot' },
    ],
    ...TEST_KIT,
  },
  {
    slug: 'cnc-machining',
    eyebrow: 'Industrial vertical',
    accent: 'capture',
    title: 'CNC & Machine-Tending Demonstration Data',
    metaTitle: 'CNC & Machine-Tending Demonstration Data | nxted',
    metaDesc:
      'Egocentric demonstration data of CNC setup, machine tending and inspection for robot training - skilled machinists, robotics-ready formats, consented.',
    keywords: ['CNC machining data', 'machine tending demonstration data', 'industrial manipulation dataset'],
    question: 'What is CNC and machine-tending data for robots?',
    directAnswer:
      'CNC and machine-tending data is first-person video of skilled machinists setting up machines, loading and unloading parts, changing tools and inspecting output - with pose and action labels. It captures the precise, repeatable manipulation robots need for machine tending, which open datasets barely cover.',
    sections: [
      {
        heading: 'What nxted captures',
        body: 'Recorded from skilled machinists on real shop floors.',
        bullets: [
          'Lathe and mill setup and workholding',
          'Part load / unload and machine tending cycles',
          'Tool changes and offsets',
          'In-process and final quality inspection',
          'Hand pose, 6-DoF trajectories, action and success/failure labels',
        ],
      },
      {
        heading: 'Why machine-tending data matters',
        body: 'Machine tending is one of the highest-ROI robotics applications, but the demonstrations are scarce: they need credentialed machinists, real fixtures and consequences for error. Diverse, skilled capture is exactly what imitation-learning scaling laws reward and what lab-bound datasets like Open X-Embodiment lack.',
      },
      {
        heading: 'How nxted delivers it',
        body: 'Robotics-ready in LeRobot, RLDS and HDF5 with full metadata, a dataset card and a Data Trust Pack. Validate quality with a Physical AI Test Kit first.',
      },
    ],
    faq: [
      { q: 'What is machine-tending training data?', a: 'First-person demonstrations of loading, unloading and tending machines (CNC lathes, mills) with action and pose labels, used to train robot tending policies.' },
      { q: 'Who performs the demonstrations?', a: 'Credentialed, skilled machinists, consented and paid above local market rate, with an on-site safety record.' },
      { q: 'What formats are available?', a: 'LeRobot, RLDS and HDF5, plus raw/processed video, metadata, dataset card and QA report.' },
    ],
    related: [
      { label: 'nxted Capture', href: '/capture' },
      { label: 'Electrical assembly data', href: '/data/electrical-assembly' },
      { label: 'RLDS format', href: '/formats/rlds' },
      { label: 'Industrial manipulation datasets', href: '/research/industrial-manipulation-datasets' },
    ],
    ...TEST_KIT,
  },
  {
    slug: 'garment-manipulation',
    eyebrow: 'Deformable objects',
    accent: 'capture',
    title: 'Garment & Deformable-Object Manipulation Data',
    metaTitle: 'Garment Manipulation Dataset (Deformable Objects) | nxted',
    metaDesc:
      'Egocentric demonstration data of garment and deformable-object manipulation - folding, stitching, handling cloth - from skilled tailors, robotics-ready and consented.',
    keywords: ['garment manipulation dataset', 'deformable object data', 'cloth manipulation robot data'],
    question: 'Why is garment-manipulation data hard and valuable?',
    directAnswer:
      'Deformable objects like cloth have near-infinite configurations, self-occlude and deform unpredictably when grasped, making garment manipulation one of the hardest open problems in robotics. High-quality demonstrations from skilled tailors are scarce and valuable - and apply to a large apparel, laundry and soft-goods market.',
    sections: [
      {
        heading: 'What nxted captures',
        body: 'Recorded from skilled tailors and textile workers, often with a second reference angle to handle occlusion.',
        bullets: [
          'Aligning, folding and pressing fabric',
          'Hand and machine stitching, pattern handling',
          'Bimanual coordination across sub-steps',
          'Hand pose and action segmentation with success labels',
          'Diversity of fabrics, garments and conditions',
        ],
      },
      {
        heading: 'Why deformable-object data is scarce',
        body: 'Rigid-object methods do not transfer to cloth, and simulation struggles with fabric dynamics, so real human demonstrations are the practical path. Tailors bring decades of dexterity that gig crowds cannot match.',
      },
      {
        heading: 'How nxted delivers it',
        body: 'Robotics-ready in LeRobot, RLDS and HDF5 with metadata, a dataset card and a Data Trust Pack. Start with a Physical AI Test Kit.',
      },
    ],
    faq: [
      { q: 'Why is cloth hard for robots?', a: 'Fabric has near-infinite configurations, self-occludes and deforms as you grasp it, so methods built for rigid objects do not transfer. Real human demonstrations are the most practical training signal.' },
      { q: 'Who provides garment demonstrations?', a: 'Skilled tailors and textile workers, consented and fairly paid, recorded egocentrically (often multi-view) with hand-pose and action labels.' },
      { q: 'What formats?', a: 'LeRobot, RLDS and HDF5 with metadata, dataset card and QA report.' },
    ],
    related: [
      { label: 'nxted Capture', href: '/capture' },
      { label: 'Garment manipulation explainer', href: '/research/garment-manipulation-deformable-object-data' },
      { label: 'HDF5 format', href: '/formats/hdf5' },
    ],
    ...TEST_KIT,
  },
  {
    slug: 'warehouse-handling',
    eyebrow: 'Logistics vertical',
    accent: 'capture',
    title: 'Warehouse & Material-Handling Training Data',
    metaTitle: 'Warehouse & Material-Handling Robot Data | nxted',
    metaDesc:
      'Egocentric demonstration data of warehouse picking, packing and material handling for robot training - robotics-ready formats, consented contributors.',
    keywords: ['warehouse handling robot data', 'pick and pack dataset', 'logistics manipulation data'],
    question: 'What is warehouse and material-handling data for robots?',
    directAnswer:
      'Warehouse and material-handling data is first-person video of workers picking, packing, palletising and moving goods across many SKUs and conditions - with pose and action labels. It gives robot policies the object and environment diversity that drives generalisation for logistics manipulation.',
    sections: [
      {
        heading: 'What nxted captures',
        body: 'Recorded across realistic warehouse settings and item types.',
        bullets: [
          'Pick and place across many SKUs and shapes',
          'Packing, sorting and palletising',
          'Tote and conveyor handling',
          'Action segmentation, hand pose and success labels',
          'Lighting, clutter and layout variation',
        ],
      },
      {
        heading: 'Why diversity beats volume here',
        body: 'Logistics generalisation depends on breadth of objects and environments more than raw hours - the finding of the ICLR 2025 imitation-learning scaling-laws paper. A diverse warehouse-handling set across many SKUs and layouts is high-value training data.',
      },
      {
        heading: 'How nxted delivers it',
        body: 'Robotics-ready in LeRobot, RLDS and HDF5 with metadata, a dataset card and a Data Trust Pack. Begin with a Physical AI Test Kit.',
      },
    ],
    faq: [
      { q: 'What does warehouse-handling data include?', a: 'First-person demonstrations of picking, packing, palletising and moving goods across many SKUs, with action and pose labels.' },
      { q: 'Why does object diversity matter?', a: 'Robot-policy generalisation tracks the number of distinct objects and environments seen, so a broad SKU and layout range outperforms a narrow, repetitive set.' },
      { q: 'What formats?', a: 'LeRobot, RLDS and HDF5 with metadata, dataset card and QA report.' },
    ],
    related: [
      { label: 'nxted Capture', href: '/capture' },
      { label: 'How to buy robotics training data', href: '/research/how-to-buy-robotics-training-data' },
      { label: 'LeRobot vs RLDS vs HDF5', href: '/research/lerobot-vs-rlds-vs-hdf5' },
    ],
    ...TEST_KIT,
  },
  {
    slug: 'electronics-assembly',
    eyebrow: 'Industrial vertical',
    accent: 'capture',
    title: 'Electronics Assembly Demonstration Data',
    metaTitle: 'Electronics Assembly Robot Training Data | nxted',
    metaDesc:
      'Egocentric demonstration data of electronics assembly - component placement, connector work, inspection - for robot training. Consented, robotics-ready.',
    keywords: ['electronics assembly robot data', 'PCB assembly demonstration data', 'industrial manipulation dataset'],
    question: 'What is electronics-assembly data for robots?',
    directAnswer:
      'Electronics-assembly data is first-person video of skilled workers placing components, seating connectors, routing and inspecting electronic assemblies - with hand pose and action labels. It captures the fine, precise manipulation that robots need for electronics work and that open datasets do not provide.',
    sections: [
      {
        heading: 'What nxted captures',
        body: 'Recorded from credentialed assemblers in real workspaces.',
        bullets: [
          'Component placement and seating',
          'Connector insertion and harness routing',
          'Fastening and small-part handling',
          'Functional and visual inspection',
          'Hand pose, action segmentation and success/failure labels',
        ],
      },
      {
        heading: 'Why electronics data is hard to source',
        body: 'Electronics assembly demands precision, qualified workers and clean environments, so demonstrations are scarce and rarely gig-collectable. The diversity of components and steps is exactly what scaling laws reward.',
      },
      {
        heading: 'How nxted delivers it',
        body: 'Robotics-ready in LeRobot, RLDS and HDF5 with metadata, a dataset card and a Data Trust Pack. Validate with a Physical AI Test Kit first.',
      },
    ],
    faq: [
      { q: 'What is electronics-assembly training data?', a: 'Egocentric demonstrations of placing components, seating connectors and inspecting electronics, annotated with hand pose and action labels for robot training.' },
      { q: 'Who performs it?', a: 'Credentialed assemblers, consented and fairly paid, recorded first-person with action and pose data.' },
      { q: 'What formats?', a: 'LeRobot, RLDS and HDF5 with metadata, dataset card and QA report.' },
    ],
    related: [
      { label: 'nxted Capture', href: '/capture' },
      { label: 'Electrical assembly data', href: '/data/electrical-assembly' },
      { label: 'CNC & machine-tending data', href: '/data/cnc-machining' },
    ],
    ...TEST_KIT,
  },
];

// ─────────────────────────────── Format pages ───────────────────────────────
export const FORMATS: EntityPage[] = [
  {
    slug: 'lerobot',
    eyebrow: 'Dataset format',
    accent: 'expert',
    title: 'LeRobot Format: What It Is and How nxted Delivers It',
    metaTitle: 'LeRobot Dataset Format Explained | nxted',
    metaDesc:
      'What the LeRobot robotics dataset format is (Parquet + MP4 + JSON), when to use it, and how nxted delivers egocentric capture data in LeRobot.',
    keywords: ['LeRobot format', 'LeRobot dataset', 'robotics dataset format'],
    question: 'What is the LeRobot dataset format?',
    directAnswer:
      'LeRobot is Hugging Face’s open robotics library and dataset format. It stores episodes as Parquet (state and action) plus MP4 video and JSON metadata, with first-class tooling and easy sharing on the Hugging Face Hub. It is a friendly default for training and distributing imitation-learning datasets.',
    sections: [
      {
        heading: 'What a LeRobot dataset contains',
        body: 'Per-episode observations and actions in Parquet, video in MP4, and JSON metadata (features, fps, splits), designed to load directly into the LeRobot trainer.',
        bullets: [
          'Parquet tables for state and action streams',
          'MP4 video per camera',
          'JSON metadata: features, control frequency, splits',
          'Hugging Face Hub integration for sharing',
        ],
      },
      {
        heading: 'When to choose LeRobot',
        body: 'Pick LeRobot if you use the LeRobot trainer or want the friendliest tooling and easy dataset sharing. See our LeRobot vs RLDS vs HDF5 guide to compare.',
      },
      {
        heading: 'How nxted delivers LeRobot data',
        body: 'Every nxted Capture dataset can ship in LeRobot, alongside RLDS and HDF5, with full metadata, a dataset card and a Data Trust Pack.',
      },
    ],
    faq: [
      { q: 'What is LeRobot?', a: 'Hugging Face’s open robotics library and dataset format, storing episodes as Parquet plus MP4 video and JSON metadata for imitation learning.' },
      { q: 'How is LeRobot different from RLDS and HDF5?', a: 'LeRobot is Parquet/MP4/JSON with Hub sharing; RLDS is the TFDS format behind Open X-Embodiment; HDF5 is a general scientific container used by ALOHA and robomimic.' },
      { q: 'Does nxted deliver in LeRobot?', a: 'Yes - LeRobot, RLDS and HDF5 are all available, with metadata, a dataset card and a QA report.' },
    ],
    related: [
      { label: 'LeRobot vs RLDS vs HDF5', href: '/research/lerobot-vs-rlds-vs-hdf5' },
      { label: 'RLDS format', href: '/formats/rlds' },
      { label: 'HDF5 format', href: '/formats/hdf5' },
      { label: 'nxted Capture', href: '/capture' },
    ],
    ctaHref: '/portal/capture/new',
    ctaLabel: 'Request a dataset in LeRobot',
  },
  {
    slug: 'rlds',
    eyebrow: 'Dataset format',
    accent: 'expert',
    title: 'RLDS Format: What It Is and How nxted Delivers It',
    metaTitle: 'RLDS Dataset Format Explained | nxted',
    metaDesc:
      'What the RLDS robotics dataset format is (TFDS, behind Open X-Embodiment), when to use it, and how nxted delivers egocentric data in RLDS.',
    keywords: ['RLDS format', 'RLDS dataset', 'Open X-Embodiment format'],
    question: 'What is the RLDS dataset format?',
    directAnswer:
      'RLDS (Reinforcement Learning Datasets) is a TensorFlow-Datasets format for storing episodic robot and RL data. It is the format behind the cross-embodiment Open X-Embodiment / RT-X collection, so it is the natural choice if you train on or alongside that data.',
    sections: [
      {
        heading: 'What an RLDS dataset contains',
        body: 'Episodes of per-timestep steps (observation, action, reward, discount) stored as sharded TFDS records, with dataset features and metadata.',
        bullets: [
          'TFDS-sharded episodes and steps',
          'Observation / action / reward / discount per step',
          'Feature specs and dataset metadata',
          'Compatible with Open X-Embodiment tooling',
        ],
      },
      {
        heading: 'When to choose RLDS',
        body: 'Choose RLDS if you train alongside Open X-Embodiment data or in a TFDS pipeline. See our format comparison for trade-offs.',
      },
      {
        heading: 'How nxted delivers RLDS data',
        body: 'nxted Capture datasets can ship in RLDS, alongside LeRobot and HDF5, with metadata, a dataset card and a Data Trust Pack.',
      },
    ],
    faq: [
      { q: 'What is RLDS?', a: 'A TensorFlow-Datasets format for episodic robot and RL data, used by the Open X-Embodiment / RT-X collection.' },
      { q: 'When should I use RLDS?', a: 'When you train on or alongside Open X-Embodiment data, or use a TFDS-based pipeline.' },
      { q: 'Does nxted deliver in RLDS?', a: 'Yes - RLDS, LeRobot and HDF5 are all available with metadata, a dataset card and a QA report.' },
    ],
    related: [
      { label: 'LeRobot vs RLDS vs HDF5', href: '/research/lerobot-vs-rlds-vs-hdf5' },
      { label: 'LeRobot format', href: '/formats/lerobot' },
      { label: 'HDF5 format', href: '/formats/hdf5' },
      { label: 'nxted Capture', href: '/capture' },
    ],
    ctaHref: '/portal/capture/new',
    ctaLabel: 'Request a dataset in RLDS',
  },
  {
    slug: 'hdf5',
    eyebrow: 'Dataset format',
    accent: 'expert',
    title: 'HDF5 Format: What It Is and How nxted Delivers It',
    metaTitle: 'HDF5 Robotics Dataset Format Explained | nxted',
    metaDesc:
      'What the HDF5 robotics dataset format is (used by ALOHA and robomimic), when to use it, and how nxted delivers egocentric data in HDF5.',
    keywords: ['HDF5 format', 'HDF5 robotics dataset', 'ALOHA robomimic format'],
    question: 'What is the HDF5 dataset format for robotics?',
    directAnswer:
      'HDF5 is a general, self-describing scientific container (from the HDF Group) widely used in robotics by the ALOHA and robomimic conventions. It stores trajectories as nested groups and datasets, with mature libraries in every language - a flexible, well-supported choice for robot data.',
    sections: [
      {
        heading: 'What an HDF5 dataset contains',
        body: 'Trajectories stored as nested groups and arrays (observations, actions, rewards), with attributes for metadata.',
        bullets: [
          'Self-describing groups and datasets',
          'Per-trajectory observations and actions',
          'Attributes for calibration and control frequency',
          'Mature tooling in Python, C, MATLAB and more',
        ],
      },
      {
        heading: 'When to choose HDF5',
        body: 'Choose HDF5 if you use ALOHA or robomimic pipelines or want a flexible, language-agnostic container. See our format comparison for details.',
      },
      {
        heading: 'How nxted delivers HDF5 data',
        body: 'nxted Capture datasets can ship in HDF5, alongside LeRobot and RLDS, with metadata, a dataset card and a Data Trust Pack.',
      },
    ],
    faq: [
      { q: 'What is HDF5 in robotics?', a: 'A general scientific container used by the ALOHA and robomimic conventions to store robot trajectories as nested groups and arrays.' },
      { q: 'When should I use HDF5?', a: 'When you use ALOHA/robomimic pipelines or want a flexible, language-agnostic format.' },
      { q: 'Does nxted deliver in HDF5?', a: 'Yes - HDF5, LeRobot and RLDS are all available with metadata, a dataset card and a QA report.' },
    ],
    related: [
      { label: 'LeRobot vs RLDS vs HDF5', href: '/research/lerobot-vs-rlds-vs-hdf5' },
      { label: 'LeRobot format', href: '/formats/lerobot' },
      { label: 'RLDS format', href: '/formats/rlds' },
      { label: 'nxted Capture', href: '/capture' },
    ],
    ctaHref: '/portal/capture/new',
    ctaLabel: 'Request a dataset in HDF5',
  },
];

// ───────────────────────── Alternative / comparison pages ─────────────────────────
export const ALTERNATIVES: EntityPage[] = [
  {
    slug: 'scale-ai',
    eyebrow: 'Alternatives',
    accent: 'expert',
    title: 'Scale AI Alternative for Physical-AI Data',
    metaTitle: 'Scale AI Alternative for Physical-AI Data | nxted',
    metaDesc:
      'Looking for a Scale AI alternative for egocentric, physical-AI robot data? An honest look at where each fits and how to choose, UK/EU/India.',
    keywords: ['Scale AI alternative', 'physical AI data provider', 'egocentric data providers for robotics'],
    question: 'What is a good Scale AI alternative for robot data?',
    directAnswer:
      'Scale AI is a large, capable data platform best known for annotation and model evaluation at scale. If your specific need is egocentric, physical-AI capture of skilled human work delivered robotics-ready with provenance, a specialist capture provider such as nxted is often a closer fit. Choose on skill depth, formats and compliance, not brand.',
    sections: [
      {
        heading: 'Why the need is different for physical AI',
        body: 'General data platforms excel at large-scale labelling and crowd evaluation. Physical AI has a different bottleneck: there is no web-scale corpus of manipulation, so you need new first-person recordings of skilled tasks, with depth and pose, in robotics formats. That is a capture problem more than a labelling problem.',
      },
      {
        heading: 'Where nxted fits (and where it does not)',
        body: 'nxted is a good fit if you need expert-reviewed egocentric demonstrations of skilled industrial or technical work, consented and delivered robotics-ready and UK/EU-contracted. It is not the right tool if you simply need a large pool of bounding-box image labels - a general annotation vendor is better for that.',
      },
      {
        heading: 'How to compare honestly',
        body: 'Compare on skill verification, output formats (LeRobot/RLDS/HDF5), provenance and consent, jurisdiction (UK/EU contracting, EU AI Act and DPDP position), and whether you can start with a low-risk test kit. We do not disparage other vendors - the right choice depends on your task.',
      },
    ],
    faq: [
      { q: 'What is a Scale AI alternative for robot data?', a: 'For egocentric, physical-AI capture specifically, specialist capture providers such as nxted, plus open datasets like Open X-Embodiment, are often a closer fit than general labelling platforms.' },
      { q: 'When is a general platform still better?', a: 'When you need very large-scale image/video annotation rather than new first-person demonstrations of skilled physical work.' },
      { q: 'Can I get UK/EU-compliant robot data?', a: 'Yes - look for UK/EU contracting, a signed DPA, redaction, and a clear EU AI Act and DPDP position.' },
    ],
    related: [
      { label: 'Compare egocentric data providers', href: '/compare/egocentric-data-providers' },
      { label: 'Appen alternative', href: '/alternatives/appen' },
      { label: 'Scale AI & Appen alternatives (guide)', href: '/research/scale-ai-appen-alternatives-physical-ai-data' },
    ],
    ctaHref: '/capture',
    ctaLabel: 'See how nxted compares',
  },
  {
    slug: 'appen',
    eyebrow: 'Alternatives',
    accent: 'expert',
    title: 'Appen Alternative for Physical-AI Data',
    metaTitle: 'Appen Alternative for Physical-AI Data | nxted',
    metaDesc:
      'Looking for an Appen alternative for egocentric, physical-AI robot data? An honest look at where each fits and how to choose.',
    keywords: ['Appen alternative', 'physical AI data provider', 'egocentric data providers for robotics'],
    question: 'What is a good Appen alternative for physical AI?',
    directAnswer:
      'Appen is a large data-annotation and collection company. If you need first-person demonstrations of skilled manual work - rather than large-scale annotation - a specialist egocentric-capture provider with provenance and robotics formats, such as nxted, is usually the better match. Compare on skill depth, formats and compliance.',
    sections: [
      {
        heading: 'Annotation vs egocentric capture',
        body: 'Broad annotation vendors are strong on volume labelling. Physical AI needs new egocentric recordings of skilled tasks with depth, hand pose and action labels - a capture problem that benefits from credentialed contributors and provenance.',
      },
      {
        heading: 'Where nxted fits',
        body: 'nxted records expert-reviewed demonstrations of skilled industrial and technical work, consented and delivered robotics-ready (LeRobot/RLDS/HDF5) with a Data Trust Pack, UK/EU-contracted. It sits alongside - not instead of - large generalist vendors and open datasets.',
      },
      {
        heading: 'How to choose',
        body: 'Evaluate skill verification, formats, provenance and consent, jurisdiction and a low-risk test kit. The honest answer is that the best provider depends on whether you need annotation volume or skilled demonstrations.',
      },
    ],
    faq: [
      { q: 'What is an Appen alternative for physical AI?', a: 'If you need first-person demonstrations of skilled manual work rather than large-scale annotation, a specialist egocentric-capture provider with provenance and robotics formats is usually the better fit.' },
      { q: 'Does nxted replace a generalist vendor?', a: 'No - nxted is the specialist capture and expert-evaluation layer that complements generalist annotation vendors and open datasets.' },
      { q: 'Is the data compliant for UK/EU?', a: 'Yes - UK/EU contracting, a signed DPA, redaction, and a clear EU AI Act and DPDP position.' },
    ],
    related: [
      { label: 'Compare egocentric data providers', href: '/compare/egocentric-data-providers' },
      { label: 'Scale AI alternative', href: '/alternatives/scale-ai' },
      { label: 'Best egocentric data providers (guide)', href: '/research/best-egocentric-data-providers-for-robotics' },
    ],
    ctaHref: '/capture',
    ctaLabel: 'See how nxted compares',
  },
];

export const bySlug = (arr: EntityPage[], slug: string) => arr.find((e) => e.slug === slug);
