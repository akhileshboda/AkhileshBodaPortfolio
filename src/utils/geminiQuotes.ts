import { getGenerativeModel, Schema } from 'firebase/ai';
import { ai } from '@/firebase.js';

const quoteSchema = Schema.object({
  properties: {
    quotes: Schema.array({
      items: Schema.string({
        description: 'A concise portfolio quote under 85 characters.',
      }),
      minItems: 3,
      maxItems: 3,
      description: 'Exactly three concise portfolio-aligned quotes.',
    }),
  },
});

const previousQuotesKey = 'akhilesh-portfolio-gemini-quotes:last';
const fallbackQuotesKey = 'akhilesh-portfolio-gemini-quotes:fallback-last';

const fallbackQuotePool = [
  'Systems matter most when they disappear into the work.',
  'Build with care, then let the product speak clearly.',
  'Good products make complex systems feel humane.',
  'The best interfaces turn intent into momentum.',
  'AI is useful when it sharpens judgment, not replaces it.',
  'Design the workflow before polishing the surface.',
  'Quiet software earns trust through every small detail.',
  'Mobile craft lives in the seconds users never notice.',
  'Make the system legible, then make it feel effortless.',
  'Useful technology starts with respect for the user.',
  'A thoughtful product is a promise kept repeatedly.',
];

let quoteRequest: Promise<string[]> | null = null;
let fallbackQuotesForLoad: string[] | null = null;

function normalizeQuoteText(quote: string) {
  return quote
    .trim()
    .replace(/^["“”]+|["“”]+$/g, '')
    .replace(/\s+/g, ' ');
}

function comparableQuoteText(quote: string) {
  return normalizeQuoteText(quote).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function readPreviousQuotes() {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.sessionStorage.getItem(previousQuotesKey);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((quote): quote is string => typeof quote === 'string').slice(0, 3)
      : [];
  } catch {
    return [];
  }
}

function writePreviousQuotes(quotes: string[]) {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(previousQuotesKey, JSON.stringify(quotes));
  } catch {
    // Storage failures should never block the quote experience.
  }
}

function shuffledQuotes(quotes: string[]) {
  return [...quotes]
    .map((quote) => ({ quote, sort: crypto.getRandomValues(new Uint32Array(1))[0] }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ quote }) => quote);
}

function readFallbackQuotes() {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.sessionStorage.getItem(fallbackQuotesKey);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((quote): quote is string => typeof quote === 'string').slice(0, 3)
      : [];
  } catch {
    return [];
  }
}

function writeFallbackQuotes(quotes: string[]) {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(fallbackQuotesKey, JSON.stringify(quotes));
  } catch {
    // Storage failures should never block the quote experience.
  }
}

export function getFallbackQuotes() {
  if (fallbackQuotesForLoad) return fallbackQuotesForLoad;

  const previousFallbacks = new Set(readFallbackQuotes());
  const freshPool = fallbackQuotePool.filter((quote) => !previousFallbacks.has(quote));
  const source = freshPool.length >= 3 ? freshPool : fallbackQuotePool;
  fallbackQuotesForLoad = shuffledQuotes(source).slice(0, 3);
  writeFallbackQuotes(fallbackQuotesForLoad);

  return fallbackQuotesForLoad;
}

function buildPrompt(previousQuotes: string[], attempt: number) {
  const variationSeed = crypto.randomUUID();
  const avoidLine = previousQuotes.length
    ? `Do not reuse or closely paraphrase these previous quotes: ${previousQuotes.join(' | ')}.`
    : 'Create a fresh set that does not sound like a common portfolio tagline.';

  return [
    'Generate exactly three concise quotes for Akhilesh Boda\'s portfolio sidebar.',
    'Tone: product-minded, empathetic, technical, precise, and quietly ambitious.',
    'Themes: human-centered software, systems thinking, mobile/product craft, AI-assisted building.',
    'Avoid generic motivational language, cliches, hashtags, author names, and quotation marks.',
    'Each quote must be fewer than 85 characters.',
    'The three quotes must be meaningfully different from each other.',
    avoidLine,
    `Variation seed: ${variationSeed}. Attempt: ${attempt}.`,
  ].join('\n');
}

function normalizeQuotes(value: unknown, previousQuotes: string[]): string[] {
  if (!value || typeof value !== 'object' || !('quotes' in value)) {
    throw new Error('Gemini quote payload was missing quotes.');
  }

  const quotes = (value as { quotes: unknown }).quotes;
  if (!Array.isArray(quotes)) {
    throw new Error('Gemini quote payload quotes were not an array.');
  }

  const cleaned = quotes
    .filter((quote): quote is string => typeof quote === 'string')
    .map(normalizeQuoteText)
    .filter(Boolean)
    .slice(0, 3);

  if (cleaned.length !== 3) {
    throw new Error('Gemini did not return exactly three usable quotes.');
  }

  const comparableQuotes = cleaned.map(comparableQuoteText);
  if (new Set(comparableQuotes).size !== 3) {
    throw new Error('Gemini returned duplicate quotes.');
  }

  const previousQuoteSet = new Set(previousQuotes.map(comparableQuoteText));
  if (comparableQuotes.some((quote) => previousQuoteSet.has(quote))) {
    throw new Error('Gemini reused a previous quote.');
  }

  return cleaned;
}

export function getGeminiQuotes() {
  if (quoteRequest) return quoteRequest;

  quoteRequest = (async () => {
    const previousQuotes = readPreviousQuotes();
    const model = getGenerativeModel(ai, {
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        maxOutputTokens: 180,
        responseMimeType: 'application/json',
        responseSchema: quoteSchema,
      },
    });

    let lastError: unknown;

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const result = await model.generateContent(buildPrompt(previousQuotes, attempt));
        const quotes = normalizeQuotes(JSON.parse(result.response.text()), previousQuotes);
        writePreviousQuotes(quotes);
        return quotes;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError instanceof Error ? lastError : new Error('Gemini quote generation failed.');
  })().catch((error) => {
    quoteRequest = null;
    throw error;
  });

  return quoteRequest;
}
