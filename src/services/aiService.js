import { GoogleGenAI } from "@google/genai";

/**
 * AI Service (Frontend)
 * Handles direct calls to Gemini API using the platform-provided key.
 * Follows gemini-api skill guidelines.
 */

// Model selection based on gemini-api skill
const MODELS = {
  flash: 'gemini-flash-latest',
  pro: 'gemini-3.1-pro-preview',
  basic: 'gemini-3-flash-preview'
};

/**
 * Builds the system instruction for the AI.
 */
function buildSystemInstruction(params) {
  const { contentType, tone, style, wordLimit } = params;
  
  const sections = [
    `You are a world-class ${contentType || 'content'} writer and narrative architect.`,
    `Your writing style is ${style || 'professional'} and your tone is consistently ${tone || 'engaging'}.`,
    '',
    '**CORE QUALITY STANDARDS:**',
    '- Use vivid, sensory language to ground scenes.',
    '- Avoid clichés and generic tropes.',
    '- Ensure a logical flow with strong transitions between paragraphs.',
    ''
  ];

  if (wordLimit) {
    sections.push(
      `**CRITICAL WORD COUNT REQUIREMENT:**`,
      `You MUST generate a response that is approximately ${wordLimit} words.`,
      `- MINIMUM: ${Math.floor(wordLimit * 0.9)} words.`,
      `- MAXIMUM: ${Math.ceil(wordLimit * 1.1)} words.`,
      `- If the topic is simple, expand on the nuances, atmosphere, and internal reflections to reach the target length naturally.`,
      `- NEVER stop early. Use the requested space to explore the idea deeply.`,
      ''
    );
  }

  sections.push(
    '**OUTPUT FORMAT:**',
    'Your response MUST start with "TITLE: " followed by the title, then "CONTENT: " followed by the full body.',
    'Do not include any other text or commentary.'
  );

  return sections.join('\n');
}

/**
 * Builds the user prompt.
 */
function buildUserPrompt(params) {
  const { idea, genre, characters, keywords, targetAudience, wordLimit } = params;
  
  const sections = [
    `ACTUAL TOPIC TO WRITE ABOUT: "${idea}"`,
    '',
    `Your primary mission is to expand on this specific idea: "${idea}". Every paragraph must contribute to the exploration of this exact concept. Do not deviate into unrelated subplots or generic fillers.`,
    ''
  ];

  if (genre) sections.push(`**GENRE / SETTING:** ${genre}`);
  if (characters) sections.push(`**CHARACTERS TO INCLUDE:** ${characters}`);
  if (keywords) sections.push(`**REQUIRED THEMES:** ${keywords}`);
  if (targetAudience) sections.push(`**READER PROFILE:** ${targetAudience}`);

  if (wordLimit) {
    sections.push(
      '',
      `**LENGTH REMINDER:** You have been asked for ${wordLimit} words. Use the generous space to describe the atmosphere, the sensory details of the idea, and the emotional resonance of "${idea}".`,
      `If you find yourself finishing too quickly, slow down and explore the "why" and "how" of the topic in greater detail.`
    );
  }

  sections.push(
    '',
    `Focus intensely on the unique elements of the idea: "${idea}".`,
    'Make sure the resulting text is a deep dive into the provided topic, not a shallow overview.'
  );

  return sections.join('\n');
}

/**
 * Generate content using Gemini frontend SDK.
 */
export async function generateWithGemini(params) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment');
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = buildSystemInstruction(params);
  const userPrompt = buildUserPrompt(params);

  const response = await ai.models.generateContent({
    model: MODELS.flash,
    contents: userPrompt,
    config: {
      systemInstruction,
      temperature: 0.7, // Slightly lower for more focused relevance
      // Increased buffer for safety
      maxOutputTokens: Math.min(Math.ceil((params.wordLimit || 600) * 6) + 2000, 32000)
    }
  });

  const text = response.text;
  if (!text) throw new Error('Empty response from AI engine');

  return parseResponse(text, params.idea);
}

/**
 * Refine existing content.
 */
export async function refineWithGemini(content, instructions) {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    I have the following piece of writing:
    ---
    ${content}
    ---
    
    INSTRUCTIONS FOR REFINEMENT:
    ${instructions}
    
    Please provide the updated content following the same TITLE/CONTENT format.
  `;

  const response = await ai.models.generateContent({
    model: MODELS.flash,
    contents: prompt,
    config: { temperature: 0.7 }
  });

  return parseResponse(response.text, 'Updated Document');
}

function parseResponse(text, fallbackTitle) {
  let title = fallbackTitle || 'Untitled Document';
  let content = text;

  if (text.includes('TITLE:') && text.includes('CONTENT:')) {
    const titleMatch = text.match(/TITLE:\s*(.*?)(?:\n|$)/i);
    const contentMatch = text.match(/CONTENT:\s*([\s\S]*)$/i);
    
    if (titleMatch && titleMatch[1]) title = titleMatch[1].trim().replace(/^\[|\]$/g, '');
    if (contentMatch && contentMatch[1]) content = contentMatch[1].trim();
  }

  return { title, content };
}
