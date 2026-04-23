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
    sections.push(`**Word Limit Constraint:** EXACTLY ${wordLimit} words. IMPORTANT: You must write a complete response that strictly satisfies this word limit. Adjust your pacing to conclude naturally shortly before reaching this limit.`);
  }
  if (targetAudience) sections.push(`**Target Audience:** ${targetAudience}`);

  sections.push('', `**Writing Style:** ${styleDesc}`);

  if (toneDesc) sections.push(`**Tone:** ${toneDesc}`);

  sections.push(
    '',
    '**Quality Standards:**',
    `- Incorporate ${template.elements}`,
    '- Use strong, precise vocabulary — avoid clichés',
    '- Ensure clear structure with proper paragraphing',
    '- Create an engaging opening that hooks the reader',
    '- Deliver a satisfying, meaningful conclusion',
    '- Maintain consistent voice and tone throughout',
    '',
    `Generate the complete ${type}. Make it substantial, polished, and publication-ready. Do not include any meta-commentary — output only the ${type} itself.`
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
