/**
 * Prompt Builder
 * Constructs optimized GPT prompts from structured user input.
 * Uses templates from templates.js for content type, style, and tone.
 */

const {
  CONTENT_TYPE_TEMPLATES,
  STYLE_DESCRIPTORS,
  TONE_DESCRIPTORS,
} = require('./templates');

/**
 * Build a generation prompt from user input parameters.
 * @param {Object} params - { idea, genre, tone, characters, keywords, style, contentType, wordLimit, targetAudience }
 * @returns {string} Complete prompt string
 */
function buildGenerationPrompt({ idea, genre, tone, characters, keywords, style, contentType, wordLimit, targetAudience }) {
  const type = contentType || 'story';
  const template = CONTENT_TYPE_TEMPLATES[type] || CONTENT_TYPE_TEMPLATES.story;
  const styleDesc = STYLE_DESCRIPTORS[style] || STYLE_DESCRIPTORS.formal;
  const toneDesc = TONE_DESCRIPTORS[tone] || '';

  const sections = [
    `You are a world-class creative writer and literary expert. Generate ${template.structure}.`,
    '',
    `**Core Idea:** ${idea}`,
    '',
  ];

  if (genre) sections.push(`**Genre:** ${genre}`);
  if (characters) sections.push(`**Characters:** ${characters}`);
  if (keywords) sections.push(`**Key Themes/Keywords:** ${keywords}`);
  if (wordLimit) {
    sections.push(
      `**EXACT WORD COUNT REQUIREMENT:** You MUST generate a response that is as close as possible to ${wordLimit} words.`,
      `- Do not go below ${Math.floor(wordLimit * 0.9)} words.`,
      `- Do not exceed ${Math.ceil(wordLimit * 1.1)} words.`,
      `- Use descriptive detail and pacing to meet this length naturally.`,
      `- If you are running short, expand on descriptions or internal monologues.`,
      `- If you are running long, condense the narrative or arguments without sacrificing quality.`,
      ''
    );
  }
  if (targetAudience) sections.push(`**Target Audience:** ${targetAudience}`);

  sections.push('', `**Writing Style:** ${styleDesc}`);

  if (toneDesc) sections.push(`**Tone:** ${toneDesc}`);

  sections.push(
    '',
    '**Quality Standards & Structural Constraints:**',
    `- Incorporate ${template.elements}`,
    '- Use strong, precise vocabulary — avoid clichés',
    '- Ensure clear structure with proper paragraphing',
    `- If word limit is set (${wordLimit || 'none'}), ensure the density of information matches the requested length.`,
    '- Create an engaging opening that hooks the reader',
    '- Deliver a satisfying, meaningful conclusion',
    '- Maintain consistent voice and tone throughout',
    '',
    `Generate the complete ${type}. Make it substantial, polished, and publication-ready.`,
    '',
    '**Output Format Requirements:**',
    'Your output MUST follow this structure exactly with the clear delimiters:',
    'TITLE: [A creative, catchy title based on the content]',
    'CONTENT: [The full body of the generated content]',
    '',
    `Do not include any meta-commentary — output only the title and the ${type} body as specified.`
  );

  return sections.join('\n');
}

/**
 * Build a refinement prompt for improving existing content.
 * @param {string} content - Original content
 * @param {string} instructions - Refinement instructions
 * @returns {string} Complete refinement prompt
 */
function buildRefinementPrompt(content, instructions) {
  return [
    'You are a world-class editor and writing coach. Refine the following content based on these instructions.',
    '',
    `**Instructions:** ${instructions}`,
    '',
    '**Original Content:**',
    content,
    '',
    '**Refinement Standards:**',
    '- Preserve the author\'s voice and intent',
    '- Improve clarity, flow, and readability',
    '- Strengthen vocabulary and eliminate weak phrasing',
    '- Fix any grammar or punctuation issues',
    '- Enhance the overall impact and engagement',
    '- Maintain structural integrity',
    '',
    'Output only the refined content — no commentary, notes, or explanations.',
  ].join('\n');
}

module.exports = { buildGenerationPrompt, buildRefinementPrompt };
