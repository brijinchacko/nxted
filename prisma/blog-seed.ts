// SEO/GEO blog posts for the keyword-mapped content program.
// Honest, cited content only - no invented statistics or testimonials.
// Rendered as markdown (no GFM tables in the renderer, so use lists).

export interface BlogSeedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDesc: string;
  content: string;
}

export const BLOG_POSTS: BlogSeedPost[] = [
  // ───────────────────────── Tier 1: buyer-intent ─────────────────────────
  {
    slug: 'best-egocentric-data-providers-for-robotics',
    title: 'Best Egocentric Data Providers for Robotics (2026)',
    excerpt:
      'A neutral guide to the kinds of companies that supply egocentric (first-person) data for robot learning, what each is good at, and how to choose.',
    category: 'Buyer Guide',
    tags: ['egocentric data', 'robotics', 'data providers', 'buyer guide'],
    metaTitle: 'Best Egocentric Data Providers for Robotics (2026)',
    metaDesc:
      'A neutral 2026 guide to egocentric data providers for robotics - the four categories, how to evaluate them, and where nxted fits.',
    content: `**TL;DR.** Egocentric data providers for robotics fall into four groups: broad annotation vendors, expert-evaluation networks, gig-scale egocentric collectors, and specialist physical-skill capture companies. The best fit depends on whether you need labelling volume, expert review, everyday-task breadth, or expert-reviewed demonstrations of skilled work delivered robotics-ready.

## What an egocentric data provider actually supplies

Egocentric data is video recorded from the doer's own point of view - what a robot's head- or wrist-mounted camera would see - usually paired with depth, hand pose and a 6-DoF trajectory. It is the scarce ingredient for manipulation policies, because there is no web-scale corpus of physical actions the way there is for text. Datasets like [Ego-Exo4D](https://ego-exo4d-data.org/) and the cross-embodiment [Open X-Embodiment / RT-X](https://robotics-transformer-x.github.io/) collection exist precisely because this data has to be recorded, not scraped.

## The four categories of provider

- **Broad annotation vendors.** Large data-labelling firms. Strong on volume and bounding-box / segmentation labelling; usually weaker on skill verification and on first-person capture of skilled manual work. Best when you already have footage and need it labelled at scale.
- **Expert-evaluation networks.** Marketplaces of credentialed reviewers built primarily for text and code evaluation (RLHF). Excellent for human judgement; not designed for physical capture. Best for model evaluation, not demonstrations.
- **Gig-scale egocentric collectors.** Networks that mobilise large crowds to film everyday household tasks. Strong on volume and diversity of common chores; limited reach into skilled, credentialed or industrial work. Best for generic home tasks.
- **Specialist physical-skill capture.** Companies that record expert demonstrations of specific trades and deliver them robotics-ready with provenance. Narrower throughput; deeper skill and compliance. Best for skilled manipulation and regulated buyers. nxted sits here.

## How to evaluate any provider

1. **Output formats.** Do they deliver in [LeRobot](https://github.com/huggingface/lerobot), [RLDS](https://github.com/google-research/rlds) and HDF5, or just raw video you have to convert?
2. **Provenance and consent.** Can they show who produced each clip, that it was consented, and that contributors were paid fairly?
3. **Skill verification.** For skilled tasks, can they prove the worker is actually qualified?
4. **Annotation depth.** Action segmentation, hand pose, 6-DoF, success/failure labels - or just video?
5. **Compliance.** A signed DPA, redaction, and a position on the [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) and India's DPDP Act if your training data touches personal data.

## Why diversity matters more than raw hours

The ICLR 2025 paper [Data Scaling Laws in Imitation Learning](https://arxiv.org/abs/2410.18647) found that a policy's ability to generalise follows roughly a power law in the *number of distinct environments and objects* it has seen - not simply the number of demonstrations. Practically, a diverse 200-hour dataset can beat a narrow 1,000-hour one, which is why breadth of workers, tools and settings is worth paying for.

## Where nxted fits

nxted is a specialist physical-skill capture company. We record expert-reviewed demonstrations of skilled industrial and technical work - electrical assembly, machine tending, CNC setup, electronics and inspection - from verified, consented contributors, and deliver them robotics-ready in LeRobot, RLDS and HDF5 with a [Data Trust Pack](/trust). See [nxted Capture](/capture) for the full method.

## FAQ

**Who are the egocentric data providers for robotics?**
They span broad annotation vendors, expert-evaluation networks, gig-scale egocentric collectors, and specialist physical-skill capture companies such as nxted. Each category trades volume against skill depth, annotation and compliance.

**What should I ask an egocentric data vendor?**
Ask about output formats (LeRobot/RLDS/HDF5), consent and provenance, skill verification, annotation depth, and a signed DPA with redaction and EU AI Act / DPDP alignment.

**Is more data always better for robot learning?**
No. Peer-reviewed scaling-law work suggests generalisation tracks the number of environments and objects more than raw demonstration count, so diversity often beats sheer volume.

---

*Ready to compare on your task? [Request a Physical AI Test Kit](/portal/capture/new) or read [how nxted Capture works](/capture).*`,
  },

  {
    slug: 'how-to-buy-robotics-training-data',
    title: 'How to Buy Robotics Training Data: A Buyer’s Guide',
    excerpt:
      'A practical, vendor-neutral guide to scoping, pricing and quality-checking a robotics training-data purchase - from test kit to full dataset.',
    category: 'Buyer Guide',
    tags: ['robotics training data', 'buyer guide', 'data collection', 'procurement'],
    metaTitle: 'How to Buy Robotics Training Data: A Buyer’s Guide',
    metaDesc:
      'How to buy robotics training data in 2026: scope the task, pick formats, check consent and quality, start with a test kit, then scale.',
    content: `**TL;DR.** To buy robotics training data, define the task and what "correct" looks like, choose your formats (LeRobot, RLDS or HDF5), insist on consent and provenance, start with a small paid test kit to validate quality, then scale by usable hours. The biggest mistakes are buying raw video without annotation and skipping a compliance review.

## Step 1: Specify the task, not just the hours

A good data spec names the skill, the environment, the objects, the camera viewpoint, and the success criterion. "1,000 hours of assembly" is not a spec; "first-person electrical-panel wiring across 60 panel variations, with success defined as a correctly terminated circuit" is. Borrow the structure of published dataset documentation such as [DROID](https://droid-dataset.github.io/) and the [Open X-Embodiment](https://robotics-transformer-x.github.io/) data cards.

## Step 2: Choose formats your stack already speaks

- **[LeRobot](https://github.com/huggingface/lerobot)** - Hugging Face's robotics standard (Parquet + MP4 + JSON).
- **[RLDS](https://github.com/google-research/rlds)** - the format behind Open X-Embodiment / TFDS.
- **HDF5** - the [ALOHA](https://tonyzhaozh.github.io/aloha/) and robomimic convention.

Ask for episodes, not just footage: action segmentation, hand pose, 6-DoF trajectories and success/failure flags are what make video trainable.

## Step 3: Demand consent and provenance

If your training data contains people, it contains personal data. Require a dataset card, a data-provenance log, redaction of faces and PII, and a signed Data Processing Agreement. For UK/EU deployment, confirm the vendor's position on the [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) (Article 10 data governance) and, for India-sourced data, the DPDP Act.

## Step 4: Start with a test kit

Never commission a large dataset cold. A small paid test kit - a handful of usable hours of one task, in your target format - lets you validate annotation quality, inter-annotator agreement and provenance before you scale. nxted's [Physical AI Test Kit](/pricing) is built for exactly this.

## Step 5: Scale by usable hours, with QA

Price and plan by *usable* hours (post-redaction, post-QA), not raw recorded time. Insist on a QA report with inter-annotator agreement and labelled edge cases with each batch.

## A quick buyer's checklist

1. Written task spec with a success criterion.
2. Target format(s): LeRobot / RLDS / HDF5.
3. Annotation depth defined up front.
4. Consent, redaction and a signed DPA.
5. A paid test kit before the full order.
6. QA report per batch.

## FAQ

**How do I buy robot training data without wasting budget?**
Start with a written task spec and a small paid test kit in your target format, validate quality and provenance, then scale by usable hours with a QA report on every batch.

**What format should robotics data be delivered in?**
LeRobot, RLDS or HDF5 - whichever your training stack uses - with structured episodes (action labels, poses, success flags), not just raw video.

**Do I need a DPA for training data?**
If the data contains people, yes. Require a signed Data Processing Agreement, redaction, and a clear EU AI Act / DPDP position.

---

*Scope your first dataset with us: [request a Physical AI Test Kit](/portal/capture/new) or read about the [Data Trust Pack](/trust).*`,
  },

  {
    slug: 'scale-ai-appen-alternatives-physical-ai-data',
    title: 'Scale AI & Appen Alternatives for Physical AI Data (UK/EU/India)',
    excerpt:
      'If you need physical-AI and egocentric data rather than image labelling, the big general vendors may not be the right fit. Here are the categories of alternative.',
    category: 'Buyer Guide',
    tags: ['Scale AI alternative', 'Appen alternative', 'physical AI data', 'egocentric data'],
    metaTitle: 'Scale AI & Appen Alternatives for Physical AI Data',
    metaDesc:
      'Looking for a Scale AI or Appen alternative for physical-AI and egocentric robot data? The categories of alternative and how to choose, UK/EU/India.',
    content: `**TL;DR.** Scale AI and Appen are large, capable data vendors best known for annotation and model-evaluation at scale. If your need is specifically egocentric, physical-AI capture of skilled human work - delivered robotics-ready with provenance - specialist capture companies (such as nxted) and academic-style collection efforts are often a closer fit. Choose on skill depth, formats and compliance, not brand.

## Why teams look for an alternative

General data platforms are excellent at large-scale labelling and crowd evaluation. Physical AI has a different bottleneck: there is no web-scale corpus of manipulation, so you need *new* first-person recordings of people doing skilled tasks, with depth and pose, in robotics formats. That is a capture problem more than a labelling problem.

## Categories of alternative

- **Specialist physical-skill capture.** Companies that record expert demonstrations of specific trades and ship them in LeRobot/RLDS/HDF5 with consent and provenance. Best for skilled manipulation and regulated buyers. nxted is in this category, with a focus on industrial and technical work captured in India.
- **Open and academic datasets.** [Open X-Embodiment](https://robotics-transformer-x.github.io/), [DROID](https://droid-dataset.github.io/) and [Ego-Exo4D](https://ego-exo4d-data.org/) are free and excellent for pre-training, but you cannot commission a specific skill or environment from them.
- **Teleoperation-data collectors.** Vendors that gather robot teleoperation episodes. Valuable, but different from human egocentric demonstration - see our note on [human egocentric video vs teleoperation](/research).
- **In-house collection.** Building your own rig on [Project Aria](https://www.projectaria.com/) or [UMI](https://umi-gripper.github.io/). Maximum control, significant operational overhead.

## What to compare

1. **Skill depth.** Can they prove the contributor is qualified for the task?
2. **Formats.** LeRobot, RLDS, HDF5 out of the box?
3. **Provenance and consent.** Dataset card, provenance log, signed DPA, redaction.
4. **Jurisdiction.** UK/EU contracting and a clear [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) and DPDP position if that matters to your buyers.
5. **Commercial fit.** A low-risk test kit before a large commitment.

## Where nxted is a strong fit (and where it is not)

nxted is a good fit if you need expert-reviewed egocentric demonstrations of skilled industrial or technical work, captured with consent and delivered robotics-ready and UK/EU-contracted. It is not a fit if you simply need a large pool of bounding-box image labels - a general annotation vendor is better for that.

## FAQ

**What is a good Scale AI alternative for robot data?**
For egocentric, physical-AI capture specifically, specialist capture companies (such as nxted) and open datasets like Open X-Embodiment are often a closer fit than general labelling platforms. Compare on skill depth, formats and compliance.

**What is an Appen alternative for physical AI?**
If you need first-person demonstrations of skilled manual work rather than large-scale annotation, a specialist egocentric-capture provider with provenance and robotics formats is usually the better match.

**Can I get UK/EU-compliant robot training data?**
Yes - look for a vendor that contracts in the UK/EU, signs a DPA, redacts personal data, and can state its EU AI Act and (for India-sourced data) DPDP position.

---

*See how nxted compares on your task: [explore nxted Capture](/capture) or [request a Test Kit](/portal/capture/new).*`,
  },

  {
    slug: 'what-robot-training-data-costs',
    title: 'What Robot Training Data Actually Costs in 2026',
    excerpt:
      'A plain-English explainer of what drives the price of robotics training data, why it is quoted per usable hour, and how to budget a first project.',
    category: 'Buyer Guide',
    tags: ['robot training data cost', 'pricing', 'robotics data', 'budget'],
    metaTitle: 'What Robot Training Data Actually Costs in 2026',
    metaDesc:
      'What robot training data costs in 2026: the cost drivers, why it is priced per usable hour, and how to budget from test kit to full dataset.',
    content: `**TL;DR.** Robot training data is priced mainly by skill level, annotation depth and usable hours - not raw footage. Simple tasks cost less per hour than skilled or credentialed work, and richer annotation (hand pose, 6-DoF, success labels) adds cost. A sensible way to budget is to start with a fixed-price test kit, then scale by usable hours.

## What actually drives the price

- **Skill level.** Basic packing or sorting is cheaper to capture than electrical assembly, CNC setup or medical-adjacent tasks, which need credentialed contributors.
- **Annotation depth.** Raw video is cheapest; action segmentation, hand pose, 6-DoF trajectories and success/failure labels add cost but are what make data trainable.
- **Usable hours.** You pay for hours that survive redaction and QA, not everything the camera recorded.
- **Compliance overhead.** Consent, redaction, provenance logging and a DPA take real work, and are worth it for UK/EU deployment.
- **Sensor tier.** RGB-only is cheaper than full depth plus hand pose on a research-grade rig.

## Why "per usable hour" is the honest unit

Recorded time and trainable time are different. Redaction, trimming and QA remove a meaningful fraction of raw footage, so pricing per *usable* hour aligns the vendor's incentive with your training set. Treat any quote in raw hours with caution.

## What the market signals say

Public reporting on Western humanoid-data programmes has put skilled data-collection pay in the tens of dollars per hour, and robotics firms collectively spend heavily on real-world data each year. These are directional signals, not fixed prices - actual cost depends on the factors above. (We cite figures as attributed ranges rather than precise claims.)

## How nxted prices it

- **Physical AI Test Kit - from $2,500.** 5-10 usable hours of one skilled task, with a consent pack, metadata, basic labels and a LeRobot/RLDS/HDF5 sample, in 7-10 days.
- **Full datasets - per usable hour by skill level (L1-L5),** quoted within 24 hours.
- **nxted Expert evaluation - from £249** for a paid sprint, with a free 20-output test kit.

See the full [pricing page](/pricing) for detail.

## How to budget your first project

1. Write a one-task spec.
2. Buy a test kit to fix quality and provenance.
3. Estimate full volume by usable hours at your skill level.
4. Add a line for compliance artefacts (you will want them).

## FAQ

**How much does robot training data cost?**
It is priced per usable hour by skill level and annotation depth. Entry points like nxted's Physical AI Test Kit start at $2,500 for 5-10 usable hours; full datasets are quoted by usable hour.

**Why is robotics data priced per usable hour?**
Because redaction, trimming and QA remove part of the raw footage. Paying per usable hour aligns cost with the data that actually reaches your training set.

**What makes one dataset more expensive than another?**
Skill level, annotation depth, sensor tier and compliance work. Credentialed, richly annotated, fully consented data costs more than raw RGB of a simple task.

---

*Get a concrete number for your task: [request a Physical AI Test Kit](/portal/capture/new) or see [pricing](/pricing).*`,
  },

  {
    slug: 'rlhf-data-providers-compared',
    title: 'RLHF Data Providers Compared: Choosing Human Evaluation for Your AI',
    excerpt:
      'A neutral guide to the kinds of RLHF and human-evaluation providers, what separates generalist crowds from expert review, and how to choose.',
    category: 'RLHF',
    tags: ['RLHF', 'human evaluation', 'AI evaluation', 'data providers'],
    metaTitle: 'RLHF Data Providers Compared: Human Evaluation for AI',
    metaDesc:
      'Compare RLHF and human-evaluation providers in 2026: generalist crowds vs expert review, what to measure, and how to pick for high-risk AI.',
    content: `**TL;DR.** RLHF and human-evaluation providers range from large generalist crowds to small networks of credentialed domain experts. Generalist crowds are fine for tone, formatting and broad preference data; expert review is essential when a wrong answer is domain-specific and dangerous. Choose on reviewer credentials, inter-rater agreement and how errors are scored.

## What RLHF and human evaluation actually are

Reinforcement learning from human feedback ([InstructGPT, 2022](https://arxiv.org/abs/2203.02155)) uses human judgements of model outputs to align an AI's behaviour. Human evaluation more broadly means qualified people rating accuracy, safety and domain-correctness, often to build preference data or to red-team a model before deployment.

## The core divide: generalist crowds vs expert review

- **Generalist crowds.** Large, fast, inexpensive. Good for "is this answer fluent, on-topic and helpful". Weak where correctness needs a professional - a confident, wrong answer about bearing failure modes, drug interactions or contract law sails straight through.
- **Expert review networks.** Smaller, credentialed reviewers matched to a sub-domain. Slower and dearer per item, but they catch the failures that actually create liability. nxted Expert is in this category.

## What to measure in any RLHF provider

1. **Reviewer credentials.** Are they disclosed, and matched to your domain?
2. **Inter-rater agreement.** Reported per project, so you can tell signal from noise?
3. **Error taxonomy.** Are errors classified by type and severity tied to deployment risk?
4. **Transparency.** Do you learn who reviewed your model, or is it a black box?
5. **Compliance.** A signed DPA and, for high-risk systems, documentation that maps to the [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) (Article 14 human oversight, Annex IV).

## When you need expert review specifically

If your AI makes decisions a professional would be liable for - clinical, legal, financial, structural - your evaluators should hold the credentials that professional holds. Generalist preference data will not surface the errors that matter, and may hide them behind high agreement on the wrong answer.

## Where nxted Expert fits

nxted Expert supplies credentialed domain reviewers across engineering, the sciences, medicine, law and finance, reports inter-rater agreement and an error taxonomy, and ships documentation built to drop into an EU AI Act technical file. See [nxted Expert](/expert).

## FAQ

**What is an RLHF data provider?**
A company that supplies human judgements of AI outputs - preference data, evaluations or red-teaming - to align or assess a model. They range from generalist crowds to credentialed expert networks.

**When should I use expert review instead of a crowd?**
When correctness is domain-specific and a wrong answer creates real risk. Experts catch failures a generalist crowd rates as acceptable.

**What should an RLHF report include?**
Reviewer credentials, inter-rater agreement, an error taxonomy tied to deployment risk, and a signed DPA - ideally mapped to EU AI Act documentation for high-risk systems.

---

*Try expert evaluation on your model: [start a free Expert Test Kit](/portal/expert/new?product=TEST_KIT) or read about [nxted Expert](/expert).*`,
  },

  // ──────────────────────── Tier 2: category explainers ────────────────────────
  {
    slug: 'what-is-egocentric-data',
    title: 'What Is Egocentric Data and Why Robots Need It',
    excerpt:
      'Egocentric data is first-person video of a person doing a task. It is the scarce ingredient for teaching robots to act - here is what it is and why it matters.',
    category: 'Physical AI',
    tags: ['egocentric data', 'physical AI', 'robot learning', 'explainer'],
    metaTitle: 'What Is Egocentric Data and Why Robots Need It',
    metaDesc:
      'Egocentric data is first-person video of human tasks, with depth and pose, used to train robots. What it is, why robots need it, and how it is collected.',
    content: `**TL;DR.** Egocentric data is video recorded from the first-person point of view of the person performing a task - what a robot's own camera would see - usually with depth, hand pose and a 6-DoF trajectory. Robots need it because there is no web-scale corpus of physical actions, so manipulation policies must be shown how skilled humans move.

## What egocentric means

"Egocentric" simply means from the doer's viewpoint, as opposed to "exocentric" (third-person). A head- or chest-mounted camera sees the hands, the tools and the workpiece from roughly the angle a robot's sensors will occupy, which is why the data transfers to robot policies. Large research efforts like [Ego4D](https://arxiv.org/abs/2110.07058) and [Ego-Exo4D](https://ego-exo4d-data.org/) were built specifically to capture this viewpoint at scale.

## Why robots need it

Language models had the whole internet to read. Robots have no equivalent: there is no web-scale archive of *how* to wire a panel or sew a seam. The cross-embodiment [Open X-Embodiment](https://robotics-transformer-x.github.io/) effort pooled data from many robots and institutions precisely because real demonstrations are scarce and must be recorded. Egocentric human video is one of the fastest ways to gather that demonstration signal.

## What a useful egocentric recording contains

- **First-person RGB** - the core observation stream.
- **Depth** (e.g. Intel RealSense, Stereolabs ZED) for 3D structure.
- **Hand pose and a 6-DoF trajectory** from SLAM, often via [Project Aria](https://www.projectaria.com/).
- **Eye gaze**, a strong prior for where the action is.
- **Action labels** - segmentation and success/failure flags that make the video trainable.

## Egocentric human video vs robot teleoperation

Both produce demonstrations, but they differ: human egocentric video is cheaper and more diverse to collect, while teleoperation produces action-aligned robot data. Many teams blend the two. We compare them in [human egocentric video vs teleoperation](/research/human-egocentric-video-vs-teleoperation).

## How it is collected responsibly

Because egocentric footage shows people, it is personal data. Responsible collection means explicit consent, fair pay, redaction of faces and PII, and a provenance log - the artefacts in nxted's [Data Trust Pack](/trust).

## FAQ

**What is egocentric data?**
First-person video recorded from the viewpoint of the person doing a task, usually with depth, hand pose and a 6-DoF trajectory, used to train robots and embodied AI.

**Why can't robots just learn from internet video?**
Most internet video is third-person and unlabelled. Robots need first-person demonstrations with action and pose information, recorded from the viewpoint their own sensors occupy.

**How is egocentric data collected?**
With head-mounted rigs (such as Project Aria) plus depth and hand-pose sensors, then annotated with action labels - and, done responsibly, with consent, redaction and provenance.

---

*See how nxted records it: [nxted Capture](/capture) · or [buy a Test Kit](/portal/capture/new).*`,
  },

  {
    slug: 'what-is-physical-ai',
    title: 'What Is Physical AI? The Data Behind Embodied Intelligence',
    excerpt:
      'Physical AI is AI that perceives and acts in the physical world - robots and embodied agents. Its bottleneck is data. Here is what that data is and why it is scarce.',
    category: 'Physical AI',
    tags: ['physical AI', 'embodied AI', 'robotics', 'explainer'],
    metaTitle: 'What Is Physical AI? The Data Behind Embodied Intelligence',
    metaDesc:
      'Physical AI is AI that acts in the real world - robots and embodied agents. What it is, why data is the bottleneck, and what training data it needs.',
    content: `**TL;DR.** Physical AI is artificial intelligence that perceives and acts in the physical world - humanoid robots, manipulators and embodied agents - rather than only producing text or images. Its main bottleneck is not compute or model size but data: first-person demonstrations of real physical tasks, which have to be recorded rather than scraped.

## Physical AI vs digital AI

Digital AI (chatbots, image models) learns from abundant web data. Physical AI has to interact with objects, contact forces and consequences, and there is no comparable archive of physical action. Vendors and labs - including NVIDIA with its [Isaac GR00T](https://developer.nvidia.com/isaac/gr00t) work on humanoid foundation models - frame "physical AI" as the next frontier precisely because the data layer is immature.

## Why data is the bottleneck

- There is no internet of actions; manipulation has to be demonstrated.
- Generalisation depends on diversity. The ICLR 2025 paper [Data Scaling Laws in Imitation Learning](https://arxiv.org/abs/2410.18647) found policy generalisation tracks the number of distinct environments and objects, not just demonstration count.
- Skilled and industrial tasks are under-represented in open datasets and hard for gig crowds to reach.

## What training data physical AI needs

1. **Egocentric demonstrations** of real tasks - see [what is egocentric data](/research/what-is-egocentric-data).
2. **Rich signals**: depth, hand pose, 6-DoF trajectory, action labels.
3. **Diversity** of workers, tools and environments.
4. **Robotics formats**: [LeRobot](https://github.com/huggingface/lerobot), [RLDS](https://github.com/google-research/rlds), HDF5.
5. **Provenance and consent**, increasingly required under the [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj).

## How VLA models use it

Modern robot policies are often vision-language-action (VLA) models that map camera input and a language instruction to actions. They are hungry for exactly this demonstration data - covered in [VLA models: the data they need](/research/vision-language-action-models-data).

## FAQ

**What is physical AI?**
AI that senses and acts in the physical world - robots and embodied agents - as opposed to purely digital models that output text or images.

**Why is data the bottleneck for physical AI?**
Because physical action has no web-scale corpus. Robots must be shown tasks through first-person demonstrations, and diverse, skilled demonstrations are scarce.

**What data does physical AI need?**
Egocentric demonstrations with depth, pose and action labels, across many environments, delivered in robotics formats with consent and provenance.

---

*nxted supplies that data layer: [nxted Capture](/capture) · or compare providers in our [buyer guide](/research/best-egocentric-data-providers-for-robotics).*`,
  },

  {
    slug: 'vision-language-action-models-data',
    title: 'Vision-Language-Action (VLA) Models: The Data They Need',
    excerpt:
      'VLA models map what a robot sees and is told into actions. This explainer covers how they work and the demonstration data they depend on.',
    category: 'Physical AI',
    tags: ['vision-language-action', 'VLA', 'robot learning', 'explainer'],
    metaTitle: 'Vision-Language-Action (VLA) Models: The Data They Need',
    metaDesc:
      'Vision-language-action (VLA) models turn camera input plus an instruction into robot actions. How they work and the egocentric demonstration data they need.',
    content: `**TL;DR.** A vision-language-action (VLA) model takes camera images and a natural-language instruction and outputs robot actions. VLAs are trained on large collections of demonstration episodes, so their performance depends heavily on the volume, diversity and annotation quality of the action data they are fed.

## What a VLA model is

VLAs extend vision-language models to control. Instead of answering in text, they predict actions. Notable examples include Google DeepMind's [RT-2](https://arxiv.org/abs/2307.15818) and the open [OpenVLA](https://arxiv.org/abs/2406.09246), and companies such as Physical Intelligence (the π0 model) build general policies in this family.

## The data a VLA needs

- **Demonstration episodes** pairing observations with actions, often sourced from collections like [Open X-Embodiment](https://robotics-transformer-x.github.io/).
- **Language annotations** describing each task, so the "language" channel is grounded.
- **Diversity** across objects, scenes and embodiments - the dominant driver of generalisation per [imitation-learning scaling laws](https://arxiv.org/abs/2410.18647).
- **Clean formats**: [LeRobot](https://github.com/huggingface/lerobot), [RLDS](https://github.com/google-research/rlds), HDF5.

## Where human egocentric data fits

Robot teleoperation data is action-aligned but expensive to scale. Human egocentric demonstrations are cheaper and far more diverse, and are increasingly used to pre-train or augment VLA policies. See [what is egocentric data](/research/what-is-egocentric-data) and the [teleoperation comparison](/research/human-egocentric-video-vs-teleoperation).

## What this means if you are sourcing data

Optimise for breadth (many tasks, objects and settings), insist on language and action annotations, and validate quality with a small batch before scaling - the approach in our [buyer's guide](/research/how-to-buy-robotics-training-data).

## FAQ

**What is a vision-language-action model?**
A robot-control model that maps camera input and a language instruction to actions, extending vision-language models from text output to physical action.

**What data do VLA models need?**
Large, diverse sets of demonstration episodes with language and action annotations, in robotics formats - plus the breadth that drives generalisation.

**Can human video train VLAs?**
Yes. Human egocentric demonstrations are cheaper and more diverse than teleoperation and are increasingly used to pre-train or augment VLA policies.

---

*Need VLA-ready demonstration data? [Explore nxted Capture](/capture) or [request a Test Kit](/portal/capture/new).*`,
  },

  {
    slug: 'human-egocentric-video-vs-teleoperation',
    title: 'Human Egocentric Video vs Robot Teleoperation: Which Trains Better Policies?',
    excerpt:
      'Two ways to get robot demonstration data - filming humans, or teleoperating robots. They have different costs, strengths and failure modes. Here is how to choose.',
    category: 'Physical AI',
    tags: ['teleoperation', 'egocentric data', 'imitation learning', 'explainer'],
    metaTitle: 'Human Egocentric Video vs Robot Teleoperation',
    metaDesc:
      'Human egocentric video vs robot teleoperation for training robot policies: cost, diversity, action alignment and the embodiment gap, compared.',
    content: `**TL;DR.** Robot teleoperation produces action-aligned data on the exact robot you will deploy, but it is slow and expensive to scale. Human egocentric video is cheaper, faster and far more diverse, but needs work to map human motion onto a robot. Most serious programmes use both: human video for breadth, teleoperation for action-precise fine-tuning.

## The two sources

- **Robot teleoperation.** A human drives the robot (e.g. via [ALOHA](https://tonyzhaozh.github.io/aloha/) or a [UMI](https://umi-gripper.github.io/) gripper) and the robot's own actions are recorded. Datasets like [DROID](https://droid-dataset.github.io/) are built this way.
- **Human egocentric video.** You film a person performing the task from the first-person view. Cheaper and more diverse, but human hands are not robot grippers.

## How they compare

- **Cost and speed:** human video wins - no robot time, many contributors in parallel.
- **Diversity:** human video wins - many people, tools and settings, which [scaling laws](https://arxiv.org/abs/2410.18647) reward.
- **Action alignment:** teleoperation wins - actions are recorded in the robot's own space.
- **Embodiment gap:** teleoperation avoids it; human video must bridge from human to robot morphology.

## The practical answer: blend them

A common recipe is to pre-train on large, diverse human egocentric data, then fine-tune on a smaller set of teleoperation episodes on the target robot. This buys breadth cheaply and action precision where it counts. Tools like UMI are explicitly designed to narrow the gap between human and robot data.

## What to collect first

If you are early, breadth is usually the better investment - a diverse human egocentric set across many environments - before expensive robot-specific teleoperation. See [what robot training data costs](/research/what-robot-training-data-costs) to budget the mix.

## FAQ

**Is human video or teleoperation better for robot training?**
Neither alone. Human egocentric video gives cheap breadth; teleoperation gives action-aligned precision. Most teams blend them - human data to pre-train, teleoperation to fine-tune.

**What is the embodiment gap?**
The difference between a human hand and a robot's gripper and kinematics. Human video must be mapped onto the robot's morphology; teleoperation avoids the gap by recording the robot directly.

**Which should I collect first?**
Usually diverse human egocentric data, because generalisation tracks environment and object diversity, then targeted teleoperation on your robot.

---

*nxted specialises in human egocentric capture of skilled work: [see how](/capture) or [request a Test Kit](/portal/capture/new).*`,
  },

  {
    slug: 'what-is-rlhf-human-evaluation',
    title: 'What Is RLHF and How Human Evaluation Improves AI Models',
    excerpt:
      'RLHF aligns AI models using human judgements. This explainer covers how it works, where it helps, and why who does the evaluation matters.',
    category: 'RLHF',
    tags: ['RLHF', 'human evaluation', 'AI alignment', 'explainer'],
    metaTitle: 'What Is RLHF and How Human Evaluation Improves AI',
    metaDesc:
      'What RLHF is and how human evaluation improves AI models: the training loop, where it helps, and why evaluator expertise changes the result.',
    content: `**TL;DR.** RLHF - reinforcement learning from human feedback - improves an AI model by training it against human judgements of its outputs. Humans rank or rate responses, a reward model learns those preferences, and the model is optimised toward them. The quality of the result depends heavily on who provides the feedback and how it is measured.

## How RLHF works

The modern recipe was popularised by OpenAI's [InstructGPT](https://arxiv.org/abs/2203.02155):

1. Collect human comparisons of model outputs.
2. Train a reward model to predict human preference.
3. Fine-tune the model with reinforcement learning against that reward.

Human evaluation also happens outside the training loop - as benchmarking and red-teaming before deployment.

## Where RLHF helps

- Making outputs more helpful, honest and on-instruction.
- Reducing unsafe or low-quality responses.
- Surfacing domain errors a model is confidently wrong about.

## Why who evaluates matters

A generalist rater can judge tone and format, but not whether a clinical, legal or engineering answer is actually correct. A confident, fluent, wrong answer passes generalist review - and high agreement on the wrong answer is worse than noise. For high-risk domains, evaluators should hold the credentials a professional in that field holds. We compare options in [RLHF data providers compared](/research/rlhf-data-providers-compared).

## What good human evaluation reports

- Reviewer credentials, matched to the domain.
- Inter-rater agreement, so you can separate signal from noise.
- An error taxonomy tied to deployment risk.
- Documentation that maps to the [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) for high-risk systems.

## FAQ

**What is RLHF?**
Reinforcement learning from human feedback: a method that aligns an AI model by training it against human preferences over its outputs, via a learned reward model.

**How does human evaluation improve AI?**
By identifying where a model is unhelpful, unsafe or domain-wrong, and turning those judgements into a training signal or a pre-deployment safety check.

**Does it matter who does the evaluation?**
Yes. Domain expertise determines whether subtle, high-risk errors are caught. Generalist crowds miss expert failures that credentialed reviewers catch.

---

*Get expert evaluation for your model: [start a free Expert Test Kit](/portal/expert/new?product=TEST_KIT) or read about [nxted Expert](/expert).*`,
  },
];
