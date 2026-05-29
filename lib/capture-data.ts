// Researched, sourced data for the Capture page. May 2026.
// Market forecasts are quoted as attributed estimates (they diverge widely).

export const OPPORTUNITY_STATS = [
  {
    value: 38,
    prefix: '$',
    suffix: 'B',
    label: 'Humanoid robot market by 2035',
    source: 'Goldman Sachs',
  },
  {
    value: 100,
    prefix: '$',
    suffix: 'M+',
    label: 'Spent yearly by robotics firms buying real-world data',
    source: 'MIT Technology Review',
  },
  {
    value: 5000,
    suffix: ' hrs',
    label: 'The entire open-source robot dataset supply, combined',
    source: 'Scale AI',
  },
  {
    value: 228,
    suffix: '%',
    label: 'Policy gain from human egocentric data vs robot data alone',
    source: 'Meta · EgoMimic',
  },
] as const;

export const CAPTURE_STEPS = [
  {
    n: '01',
    title: 'Source verified skilled workers',
    body: 'We recruit and verify tradespeople across India - tailors, machinists, carpenters, chefs, medical staff - matched to the skill and level you need.',
  },
  {
    n: '02',
    title: 'Fit the capture rig',
    body: 'Workers wear egocentric (first-person) glasses built on research-standard devices, plus depth and hand-pose sensors for robotics-ready tiers.',
  },
  {
    n: '03',
    title: 'Record real tasks, real environments',
    body: 'We film the actual job in the actual workshop - not a sterile lab. Diversity of scene and object is what the scaling laws reward.',
  },
  {
    n: '04',
    title: 'Annotate & segment',
    body: 'Action segmentation, first-person narration, hand-pose tracks, 6DoF trajectory, and skill-level metadata - the Ego4D / Ego-Exo4D methodology.',
  },
  {
    n: '05',
    title: 'Quality & consent review',
    body: 'Every batch is reviewed by our expert team. Signed releases, PII blurring, and a GDPR-compliant DPA cover every frame before delivery.',
  },
  {
    n: '06',
    title: 'Deliver in your format',
    body: 'LeRobot, RLDS, HDF5, or MP4 + sidecars - dropped straight into your imitation-learning or VLA training stack.',
  },
] as const;

export const RIG_TIERS = [
  {
    name: 'Entry',
    tagline: 'High-volume, low-cost',
    sensors: ['Head-mounted 4K RGB camera', 'Built-in IMU (accel + gyro)'],
    outputs: ['1080p / 30fps video', 'Motion telemetry', 'Action timestamps + narration'],
    formats: ['MP4 + JSON/CSV sidecars', 'Convertible to LeRobot'],
    bestFor: 'Pre-training video corpora; scaling across many workers fast',
    builtOn: 'UMI-style GoPro capture',
  },
  {
    name: 'Standard',
    tagline: 'Research-grade egocentric',
    sensors: ['Aria-class glasses: RGB + SLAM cameras', 'Eye tracking', 'Dual IMU + spatial audio', 'Optional fixed exo camera'],
    outputs: ['RGB up to 1408² / 30fps', '6DoF SLAM trajectory', 'Eye gaze + hand tracking'],
    formats: ['LeRobot (Parquet + MP4 + JSON)', 'MP4 + sidecars'],
    bestFor: 'The human→humanoid recipe - same glasses on worker and robot',
    builtOn: 'Meta Project Aria',
    featured: true,
  },
  {
    name: 'Robotics-ready',
    tagline: 'Direct policy training',
    sensors: ['Everything in Standard', 'RealSense / ZED depth', 'Hand-pose mocap gloves or UMI gripper', 'Multi-view exocentric'],
    outputs: ['RGB-D + point clouds', 'Per-joint hand pose', 'Gripper width / contact', '6DoF trajectory + gaze'],
    formats: ['LeRobot', 'RLDS / TFDS', 'HDF5 (ALOHA / robomimic)'],
    bestFor: 'Imitation learning & VLA training; Open X-Embodiment-ready',
    builtOn: 'Aria + RealSense + DexCap / UMI',
  },
] as const;

