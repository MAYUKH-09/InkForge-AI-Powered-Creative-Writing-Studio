/**
 * AI Prompt Templates — Pure Data Constants
 * Extracted from promptBuilder for single-responsibility.
 * Each template defines structure and elements for a content type.
 */

const CONTENT_TYPE_TEMPLATES = {
  story: {
    label: 'Story',
    structure: 'a compelling narrative with a clear beginning, rising action, climax, falling action, and resolution',
    elements: 'vivid descriptions, engaging dialogue, character development, and atmospheric world-building',
  },
  essay: {
    label: 'Essay',
    structure: 'a well-organized essay with a thesis statement, supporting arguments with evidence, and a strong conclusion',
    elements: 'logical reasoning, smooth transitions, persuasive language, and intellectual depth',
  },
  poem: {
    label: 'Poem',
    structure: 'a beautifully crafted poem with intentional rhythm, imagery, and emotional resonance',
    elements: 'metaphors, similes, sensory language, line breaks, and evocative word choices',
  },
  script: {
    label: 'Script',
    structure: 'a properly formatted script with scene headings, action lines, character names, and dialogue',
    elements: 'natural dialogue, visual storytelling, stage/screen directions, and dramatic tension',
  },
  article: {
    label: 'Article',
    structure: 'a well-researched article with a compelling headline, engaging introduction, informative body, and conclusion',
    elements: 'clear explanations, relevant examples, authoritative tone, and reader engagement',
  },
};

const STYLE_DESCRIPTORS = {
  formal: 'Use formal, sophisticated language with complex sentence structures and academic vocabulary.',
  casual: 'Use conversational, relaxed language that feels natural and approachable.',
  fantasy: 'Use rich, imaginative language with world-building elements, magical descriptions, and epic scope.',
  academic: 'Use scholarly, precise language with citations-style references and analytical depth.',
  journalistic: 'Use clear, factual, news-style language with the inverted pyramid structure.',
  poetic: 'Use lyrical, rhythmic language with rich imagery, metaphors, and emotional depth.',
  technical: 'Use precise, technical language with clear definitions and structured explanations.',
  humorous: 'Use witty, entertaining language with clever wordplay, timing, and comedic observations.',
};

const TONE_DESCRIPTORS = {
  professional: 'Maintain a polished, authoritative, and credible tone throughout.',
  friendly: 'Keep a warm, encouraging, and welcoming tone that connects with the reader.',
  dramatic: 'Build tension and emotion with a theatrical, intense tone.',
  mysterious: 'Create intrigue and suspense with an enigmatic, atmospheric tone.',
  inspirational: 'Uplift and motivate with an empowering, positive tone.',
  dark: 'Employ a brooding, somber tone with gothic or noir undertones.',
  whimsical: 'Use a playful, lighthearted, imaginative tone full of wonder.',
  reflective: 'Adopt a thoughtful, contemplative tone that invites introspection.',
};

const SYSTEM_PROMPTS = {
  generation: 'You are a world-class creative writer producing publication-ready content.',
  refinement: 'You are a world-class editor refining creative content to perfection.',
};

module.exports = {
  CONTENT_TYPE_TEMPLATES,
  STYLE_DESCRIPTORS,
  TONE_DESCRIPTORS,
  SYSTEM_PROMPTS,
};
