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

  // ──────────────────────── Tier 3: technical / how-to ────────────────────────
  {
    slug: 'lerobot-vs-rlds-vs-hdf5',
    title: 'LeRobot vs RLDS vs HDF5: Robotics Dataset Formats Explained',
    excerpt:
      'The three formats most robot-learning stacks use - LeRobot, RLDS and HDF5 - explained, with how to choose and convert between them.',
    category: 'Technical',
    tags: ['LeRobot', 'RLDS', 'HDF5', 'dataset formats', 'how-to'],
    metaTitle: 'LeRobot vs RLDS vs HDF5: Robotics Formats Explained',
    metaDesc:
      'LeRobot vs RLDS vs HDF5 for robot learning: what each format is, when to use it, and how datasets convert between them.',
    content: `**TL;DR.** LeRobot, RLDS and HDF5 are the three formats most robot-learning pipelines use. LeRobot is Hugging Face's standard (Parquet + MP4 + JSON), RLDS is the TensorFlow-Datasets format behind Open X-Embodiment, and HDF5 is the long-standing scientific container used by ALOHA and robomimic. Pick the one your training code already reads; good vendors ship all three.

## The three formats

- **[LeRobot](https://github.com/huggingface/lerobot).** Hugging Face's open robotics library and dataset format. Stores episodes as Parquet (state/action) plus MP4 video and JSON metadata. Strong tooling, growing ecosystem, easy to share on the Hugging Face Hub.
- **[RLDS](https://github.com/google-research/rlds).** "Reinforcement Learning Datasets", built on TFDS. It is the format behind the cross-embodiment [Open X-Embodiment / RT-X](https://robotics-transformer-x.github.io/) collection, so it is the natural choice if you train on or alongside that data.
- **HDF5.** A general scientific container ([HDF Group](https://www.hdfgroup.org/solutions/hdf5/)) used by [ALOHA](https://tonyzhaozh.github.io/aloha/) and robomimic. Flexible and self-describing, with mature libraries in every language.

## How to choose

1. **Match your training code.** If you fine-tune an OpenVLA-style model, RLDS fits; if you use the LeRobot trainer, LeRobot; if you use ALOHA/robomimic pipelines, HDF5.
2. **Consider sharing.** LeRobot integrates with the Hugging Face Hub for distribution.
3. **Consider scale.** All three handle large episode counts; RLDS shards well for TFDS pipelines.

## Converting between them

Episodes are conceptually the same - observations, actions, rewards/labels per timestep - so conversion is mostly a schema-mapping exercise. LeRobot and the Open X-Embodiment tooling include converters, and HDF5's flat structure makes export straightforward. The cost is in getting metadata (camera calibration, control frequency, action space) consistent.

## What to ask a data vendor

Ask for episodes in your target format with **action segmentation, success/failure labels, camera calibration and control-frequency metadata** - not just video. nxted Capture ships in [LeRobot, RLDS and HDF5](/capture) by default. To plan a purchase, see [how to buy robotics training data](/research/how-to-buy-robotics-training-data).

## FAQ

**What is the difference between LeRobot, RLDS and HDF5?**
LeRobot is Hugging Face's Parquet+MP4+JSON robotics format, RLDS is the TFDS format behind Open X-Embodiment, and HDF5 is a general scientific container used by ALOHA and robomimic. All store per-timestep observations and actions.

**Which robotics dataset format should I use?**
The one your training stack already reads. If you have no constraint, LeRobot has the friendliest tooling and sharing; RLDS is best alongside Open X-Embodiment data.

**Can datasets be converted between these formats?**
Yes - the underlying episode structure is the same, so conversion is schema mapping. The work is in keeping calibration and action-space metadata consistent.

---

*nxted delivers all three formats: [see nxted Capture](/capture) or [request a Test Kit](/portal/capture/new).*`,
  },

  {
    slug: 'how-to-collect-egocentric-data-hardware',
    title: 'How to Collect Egocentric Data for Robot Training: A Hardware Guide',
    excerpt:
      'A practical guide to the rigs and sensors used to record research-grade egocentric data - from Project Aria to depth cameras and grippers.',
    category: 'Technical',
    tags: ['egocentric data', 'hardware', 'capture rig', 'how-to'],
    metaTitle: 'How to Collect Egocentric Data for Robots: Hardware Guide',
    metaDesc:
      'A hardware guide to collecting egocentric data for robot training: Project Aria, RealSense/ZED depth, hand pose, UMI grippers, and what each sensor adds.',
    content: `**TL;DR.** To collect research-grade egocentric data you need a first-person RGB camera, a way to recover a 6-DoF trajectory (SLAM), depth, and hand pose - commonly built on Meta Project Aria plus an Intel RealSense or Stereolabs ZED depth camera, with a UMI-style gripper for action-aligned manipulation. The rig you choose should match how training-ready you need the data to be.

## The signals that matter

- **First-person RGB** - the core observation stream (often up to ~1408x1408 at 30fps).
- **6-DoF trajectory** - head and hand pose through space, from SLAM.
- **Depth / point cloud** - 3D structure of the scene.
- **Hand pose** - per-joint tracking, the bridge to robot grippers.
- **Eye gaze** - a strong prior for where the action is.
- **Action labels** - segmentation and success/failure, added in annotation.

## The hardware the research field uses

- **[Meta Project Aria](https://www.projectaria.com/)** - research glasses providing RGB, SLAM cameras, IMU and eye gaze; the basis of [Ego-Exo4D](https://ego-exo4d-data.org/).
- **[Intel RealSense](https://www.intelrealsense.com/) / [Stereolabs ZED](https://www.stereolabs.com/)** - depth and point cloud.
- **[Universal Manipulation Interface (UMI)](https://umi-gripper.github.io/)** - a handheld gripper that records action-aligned manipulation data and narrows the human-to-robot gap.

## Three rig tiers

1. **RGB-only** - cheapest; good for pre-training and behaviour cloning where pose is inferred.
2. **RGB + depth + SLAM** - adds 3D and trajectory; suitable for most manipulation work.
3. **Full** - adds hand pose and a UMI-style gripper for robotics-ready, action-aligned data.

We do not recommend fictional proprietary hardware - these are the devices behind published datasets, which is why policies trained on them transfer.

## Calibration and consent are part of the rig

Record camera intrinsics/extrinsics and control frequency, and - because you are filming people - obtain consent and plan redaction from the start. See [annotating egocentric data](/research/annotating-egocentric-data) and the [Data Trust Pack](/trust).

## FAQ

**What hardware do you need to collect egocentric data?**
A first-person RGB camera with SLAM (e.g. Project Aria), a depth camera (RealSense or ZED), and - for action-aligned manipulation - hand pose or a UMI-style gripper.

**Do I need depth and hand pose?**
It depends on the task. RGB-only suffices for some pre-training; depth and hand pose are needed for robotics-ready manipulation data.

**Is special hardware required, or can any camera work?**
Any camera captures RGB, but research-grade transfer benefits from SLAM, depth and pose - the stack behind datasets like Ego-Exo4D.

---

*nxted runs these rigs so you don't have to: [see nxted Capture](/capture) or [compare collection options](/research/human-egocentric-video-vs-teleoperation).*`,
  },

  {
    slug: 'annotating-egocentric-data',
    title: 'Annotating Egocentric Data: Hand Pose, 6-DoF, and Action Segmentation',
    excerpt:
      'Annotation is what turns first-person footage into training data. A practical guide to the labels robot policies need and how to QA them.',
    category: 'Technical',
    tags: ['annotation', 'hand pose', 'action segmentation', 'how-to'],
    metaTitle: 'Annotating Egocentric Data: Pose, 6-DoF & Actions',
    metaDesc:
      'How to annotate egocentric data for robot training: hand pose, 6-DoF trajectories, action segmentation and success labels - plus how to QA annotation.',
    content: `**TL;DR.** Annotation turns egocentric footage into training data. The labels that matter most are action segmentation (what is happening, when), hand pose and a 6-DoF trajectory (how the hands move), and success/failure flags. Quality is measured with inter-annotator agreement; without it, you cannot tell good labels from noise.

## The labels robot policies need

- **Action segmentation** - the task split into sub-actions with start/end times.
- **Hand pose** - per-joint hand tracking, the bridge from human demonstration to robot gripper.
- **6-DoF trajectory** - position and orientation of hands/tool over time.
- **Object and contact labels** - which object, when grasped/released.
- **Success/failure flags** - whether each episode achieved the goal; essential for learning from mistakes.
- **Language narration** - short descriptions that ground vision-language-action models (see [VLA models](/research/vision-language-action-models-data)).

## How annotation is produced

Some signals come from sensors (6-DoF from SLAM, hand pose from tracking), others from human labellers (segmentation boundaries, success judgements, narration). The [Ego-Exo4D](https://ego-exo4d-data.org/) methodology combines multi-view capture with expert commentary, which is a useful reference standard.

## Measuring annotation quality

- **Inter-annotator agreement (IAA).** Have multiple annotators label a sample; high agreement means the labels are reliable. Report it per batch.
- **Edge-case review.** Surface ambiguous or controversial clips for re-labelling.
- **Spec adherence.** Check labels against a written annotation guide.

## Why this is the hard part

Footage is cheap; trustworthy labels are not. The difference between "video" and "training data" is the annotation and its QA. nxted ships a [QA report](/trust) with inter-annotator agreement and labelled edge cases on every batch.

## FAQ

**What annotations does egocentric robot data need?**
Action segmentation, hand pose, a 6-DoF trajectory, object/contact labels, success/failure flags and often language narration.

**How is annotation quality measured?**
With inter-annotator agreement on a labelled sample, plus edge-case review and adherence to a written annotation spec.

**Why is annotation more important than raw footage?**
Because policies learn from the labels. Unlabelled or noisy video does not train reliable behaviour; structured, QA'd annotation does.

---

*Get annotated, QA'd episodes: [see nxted Capture](/capture) or read [what a good dataset card looks like](/research/robotics-dataset-card).*`,
  },

  {
    slug: 'how-to-write-robotics-data-spec',
    title: 'How to Write a Robotics Data Collection Spec',
    excerpt:
      'A vague brief produces unusable data. This template shows how to specify a robotics capture so you get exactly the episodes your policy needs.',
    category: 'Technical',
    tags: ['data spec', 'robotics', 'procurement', 'how-to'],
    metaTitle: 'How to Write a Robotics Data Collection Spec',
    metaDesc:
      'A practical template for a robotics data collection spec: task, environments, objects, viewpoint, signals, formats, success criteria and volume.',
    content: `**TL;DR.** A robotics data collection spec should pin down the task, the environments and objects, the camera viewpoint, the signals and annotations, the output format, the success criterion, and the target volume in usable hours. Specifying "what correct looks like" is the single most important line - it determines whether the data is usable.

## The spec template

1. **Task and sub-tasks.** Exactly what is performed (e.g. "terminate and dress a 12-way electrical panel").
2. **Success criterion.** What counts as a correct, complete episode. Be unambiguous.
3. **Environments.** How many distinct settings, and how varied (lighting, clutter, layout).
4. **Objects.** The set and variation - generalisation tracks object/environment diversity per [imitation-learning scaling laws](https://arxiv.org/abs/2410.18647).
5. **Viewpoint and sensors.** Egocentric? Depth? Hand pose? Reference angle?
6. **Annotations.** Action segmentation, success flags, narration, pose.
7. **Format.** LeRobot, RLDS or HDF5 - see [format guide](/research/lerobot-vs-rlds-vs-hdf5).
8. **Volume.** Target usable hours and episode count, plus splits.
9. **Compliance.** Consent, redaction, DPA, jurisdiction.

## Why "what correct means" comes first

Without a crisp success criterion, annotators guess and your success/failure labels are inconsistent - which quietly poisons training. Borrow the rigour of published dataset documentation such as [DROID](https://droid-dataset.github.io/) and [Open X-Embodiment](https://robotics-transformer-x.github.io/) data cards.

## Common mistakes

- Specifying raw hours instead of usable hours.
- Asking for one environment when diversity drives generalisation.
- Forgetting calibration and control-frequency metadata.
- Leaving consent and redaction as an afterthought.

## Validate before you scale

Turn the spec into a small paid test kit first, check quality and IAA, then scale - the workflow in [how to buy robotics training data](/research/how-to-buy-robotics-training-data).

## FAQ

**What goes into a robotics data collection spec?**
Task and sub-tasks, a success criterion, environments and objects, viewpoint and sensors, annotations, output format, target usable hours, and compliance requirements.

**What is the most important part of a data spec?**
The success criterion - "what correct means". It determines label consistency and whether the resulting data is trainable.

**Should I specify raw or usable hours?**
Usable hours. Raw footage includes material removed by redaction and QA; usable hours reflect what reaches your training set.

---

*Send us a spec (or a sketch) and we'll scope it: [request a Test Kit](/portal/capture/new) or [talk to us](/contact).*`,
  },

  {
    slug: 'robotics-dataset-card',
    title: 'What a Good Robotics Dataset Card Looks Like',
    excerpt:
      'A dataset card is the README for your data: scope, provenance, splits and limitations. Here is what a trustworthy robotics dataset card should contain.',
    category: 'Technical',
    tags: ['dataset card', 'provenance', 'documentation', 'how-to'],
    metaTitle: 'What a Good Robotics Dataset Card Looks Like',
    metaDesc:
      'What belongs in a robotics dataset card: scope, collection method, sensors, annotations, splits, consent and provenance, and known limitations.',
    content: `**TL;DR.** A dataset card is the documentation that ships with a dataset: what it contains, how it was collected, how it is split, and where it falls short. For robotics it should cover sensors and calibration, annotation method, consent and provenance, and honest limitations. Good cards follow the "Datasheets for Datasets" idea and make data safe to reuse.

## Why dataset cards exist

The practice was formalised by [Datasheets for Datasets](https://arxiv.org/abs/1803.09010) (Gebru et al.) and is now standard on the [Hugging Face Hub](https://github.com/huggingface/hub-docs/blob/main/datasetcard.md). A card lets a buyer or auditor understand a dataset without reverse-engineering it, and is increasingly expected under data-governance rules.

## What a robotics dataset card should contain

- **Scope.** Tasks, skills, number of episodes and usable hours.
- **Collection method.** Egocentric vs teleoperation, rig and sensors, control frequency.
- **Calibration.** Camera intrinsics/extrinsics; coordinate conventions.
- **Annotations.** What was labelled, by whom, and inter-annotator agreement.
- **Splits.** Train/val/test and how they were chosen (avoid leakage across environments).
- **Consent and provenance.** That contributors consented and were paid; a provenance log.
- **Limitations.** Known biases, gaps, and failure modes - stated honestly.
- **Licence and contact.**

## The honesty test

A card that lists only strengths is a red flag. The most useful section is "limitations" - it tells you where the data will and will not help. For physical AI, note environment/object coverage, because that drives generalisation.

## How nxted documents data

Every nxted Capture delivery includes a dataset card plus a data-provenance log and a QA report, bundled in the [Data Trust Pack](/trust). See also [annotating egocentric data](/research/annotating-egocentric-data).

## FAQ

**What is a dataset card?**
The documentation shipped with a dataset describing its scope, collection method, splits, provenance and limitations - the "README" that makes data safe to reuse.

**What should a robotics dataset card include?**
Scope, sensors and calibration, annotation method with inter-annotator agreement, splits, consent and provenance, honest limitations, and licence/contact.

**Why do dataset cards matter for compliance?**
They evidence provenance and data governance, which buyers and frameworks like the EU AI Act increasingly expect for training data.

---

*Every nxted dataset ships with a card and provenance log: [see the Data Trust Pack](/trust) or [request a Test Kit](/portal/capture/new).*`,
  },

  // ──────────────────────── Tier 4: defensible niche ────────────────────────
  {
    slug: 'industrial-manipulation-datasets',
    title: 'Industrial Manipulation Datasets: Electrical, CNC & Assembly Skills for Robots',
    excerpt:
      'Most open robot data is tabletop pick-and-place. Industrial manipulation - wiring, machine tending, assembly - is under-represented and high-value. Here is why.',
    category: 'Industrial',
    tags: ['industrial manipulation', 'electrical assembly', 'CNC', 'physical AI'],
    metaTitle: 'Industrial Manipulation Datasets for Robots',
    metaDesc:
      'Why industrial manipulation data - electrical assembly, CNC/machine tending, inspection - is scarce, high-value, and what a good industrial dataset needs.',
    content: `**TL;DR.** Industrial manipulation - electrical panel wiring, machine tending, CNC setup, electronics assembly and inspection - is under-represented in open robot datasets, which skew toward tabletop pick-and-place. It is also where automation demand is highest. Capturing skilled, credentialed industrial demonstrations is one of the most valuable and least-served data niches in physical AI.

## Why open datasets under-serve industry

Collections like [Open X-Embodiment](https://robotics-transformer-x.github.io/) and [DROID](https://droid-dataset.github.io/) are excellent but dominated by lab manipulation - grasping household objects on a table. Real industrial tasks involve constrained tools, bimanual coordination, fine tolerances, safety equipment and consequences for error. That data is harder to collect and rarely free.

## What makes industrial data valuable

- **Demand.** Manufacturing, electrical and assembly work is where robotics ROI is concentrated.
- **Skill depth.** These tasks need credentialed workers, so the demonstrations encode real expertise.
- **Scarcity.** Gig crowds can film a kitchen; they cannot wire a panel correctly.
- **Diversity.** Many tools, fixtures and tolerances - the variation [scaling laws](https://arxiv.org/abs/2410.18647) reward.

## What a good industrial dataset needs

1. Verified, credentialed contributors for the task.
2. Egocentric capture plus depth and hand pose for fine manipulation.
3. A safety/PPE record for the site (electrical, machining, construction).
4. Action segmentation and success/failure labels tied to a real quality standard.
5. Robotics formats and a dataset card - see [what a good dataset card looks like](/research/robotics-dataset-card).

## nxted's flagship vertical

Skilled industrial and technical work is exactly nxted Capture's flagship vertical - electrical assembly, machine tending, CNC setup, electronics and inspection - captured from verified, consented contributors. See [nxted Capture](/capture) and [why skilled-trade demonstrations beat generic factory footage](/research/skilled-trade-demonstrations-vs-factory-footage).

## FAQ

**What is an industrial manipulation dataset?**
Demonstration data of skilled industrial tasks - electrical assembly, machine tending, CNC setup, inspection - used to train robots for manufacturing and technical work.

**Why is industrial robot data scarce?**
Open datasets focus on lab tabletop tasks. Industrial work needs credentialed workers, real fixtures and safety controls, so it is harder and costlier to capture.

**What should industrial demonstration data include?**
Credentialed contributors, egocentric capture with depth and hand pose, a safety record, success/failure labels against a quality standard, and robotics-ready formats.

---

*Commission skilled industrial capture: [explore nxted Capture](/capture) or [request a Test Kit](/portal/capture/new).*`,
  },

  {
    slug: 'skilled-trade-demonstrations-vs-factory-footage',
    title: 'Why Skilled-Trade Demonstrations Beat Generic Factory Footage',
    excerpt:
      'CCTV-style factory footage is cheap but weak for robot learning. Purpose-recorded skilled-trade demonstrations carry the signal policies actually need.',
    category: 'Industrial',
    tags: ['skilled trades', 'demonstration data', 'robot learning', 'physical AI'],
    metaTitle: 'Skilled-Trade Demonstrations vs Generic Factory Footage',
    metaDesc:
      'Why purpose-recorded skilled-trade demonstrations beat generic factory or CCTV footage for robot learning: viewpoint, labels, consent and skill.',
    content: `**TL;DR.** Generic factory or CCTV footage is third-person, unlabelled, and rarely consented - which makes it weak training data. Purpose-recorded skilled-trade demonstrations are first-person, annotated, and produced by qualified workers, so they carry the viewpoint, action signal and skill that robot policies actually learn from.

## The problem with "found" factory footage

- **Wrong viewpoint.** Overhead or wall cameras are third-person; robots need the first-person view their own sensors occupy.
- **No labels.** Raw footage has no action segmentation, pose or success flags.
- **No consent or provenance.** Repurposing workplace video raises real legal and ethical problems under GDPR and India's DPDP Act.
- **No skill guarantee.** You cannot verify the worker is doing the task correctly.

## What purpose-recorded demonstrations add

- **First-person capture** aligned to robot sensors (see [how to collect egocentric data](/research/how-to-collect-egocentric-data-hardware)).
- **Annotation** - segmentation, hand pose, success/failure (see [annotating egocentric data](/research/annotating-egocentric-data)).
- **Verified skill** - the contributor is qualified for the task.
- **Consent and provenance** - the [Data Trust Pack](/trust).

## Why this matters more for skilled work

For simple tasks the gap is smaller. For skilled industrial work - wiring, machining, assembly - the difference between a correct and an incorrect demonstration is subtle and only a qualified person reliably produces it. Train on unverified footage and you risk teaching the robot the wrong procedure.

## The honest trade-off

Found footage is cheaper. Purpose-recorded demonstrations cost more but are trainable, legal and skill-verified. For high-value industrial tasks, the second is almost always the better investment.

## FAQ

**Is factory CCTV footage good for robot training?**
Generally no - it is third-person, unlabelled and rarely consented. Robots need first-person, annotated demonstrations.

**What makes skilled-trade demonstrations better?**
First-person viewpoint, action and pose annotation, verified contributor skill, and consent/provenance - the signals policies actually learn from.

**When is generic footage acceptable?**
For coarse context or simple tasks. For skilled, safety-critical industrial work, purpose-recorded, verified demonstrations are far safer.

---

*Get skill-verified demonstrations: [see nxted Capture](/capture) or read about [industrial manipulation datasets](/research/industrial-manipulation-datasets).*`,
  },

  {
    slug: 'garment-manipulation-deformable-object-data',
    title: 'Garment Manipulation: Why Deformable-Object Data Is Hard and Valuable',
    excerpt:
      'Folding cloth is harder for robots than gripping a box. Deformable-object data is scarce and valuable - here is why, and what good garment data looks like.',
    category: 'Industrial',
    tags: ['garment manipulation', 'deformable objects', 'tailoring', 'physical AI'],
    metaTitle: 'Garment Manipulation: Deformable-Object Data for Robots',
    metaDesc:
      'Why deformable-object and garment manipulation is hard for robots, why that data is valuable, and what good garment demonstration data should contain.',
    content: `**TL;DR.** Deformable objects like cloth have effectively infinite configurations, self-occlude, and deform unpredictably when grasped - which makes garment manipulation one of the hardest open problems in robotics. That difficulty is exactly why high-quality garment demonstration data, captured from skilled tailors, is scarce and valuable.

## Why cloth is hard for robots

- **Infinite state space.** A rigid box has a pose; a shirt has near-infinite configurations.
- **Self-occlusion.** Folds hide the parts of the garment a policy needs to see.
- **Unpredictable dynamics.** Fabric deforms as you grasp it, so the same action has different effects.
- **Bimanual coordination.** Most textile tasks need two hands working together.

Deformable-object manipulation is an active research area precisely because rigid-object methods do not transfer.

## What makes garment data valuable

- It is scarce - hard to simulate and hard to collect well.
- It rewards real human skill - tailors have decades of dexterity.
- It generalises across a huge consumer and industrial market (apparel, laundry, soft goods).

## What good garment demonstration data contains

1. Egocentric, often multi-view, capture to handle occlusion.
2. Hand pose and bimanual tracking.
3. Action segmentation across sub-steps (align, fold, press, stitch).
4. Success criteria defined with a skilled practitioner.
5. Diversity of fabrics, garments and conditions.

## nxted and textile skill

Tailoring and textile work is one of nxted Capture's skill categories, captured from skilled contributors. See [nxted Capture](/capture) and our guide to [collecting egocentric data](/research/how-to-collect-egocentric-data-hardware).

## FAQ

**Why is garment manipulation hard for robots?**
Cloth has near-infinite configurations, self-occludes, and deforms unpredictably when grasped, so methods built for rigid objects do not transfer.

**Why is deformable-object data valuable?**
It is scarce, hard to simulate, rewards real human dexterity, and applies to a large apparel and soft-goods market.

**What should garment demonstration data include?**
Egocentric (often multi-view) capture, hand pose and bimanual tracking, action segmentation, skilled success criteria, and fabric/garment diversity.

---

*Need deformable-object demonstrations? [Explore nxted Capture](/capture) or [request a Test Kit](/portal/capture/new).*`,
  },

  {
    slug: 'consent-first-robotics-data',
    title: 'Consent-First Robotics Data: Provenance, India’s DPDP Act, and the EU AI Act',
    excerpt:
      'If your training data shows people, it is personal data. A practical look at consent, provenance and compliance for robotics datasets in 2026.',
    category: 'Compliance',
    tags: ['consent', 'DPDP Act', 'EU AI Act', 'data provenance'],
    metaTitle: 'Consent-First Robotics Data: DPDP & EU AI Act',
    metaDesc:
      'Consent, provenance and compliance for robotics training data: India’s DPDP Act, the EU AI Act and GDPR, and what a compliant dataset must ship with.',
    content: `**TL;DR.** Egocentric robotics data shows people, so it is personal data. A consent-first approach means explicit, withdrawable consent, fair pay, redaction of faces and PII, a provenance log, and a DPA - aligned with India's DPDP Act and, for UK/EU buyers, GDPR and the EU AI Act. Compliance is increasingly a buying requirement, not a nicety.

## Why robotics data is personal data

First-person capture records faces, voices, locations and sometimes biometric signals. Under [GDPR](https://gdpr.eu/) and India's [DPDP Act, 2023](https://www.meity.gov.in/data-protection-framework), that is personal (sometimes special-category) data, with obligations around consent, purpose and transfer.

## What the EU AI Act adds

The [EU AI Act (Regulation 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) places data-governance duties on high-risk AI providers - Article 10 (data quality and provenance) and Annex IV (technical documentation). If your robot or model is high-risk, your training-data vendor is part of your compliance story.

## A consent-first checklist

1. **Explicit, withdrawable consent** from every contributor.
2. **Fair pay**, documented, above local market rate.
3. **No minors** and redaction of faces, plates, screens and PII.
4. **Provenance log** tracing each clip to its source.
5. **A DPA** with UK IDTA / EU SCCs for international transfers.
6. **A dataset card** documenting scope and limitations.

## Why this is a competitive advantage

Buyers in regulated industries cannot use data they cannot defend. A vendor that ships consent, provenance and a DPA by default removes weeks of legal review. That is the purpose of nxted's [Data Trust Pack](/trust).

## FAQ

**Is robotics training data personal data?**
If it contains identifiable people - faces, voices, locations - yes, under GDPR and India's DPDP Act, with consent and transfer obligations.

**What does the EU AI Act require of training data?**
For high-risk systems, documented data governance and provenance (Article 10) and technical documentation (Annex IV) that your data vendor should help supply.

**What makes a robotics dataset compliant?**
Explicit consent, fair pay, no minors, redaction, a provenance log, a DPA with IDTA/SCCs, and a dataset card.

---

*See how nxted ships compliance by default: [the Data Trust Pack](/trust) or [talk to us about compliance](/contact).*`,
  },

  {
    slug: 'india-skilled-work-data-layer',
    title: 'India as the Skilled-Work Data Layer for Physical AI',
    excerpt:
      'Physical AI needs diverse demonstrations of skilled human work. India offers a uniquely broad, English-capable skilled workforce - captured with consent.',
    category: 'Industrial',
    tags: ['India', 'skilled work', 'physical AI', 'data sourcing'],
    metaTitle: 'India as the Skilled-Work Data Layer for Physical AI',
    metaDesc:
      'Why India is a strong source of skilled-work demonstration data for physical AI: workforce breadth, English capability, and consent-first sourcing.',
    content: `**TL;DR.** Physical AI needs diverse demonstrations of skilled human work, and generalisation tracks the breadth of environments and tasks a policy sees. India offers one of the world's largest and broadest skilled workforces, with strong English capability for instruction and annotation - and, captured consent-first, it can be a responsible data layer. Skill depth and provenance, not cost, are the point.

## What physical AI actually needs from a workforce

- **Breadth of skilled tasks** - the variation that [imitation-learning scaling laws](https://arxiv.org/abs/2410.18647) reward.
- **Real expertise** - credentialed trades and professions, not just generic labour.
- **Communication** - English capability for clear task instruction and narration.
- **Scale** - enough contributors to cover many environments and tools.

## Why India fits

India has a very large skilled workforce spanning the trades and professions - manufacturing, electrical, textile, construction, plus engineering, medical and legal expertise - with broad working-population English. That combination of breadth, skill and communication is rare at scale.

## The responsibility condition

Lower cost is real, but it is the footnote, not the pitch. Sourcing in India is only legitimate if it is consent-first: contributors paid above local market rate, explicit and withdrawable consent, redaction, and provenance - all under India's [DPDP Act](https://www.meity.gov.in/data-protection-framework) and a GDPR-aligned DPA for UK/EU buyers. See [consent-first robotics data](/research/consent-first-robotics-data).

## What this means for buyers

You get a broader training distribution - more skills, tools and settings - than lab-bound or single-market datasets, delivered robotics-ready and compliant. The same logic underpins [industrial manipulation datasets](/research/industrial-manipulation-datasets).

## FAQ

**Why source physical-AI data in India?**
For the breadth and depth of skilled work and strong English capability at scale - a wide training distribution - sourced consent-first rather than purely for cost.

**Is India-sourced data compliant for UK/EU buyers?**
It can be: under India's DPDP Act with explicit consent and a GDPR-aligned DPA, IDTA/SCCs for transfers, redaction and provenance.

**Is this just about lower cost?**
No. Cost is lower, but the value is skill depth, diversity and provenance. Cost is the footnote, not the pitch.

---

*See the method: [nxted Capture](/capture) and the [Data Trust Pack](/trust).*`,
  },

  // ──────────────────────── Tier 5: trend / analysis ────────────────────────
  {
    slug: 'open-data-wave-egocentric-datasets',
    title: 'The Open-Data Wave: What Free Egocentric Datasets Mean for Robotics Teams',
    excerpt:
      'Open datasets like Open X-Embodiment, DROID and Ego-Exo4D changed robot learning. What they are great for - and where commissioned data still wins.',
    category: 'Analysis',
    tags: ['open datasets', 'egocentric data', 'robotics', 'analysis'],
    metaTitle: 'The Open-Data Wave: Free Egocentric Datasets for Robotics',
    metaDesc:
      'What free egocentric and robot datasets (Open X-Embodiment, DROID, Ego-Exo4D) are great for - and where commissioned, skill-specific data still wins.',
    content: `**TL;DR.** A wave of open datasets - Open X-Embodiment, DROID, Ego-Exo4D and the LeRobot community sets - has made robot pre-training far more accessible. They are excellent foundations, but they cannot be commissioned for a specific skill, environment or compliance need, so commissioned data remains complementary rather than obsolete.

## The open datasets that matter

- **[Open X-Embodiment / RT-X](https://robotics-transformer-x.github.io/)** - pooled data across many robot embodiments and institutions.
- **[DROID](https://droid-dataset.github.io/)** - a large, diverse teleoperation dataset.
- **[Ego-Exo4D](https://ego-exo4d-data.org/)** - large-scale egocentric + exocentric video of skilled activities.
- **[LeRobot](https://github.com/huggingface/lerobot) community datasets** - shared on the Hugging Face Hub.

## What open data is great for

- Pre-training and baselines without collection cost.
- Benchmarking and reproducibility.
- Bootstrapping a project before you know exactly what you need.

## Where open data falls short

- **You cannot commission it.** It will not contain your specific skill, object set or environment.
- **Coverage gaps.** Industrial and specialist skilled work is thin.
- **Licence and provenance.** Terms vary; some are research-only and may not fit commercial deployment or strict compliance.

## The practical strategy: layer them

Use open data to pre-train, then commission targeted, skill-verified, compliant data to fine-tune for your task - the breadth-then-precision pattern from [human egocentric video vs teleoperation](/research/human-egocentric-video-vs-teleoperation). Open data lowers the floor; commissioned data raises your ceiling.

## FAQ

**Do free robot datasets replace buying data?**
No. They are excellent for pre-training and baselines but cannot be commissioned for your specific skill, environment or compliance needs.

**Which open egocentric/robot datasets should I know?**
Open X-Embodiment, DROID, Ego-Exo4D and LeRobot community datasets are the most widely used.

**How should I combine open and commissioned data?**
Pre-train on open data for breadth, then fine-tune on targeted, skill-verified, compliant data for your task.

---

*Need the targeted layer on top of open data? [Explore nxted Capture](/capture) or read the [buyer's guide](/research/how-to-buy-robotics-training-data).*`,
  },

  {
    slug: '2026-state-of-physical-ai-training-data',
    title: 'The 2026 State of Physical AI Training Data',
    excerpt:
      'Foundation models for robots are arriving, but the data layer is still the constraint. A grounded look at where physical-AI training data stands in 2026.',
    category: 'Analysis',
    tags: ['physical AI', 'state of the industry', '2026', 'analysis'],
    metaTitle: 'The 2026 State of Physical AI Training Data',
    metaDesc:
      'Where physical-AI training data stands in 2026: robot foundation models, the data bottleneck, open datasets, and the shift to consented, diverse capture.',
    content: `**TL;DR.** In 2026 the models for physical AI are maturing faster than the data to train them. Robot foundation models and vision-language-action policies are arriving, open datasets have grown, but diverse, skilled, compliant demonstration data remains the binding constraint - which is shifting attention from model architecture to data sourcing.

## Where the models are

Robot foundation models and VLAs have moved from research to early products - work like NVIDIA's [Isaac GR00T](https://developer.nvidia.com/isaac/gr00t) on humanoid foundation models, open [OpenVLA](https://arxiv.org/abs/2406.09246), and general policies from companies such as Physical Intelligence. The modelling side is advancing quickly.

## Where the data is

- **Open datasets grew** - [Open X-Embodiment](https://robotics-transformer-x.github.io/), [DROID](https://droid-dataset.github.io/), [Ego-Exo4D](https://ego-exo4d-data.org/) - lowering the floor for pre-training.
- **The bottleneck moved, not away.** Generalisation tracks environment and object diversity ([scaling laws](https://arxiv.org/abs/2410.18647)), and skilled, industrial and long-tail tasks remain thinly covered.
- **Compliance arrived.** The [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) and data-protection regimes made provenance and consent a procurement requirement.

## The three shifts to watch

1. **From volume to diversity.** Buyers increasingly value breadth of tasks and settings over raw hours.
2. **From found data to consented capture.** Provenance is now a feature, not paperwork.
3. **From single-source to diversified vendors** - see [why AI labs are diversifying their data vendors](/research/why-ai-labs-diversify-data-vendors).

## What it means if you build robots

Assume models will keep improving and that your edge will increasingly come from the data you can source - specific, diverse, skill-verified and compliant. (We describe trends qualitatively and cite primary sources; we avoid precise market figures we cannot verify.)

## FAQ

**What is the biggest constraint in physical AI in 2026?**
Data - specifically diverse, skilled, compliant demonstration data. Models are advancing faster than the data to train them.

**Are open datasets enough now?**
They are strong foundations for pre-training but still under-cover skilled, industrial and long-tail tasks, so commissioned data remains important.

**What is changing in how teams buy data?**
A shift toward diversity over raw volume, consented capture over found footage, and diversified vendors over single sourcing.

---

*Plan your 2026 data strategy: [explore nxted Capture](/capture) or [talk to us](/contact).*`,
  },

  {
    slug: 'why-ai-labs-diversify-data-vendors',
    title: 'Why AI Labs Are Diversifying Their Data Vendors',
    excerpt:
      'Single-sourcing training data is a concentration risk. A look at why AI teams are spreading across multiple data vendors and jurisdictions in 2026.',
    category: 'Analysis',
    tags: ['data vendors', 'procurement', 'risk', 'analysis'],
    metaTitle: 'Why AI Labs Are Diversifying Their Data Vendors',
    metaDesc:
      'Why AI teams are diversifying training-data vendors in 2026: concentration risk, jurisdiction and compliance, specialism, and supply resilience.',
    content: `**TL;DR.** Relying on a single training-data vendor concentrates risk - operational, legal and quality. In 2026 more AI teams are diversifying across multiple vendors and jurisdictions to improve resilience, match specialists to specific data needs, and satisfy UK/EU compliance. Specialist providers increasingly sit alongside large generalists rather than replacing them.

## The case for diversifying

- **Concentration risk.** A single supplier is a single point of failure for delivery, security and continuity.
- **Specialism.** No one vendor is best at everything - large generalists for volume labelling, specialists for skilled egocentric capture, open datasets for pre-training.
- **Jurisdiction and compliance.** UK/EU buyers increasingly want clear data residency, a DPA, and an [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) position - sometimes from a different vendor than their bulk labelling.
- **Quality benchmarking.** Multiple sources let you compare and avoid lock-in.

## How teams structure a diversified stack

1. **Open datasets** for pre-training (see [the open-data wave](/research/open-data-wave-egocentric-datasets)).
2. **A generalist vendor** for high-volume annotation.
3. **A specialist** for skilled, egocentric or industrial capture with provenance.
4. **An evaluation partner** for expert RLHF and red-teaming.

## What to standardise across vendors

- Output formats ([LeRobot/RLDS/HDF5](/research/lerobot-vs-rlds-vs-hdf5)).
- A consistent data spec ([how to write one](/research/how-to-write-robotics-data-spec)).
- Compliance baselines - consent, provenance, DPA.

## Where nxted fits

nxted is the specialist layer: expert-reviewed egocentric capture of skilled work, and expert AI evaluation, both UK/EU-contracted with a [Data Trust Pack](/trust). It is designed to slot alongside your generalist vendors and open data, not replace them.

## FAQ

**Why diversify AI training-data vendors?**
To reduce concentration risk, match specialists to specific needs, meet jurisdiction and compliance requirements, and benchmark quality without lock-in.

**How do teams structure a multi-vendor data stack?**
Open data for pre-training, a generalist for volume labelling, a specialist for skilled capture, and an evaluation partner for RLHF.

**What should be standardised across vendors?**
Output formats, a consistent data spec, and compliance baselines (consent, provenance, DPA).

---

*Add a specialist layer to your data stack: [explore nxted](/capture) or [talk to us](/contact).*`,
  },
];