export const PROOF_POINTS = [
  {
    tag: 'Demand',
    title: 'DoorDash pays couriers to film chores',
    body: 'In March 2026 DoorDash put dishwashing, laundry-folding and other household tasks in front of ~8M couriers - paid, body-worn capture sold to robotics partners. The gig economy is now the training layer for physical AI.',
    metric: '~8M couriers mobilised',
    href: 'https://www.pymnts.com/artificial-intelligence-2/2026/the-gig-economy-is-now-the-training-layer-for-ai/',
    source: 'PYMNTS',
  },
  {
    tag: 'Validation',
    title: 'One hour of human data beats one hour of robot data',
    body: 'Georgia Tech\'s EgoMimic, built on Meta Project Aria glasses, trained a bimanual humanoid from ~90 minutes of first-person human video - a 400% jump over prior methods, and +34-228% over robot teleoperation data alone.',
    metric: '+400% from 90 minutes',
    href: 'https://ai.meta.com/blog/egomimic-project-aria-georgia-tech-ego4d-robotics-embodied-ai/',
    source: 'Meta AI',
  },
  {
    tag: 'Scaling law',
    title: '20,000+ hours → a scaling law for robot hands',
    body: 'NVIDIA EgoScale pretrained on 20,854 hours of egocentric human manipulation video and found a log-linear scaling law: every doubling of human video hours yields a predictable gain in task success.',
    metric: '20,854 hours',
    href: 'https://arxiv.org/html/2602.16710v1',
    source: 'NVIDIA · arXiv',
  },
  {
    tag: 'Method',
    title: 'The data pyramid: human video → synthetic → real',
    body: 'NVIDIA\'s Isaac GR00T N1 turned 88 hours of real teleoperation into 827 hours and generated 780,000 synthetic trajectories in 11 hours - lifting performance ~40% over real data alone. Human capture is the high-value apex.',
    metric: '+40% over real-only',
    href: 'https://nvidianews.nvidia.com/news/nvidia-isaac-gr00t-n1-open-humanoid-robot-foundation-model-simulation-frameworks',
    source: 'NVIDIA',
  },
  {
    tag: 'Precedent',
    title: 'Apple EgoDex - 829 hours of dexterous hands',
    body: 'Apple recorded 829 hours of egocentric video with full 3D hand tracking across 194 tabletop tasks (90M frames) on Vision Pro - proof that first-person video of skilled hands is the data category that matters.',
    metric: '829 hrs · 194 tasks',
    href: 'https://github.com/apple/ml-egodex',
    source: 'Apple ML Research',
  },
  {
    tag: 'In-the-wild',
    title: 'UMI: capture without a robot in the room',
    body: 'The Universal Manipulation Interface - a handheld gripper + camera worn by a human - produces hardware-agnostic policies that transfer zero-shot across robots. It is exactly the nxted Capture model: skilled humans, real environments.',
    metric: 'Zero-shot transfer',
    href: 'https://umi-gripper.github.io/',
    source: 'Stanford · UMI',
  },
] as const;

export const FURTHER_READING = [
  { label: 'Scale AI - Expanding the Data Engine for Physical AI', href: 'https://scale.com/blog/physical-ai' },
  { label: 'Meta - Ego-Exo4D: skilled human activity dataset', href: 'https://ai.meta.com/blog/ego-exo4d-video-learning-perception/' },
  { label: 'Google DeepMind - Open X-Embodiment (1M+ trajectories)', href: 'https://robotics-transformer-x.github.io/' },
  { label: 'Data Scaling Laws in Imitation Learning (ICLR 2025)', href: 'https://arxiv.org/abs/2410.18647' },
  { label: 'Goldman Sachs - humanoid robot market forecast', href: 'https://www.goldmansachs.com/insights/articles/the-global-market-for-robots-could-reach-38-billion-by-2035' },
  { label: 'MIT Technology Review - the humanoid data gig economy', href: 'https://www.technologyreview.com/2026/04/01/1134863/humanoid-data-training-gig-economy-2026-breakthrough-technology/' },
  { label: 'Hugging Face - the LeRobot dataset format', href: 'https://huggingface.co/blog/lerobot-datasets-v3' },
  { label: 'Meta - Project Aria Gen 2 research glasses', href: 'https://www.meta.com/blog/project-aria-gen-2-next-generation-egocentric-research-glasses-reality-labs-ai-robotics/' },
] as const;
