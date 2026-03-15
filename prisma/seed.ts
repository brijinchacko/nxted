import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TOPICS = [
  { name: "Communication & Public Speaking", slug: "communication", icon: "\u{1F4AC}", color: "#00e5b4" },
  { name: "History & Culture", slug: "history", icon: "\u{1F3DB}", color: "#7b5cff" },
  { name: "Science & Biology", slug: "science", icon: "\u{1F52C}", color: "#ff8a3d" },
  { name: "Logic & Math", slug: "math", icon: "\u{1F9EE}", color: "#ffc93c" },
  { name: "Personal Finance", slug: "finance", icon: "\u{1F4B0}", color: "#4ade80" },
  { name: "Psychology & Mindset", slug: "psychology", icon: "\u{1F9E0}", color: "#f472b6" },
  { name: "Philosophy", slug: "philosophy", icon: "\u{1F914}", color: "#94a3b8" },
  { name: "Art & Literature", slug: "art", icon: "\u{1F3A8}", color: "#fb923c" },
  { name: "Productivity", slug: "productivity", icon: "\u26A1", color: "#22d3ee" },
  { name: "Business & Entrepreneurship", slug: "business", icon: "\u{1F4CA}", color: "#818cf8" },
  { name: "Industrial & Engineering", slug: "engineering", icon: "\u2699\uFE0F", color: "#6ee7b7" },
  { name: "PLC & Automation", slug: "plc", icon: "\u{1F916}", color: "#00e5b4" },
];

