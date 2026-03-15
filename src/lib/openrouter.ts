const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const OPENROUTER_BASE_URL =
  process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-70b-instruct";
const FALLBACK_MODEL = "meta-llama/llama-3.1-8b-instruct";

const SYSTEM_PROMPT = `You are nxtED AI Tutor, built by OFORO AI. You are an expert, patient, and encouraging educational assistant. You adapt your explanations to the learner's level and always aim to build deep understanding rather than surface-level memorisation. When appropriate, use analogies, examples, and step-by-step breakdowns. Keep responses focused and concise.`;

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

async function callOpenRouter(
  messages: OpenRouterMessage[],
  model: string = OPENROUTER_MODEL
): Promise<string> {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://nxted.ai",
      "X-Title": "nxtED AI",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    if (model !== FALLBACK_MODEL) {
      console.warn(
        `Primary model ${model} failed (${response.status}), trying fallback ${FALLBACK_MODEL}`
      );
      return callOpenRouter(messages, FALLBACK_MODEL);
    }
    throw new Error(
      `OpenRouter API error: ${response.status} ${response.statusText}`
    );
  }

  const data: OpenRouterResponse = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in OpenRouter response");
  }

  return content;
}

export async function chatWithAITutor(
  userMessage: string,
  conversationHistory: OpenRouterMessage[] = []
): Promise<string> {
  const messages: OpenRouterMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: "user", content: userMessage },
  ];

  return callOpenRouter(messages);
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export async function generateQuiz(
  lessonContent: string,
  keyPoints: string[]
): Promise<QuizQuestion[]> {
  const messages: OpenRouterMessage[] = [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}

You are generating quiz questions for a lesson. Return ONLY a valid JSON array with no additional text. Each element must have this shape:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctIndex": 0-3,
  "explanation": "string"
}

Generate 5 questions that test understanding of the key concepts, not just recall.`,
    },
    {
      role: "user",
      content: `Generate quiz questions for this lesson.

Lesson content:
${lessonContent}

Key points to test:
${keyPoints.map((kp, i) => `${i + 1}. ${kp}`).join("\n")}`,
    },
  ];

  const response = await callOpenRouter(messages);

  const jsonMatch = response.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Failed to parse quiz response as JSON array");
  }

  const questions: QuizQuestion[] = JSON.parse(jsonMatch[0]);
  return questions;
}

export interface SpacedRepCard {
  front: string;
  back: string;
}

export async function generateSpacedRepCards(
  lessonContent: string
): Promise<SpacedRepCard[]> {
  const messages: OpenRouterMessage[] = [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}

You are generating spaced-repetition flashcards for a lesson. Return ONLY a valid JSON array with no additional text. Each element must have this shape:
{
  "front": "string (the question or prompt)",
  "back": "string (the answer or explanation)"
}

Generate 8-12 cards that cover the key concepts. The front should be a clear question or fill-in-the-blank prompt. The back should be a concise, accurate answer.`,
    },
    {
      role: "user",
      content: `Generate spaced-repetition flashcards for this lesson:\n\n${lessonContent}`,
    },
  ];

  const response = await callOpenRouter(messages);

  const jsonMatch = response.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Failed to parse spaced-rep cards response as JSON array");
  }

  const cards: SpacedRepCard[] = JSON.parse(jsonMatch[0]);
  return cards;
}