async function main() {
  console.log("Seeding topics...");

  for (const topic of TOPICS) {
    await prisma.topic.upsert({
      where: { slug: topic.slug },
      update: {},
      create: topic,
    });
  }

  // Create a system creator user for seed content
  const creator = await prisma.user.upsert({
    where: { email: "hello@oforo.ai" },
    update: {},
    create: {
      clerkId: "system_creator",
      email: "hello@oforo.ai",
      name: "nxtED Team",
      role: "CREATOR",
      isCreator: true,
      onboardingCompleted: true,
    },
  });

  const commTopic = await prisma.topic.findUnique({
    where: { slug: "communication" },
  });

  if (!commTopic) throw new Error("Communication topic not found");

  // Course 1: The Art of Confident Communication
  const course1 = await prisma.course.upsert({
    where: { slug: "confident-communication" },
    update: {},
    create: {
      title: "The Art of Confident Communication",
      slug: "confident-communication",
      description:
        "Master the fundamentals of clear, confident communication. From everyday conversations to professional presentations, learn techniques that make people listen.",
      topicId: commTopic.id,
      creatorId: creator.id,
      difficulty: "BEGINNER",
      durationMin: 25,
      isPublished: true,
      isFree: true,
    },
  });

  const course1Lessons = [
    {
      title: "Why Communication Matters",
      slug: "why-communication-matters",
      order: 1,
      isFree: true,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "Communication is the #1 skill employers seek",
        "Poor communication costs businesses billions annually",
        "Everyone can improve with practice",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Communication is more than just talking. It is the ability to convey ideas clearly, listen actively, and adapt your message to your audience. Studies show it is the most sought-after skill across all industries.",
          },
          {
            type: "fact",
            content:
              "Did you know? A study by the National Association of Colleges and Employers found that communication skills are rated as the #1 quality employers look for in job candidates, even above technical abilities.",
          },
          {
            type: "practice",
            content:
              "Think of the last conversation where you felt misunderstood. What could you have done differently? Write down one specific change you would make.",
          },
          {
            type: "recap",
            content:
              "Key takeaways: Communication is a learnable skill. It encompasses speaking, listening, and adapting. It is the most valued professional skill. Small improvements create big results.",
          },
        ],
      },
    },
    {
      title: "Active Listening Techniques",
      slug: "active-listening",
      order: 2,
      isFree: true,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "Active listening means fully concentrating on the speaker",
        "Use the RASA technique: Receive, Appreciate, Summarise, Ask",
        "Body language accounts for 55% of communication",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Active listening is the foundation of great communication. It means fully concentrating on what is being said rather than passively hearing words. The RASA technique helps: Receive (pay attention), Appreciate (show you are engaged), Summarise (reflect back), Ask (clarify with questions).",
          },
          {
            type: "fact",
            content:
              "Research by Albert Mehrabian suggests that 55% of communication is body language, 38% is tone of voice, and only 7% is the actual words spoken. Active listening requires attention to all three.",
          },
          {
            type: "practice",
            content:
              "In your next conversation, try the RASA technique. After the other person finishes speaking, summarise what they said before responding. Notice how it changes the dynamic.",
          },
          {
            type: "recap",
            content:
              "Key takeaways: Active listening means full concentration. RASA: Receive, Appreciate, Summarise, Ask. Body language is crucial. Practice transforms passive hearing into active understanding.",
          },
        ],
      },
    },
    {
      title: "Structuring Your Message",
      slug: "structuring-your-message",
      order: 3,
      isFree: false,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "Use the What-Why-How framework",
        "Lead with the most important point",
        "Keep messages concise and jargon-free",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Great communicators structure their messages. The What-Why-How framework works in almost every situation: What is the key point? Why does it matter to the listener? How should they act on it? This simple structure makes your message memorable.",
          },
          {
            type: "fact",
            content:
              "Jeff Bezos banned PowerPoint at Amazon, requiring six-page narrative memos instead. Why? Because structured writing forces clearer thinking, which leads to better communication.",
          },
          {
            type: "practice",
            content:
              "Take a message you need to deliver this week. Restructure it using What-Why-How. Keep it under 60 seconds when spoken aloud.",
          },
          {
            type: "recap",
            content:
              "Key takeaways: Use What-Why-How for any message. Lead with the most important point. Remove jargon and unnecessary complexity. Structured messages are more memorable.",
          },
        ],
      },
    },
    {
      title: "Handling Difficult Conversations",
      slug: "difficult-conversations",
      order: 4,
      isFree: false,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "Separate the person from the problem",
        "Use I-statements instead of You-statements",
        "Aim for understanding, not winning",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Difficult conversations are unavoidable, but they do not have to be destructive. The key is separating the person from the problem. Use I-statements (I feel concerned when...) instead of You-statements (You always...). Your goal is understanding, not winning.",
          },
          {
            type: "fact",
            content:
              "Harvard's Difficult Conversations Project found that most conflicts have three layers: the What Happened story, the Feelings story, and the Identity story. Addressing all three leads to resolution.",
          },
          {
            type: "practice",
            content:
              "Rewrite this statement using an I-statement: 'You never listen to my ideas in meetings.' How does the reframed version feel different?",
          },
          {
            type: "recap",
            content:
              "Key takeaways: Separate person from problem. Use I-statements. Aim for understanding. Address feelings and identity, not just facts.",
          },
        ],
      },
    },
    {
      title: "Building Communication Confidence",
      slug: "building-confidence",
      order: 5,
      isFree: false,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "Confidence comes from preparation and practice",
        "Power posing can reduce cortisol by 25%",
        "Start small and build gradually",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Communication confidence is not innate; it is built through deliberate practice. Start with low-stakes situations and gradually increase difficulty. Preparation is your secret weapon: the more prepared you are, the more confident you feel.",
          },
          {
            type: "fact",
            content:
              "Amy Cuddy's research at Harvard showed that holding a power pose for just two minutes can increase testosterone by 20% and decrease cortisol by 25%, boosting confidence before high-stakes conversations.",
          },
          {
            type: "practice",
            content:
              "Set a 30-day communication challenge: Day 1-10, start conversations with strangers. Day 11-20, share an opinion in a group setting. Day 21-30, lead a discussion or give a short presentation.",
          },
          {
            type: "recap",
            content:
              "Key takeaways: Confidence is built, not born. Preparation reduces anxiety. Power posing helps physiologically. Gradual exposure builds lasting confidence.",
          },
        ],
      },
    },
  ];

  for (const lesson of course1Lessons) {
    await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course1.id, order: lesson.order } },
      update: {},
      create: {
        ...lesson,
        courseId: course1.id,
      },
    });
  }

  // Course 2: Public Speaking Fundamentals
  const course2 = await prisma.course.upsert({
    where: { slug: "public-speaking-fundamentals" },
    update: {},
    create: {
      title: "Public Speaking Fundamentals",
      slug: "public-speaking-fundamentals",
      description:
        "Overcome stage fright and deliver presentations that captivate your audience. Learn the techniques used by TED speakers and world-class presenters.",
      topicId: commTopic.id,
      creatorId: creator.id,
      difficulty: "INTERMEDIATE",
      durationMin: 20,
      isPublished: true,
      isFree: false,
      price: 9.99,
    },
  });

  const course2Lessons = [
    {
      title: "Overcoming Stage Fright",
      slug: "overcoming-stage-fright",
      order: 1,
      isFree: true,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "Stage fright is a natural fight-or-flight response",
        "Reframe anxiety as excitement",
        "Breathing techniques calm the nervous system",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Stage fright affects 75% of people. It is a natural fight-or-flight response, not a character flaw. The most effective strategy is reframing: instead of telling yourself 'I am nervous,' say 'I am excited.' Research shows this simple shift significantly improves performance.",
          },
          {
            type: "fact",
            content:
              "Even experienced speakers get nervous. Warren Buffett was so terrified of public speaking in his twenties that he signed up for a Dale Carnegie course to overcome it. He considers it the most valuable investment he ever made.",
          },
          {
            type: "practice",
            content:
              "Try box breathing before your next presentation: Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat three times. This activates your parasympathetic nervous system.",
          },
          {
            type: "recap",
            content:
              "Key takeaways: Stage fright is normal and manageable. Reframe anxiety as excitement. Use box breathing to calm nerves. Even legends like Buffett had to learn this skill.",
          },
        ],
      },
    },
    {
      title: "Crafting Your Opening",
      slug: "crafting-your-opening",
      order: 2,
      isFree: false,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "You have 30 seconds to capture attention",
        "Start with a story, question, or surprising fact",
        "Never start with 'Today I am going to talk about...'",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Your opening determines whether people listen. You have about 30 seconds to capture attention. The three most effective openings are: a compelling story, a provocative question, or a surprising statistic. Avoid the generic 'Today I am going to talk about...' opener.",
          },
          {
            type: "fact",
            content:
              "The most-watched TED talk ever, by Sir Ken Robinson, opens with a joke about how 'If you are at a dinner party and you say you work in education, you can see the blood run from their face.' It immediately engages the audience through humour and relatability.",
          },
          {
            type: "practice",
            content:
              "Write three different openings for a topic you know well: one using a story, one with a question, and one with a surprising fact. Which feels most natural to you?",
          },
          {
            type: "recap",
            content:
              "Key takeaways: First 30 seconds are critical. Use stories, questions, or surprising facts. Avoid generic openings. Match your opening style to your personality.",
          },
        ],
      },
    },
    {
      title: "Body Language on Stage",
      slug: "body-language-on-stage",
      order: 3,
      isFree: false,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "Plant your feet and use purposeful movement",
        "Make eye contact with different sections of the audience",
        "Use gestures to emphasize key points",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Your body communicates as loudly as your words. Plant your feet shoulder-width apart for a stable base. Move with purpose, not nervousness. Make eye contact by dividing the room into sections and connecting with each. Use open gestures to emphasize points.",
          },
          {
            type: "fact",
            content:
              "Studies show that speakers who use hand gestures are perceived as 30% more effective and trustworthy than those who keep their hands still. Your gestures literally help the audience process your message.",
          },
          {
            type: "practice",
            content:
              "Record yourself speaking for 60 seconds on any topic. Watch the recording with the sound off. What does your body language communicate? Identify one thing to improve.",
          },
          {
            type: "recap",
            content:
              "Key takeaways: Plant feet for stability. Move purposefully. Section the room for eye contact. Use hand gestures to reinforce your message.",
          },
        ],
      },
    },
    {
      title: "Closing with Impact",
      slug: "closing-with-impact",
      order: 4,
      isFree: false,
      isPublished: true,
      estimatedMinutes: 5,
      keyPoints: [
        "End with a clear call to action",
        "Circle back to your opening for symmetry",
        "Never end with 'That is all I have' or 'Any questions?'",
      ],
      content: {
        cards: [
          {
            type: "concept",
            content:
              "Your closing is what the audience remembers most. End with a clear call to action: what should they do, feel, or think differently? A powerful technique is circling back to your opening story or question, creating a satisfying narrative loop.",
          },
          {
            type: "fact",
            content:
              "The peak-end rule in psychology shows that people judge an experience largely based on how they felt at its peak and at its end. A strong closing can elevate an entire presentation in the audience's memory.",
          },
          {
            type: "practice",
            content:
              "For your next presentation, write your closing before your content. What is the one thing you want people to remember? Build everything towards that moment.",
          },
          {
            type: "recap",
            content:
              "Key takeaways: End with a call to action. Circle back to your opening. Never end weakly. Write your closing first, then build towards it.",
          },
        ],
      },
    },
  ];

  for (const lesson of course2Lessons) {
    await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course2.id, order: lesson.order } },
      update: {},
      create: {
        ...lesson,
        courseId: course2.id,
      },
    });
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
