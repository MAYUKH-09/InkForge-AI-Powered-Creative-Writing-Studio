/**
 * AI Gateway — Tier 3 Public API
 * 
 * Single entry point for all AI operations.
 * Manages provider selection, prompt building, content analysis,
 * and request-level caching.
 * 
 * Usage:
 *   const ai = require('../ai');
 *   const result = await ai.generate({ idea: '...', contentType: 'story', ... });
 *   const analysis = ai.analyze(content);
 */

const { buildGenerationPrompt, buildRefinementPrompt } = require('./prompts/promptBuilder');
const { SYSTEM_PROMPTS } = require('./prompts/templates');
const { analyzeContent } = require('./optimization/contentAnalyzer');
const GeminiProvider = require('./providers/geminiProvider');
const DemoProvider = require('./providers/demoProvider');

// ─── Provider Management ────────────────────────────────────────────────────

let _provider = null;
let _providerResolved = false;

/**
 * Resolve the active AI provider based on configuration.
 * Gemini is preferred when a valid API key is available.
 * Falls back to the built-in demo engine otherwise.
 * @returns {BaseProvider}
 */
function getProvider() {
  if (!_providerResolved) {
    const gemini = new GeminiProvider();
    if (gemini.isAvailable()) {
      _provider = gemini;
    } else {
      _provider = new DemoProvider();
    }
    _providerResolved = true;
  }
  return _provider;
}

/**
 * Get information about the current AI provider.
 * @returns {{ name: string, mode: string, model: string }}
 */
function getProviderInfo() {
  return getProvider().getInfo();
}

// ─── Simple Request Cache ───────────────────────────────────────────────────

const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_MAX_SIZE = 50;

function getCacheKey(params) {
  return JSON.stringify(params);
}

function getCached(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    _cache.delete(key);
    return null;
  }
  return entry.value;
}

function setCache(key, value) {
  // Evict oldest if at capacity
  if (_cache.size >= CACHE_MAX_SIZE) {
    const oldestKey = _cache.keys().next().value;
    _cache.delete(oldestKey);
  }
  _cache.set(key, { value, timestamp: Date.now() });
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Generate creative content from structured user input.
 * @param {Object} params - { idea, genre, tone, characters, keywords, style, contentType }
 * @returns {Promise<{ content: string, metadata: Object, analysis: Object }>}
 */
async function generate(params) {
  // Check cache
  const cacheKey = getCacheKey({ op: 'generate', ...params });
  const cached = getCached(cacheKey);
  if (cached) return { ...cached, fromCache: true };

  const provider = getProvider();
  const prompt = buildGenerationPrompt(params);

  let result;

  if (provider instanceof DemoProvider) {
    // Demo provider needs the original params, not the prompt
    result = await provider.generate(
      SYSTEM_PROMPTS.generation,
      prompt,
      { inputParams: params }
    );
  } else {
    // Determine maxTokens based on user word limit request to generate faster results
    const requestedWords = params.wordLimit ? parseInt(params.wordLimit, 10) : 500;
    // ~2.5 tokens per word + 500 buffer to prevent hard cutoffs
    const maxTokens = Math.min(Math.ceil(requestedWords * 2.5) + 500, 8000);

    result = await provider.generate(
      SYSTEM_PROMPTS.generation,
      prompt,
      { temperature: 0.7, maxTokens }
    );
  }

  // Parse Title and Content from result
  let content = result.content;
  let title = params.idea || 'Untitled Document';

  if (content.includes('TITLE:') && content.includes('CONTENT:')) {
    const titleMatch = content.match(/TITLE:\s*(.*?)(?:\n|$|\n\n)/i);
    const contentMatch = content.match(/CONTENT:\s*([\s\S]*)$/i);
    
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim().replace(/^\[|\]$/g, '');
    }
    if (contentMatch && contentMatch[1]) {
      content = contentMatch[1].trim();
    }
  } else if (content.startsWith('# ')) {
    // Fallback for simple markdown titles
    const lines = content.split('\n');
    title = lines[0].replace('# ', '').trim();
    content = lines.slice(1).join('\n').trim();
  }

  const analysis = analyzeContent(content);
  const info = provider.getInfo();

  const response = {
    title,
    content,
    metadata: {
      model: result.model,
      mode: info.mode,
      tokens: result.tokens,
      provider: info.name,
    },
    analysis,
  };

  // Cache the result
  setCache(cacheKey, response);

  return response;
}

/**
 * Refine existing content with instructions.
 * @param {string} content - Original content
 * @param {string} instructions - Refinement instructions
 * @returns {Promise<{ content: string, metadata: Object, analysis: Object }>}
 */
async function refine(content, instructions) {
  const provider = getProvider();

  let result;

  if (provider instanceof DemoProvider) {
    result = await provider.refine(content, instructions);
  } else {
    const prompt = buildRefinementPrompt(content, instructions);
    // Estimate tokens needed based on input word count to process faster
    const wordCount = content.split(/\s+/).length;
    // Massive buffer for expansion during refinement
    const maxTokens = Math.min(Math.ceil(wordCount * 2.5) + 600, 8000);

    result = await provider.generate(
      SYSTEM_PROMPTS.refinement,
      prompt,
      { temperature: 0.6, maxTokens }
    );
  }

  const analysis = analyzeContent(result.content);
  const info = provider.getInfo();

  return {
    content: result.content,
    metadata: {
      model: result.model,
      mode: info.mode,
      tokens: result.tokens || 0,
      provider: info.name,
    },
    analysis,
  };
}

/**
 * Analyze content without generating or refining.
 * @param {string} content
 * @returns {Object} Analysis metrics
 */
function analyze(content) {
  return analyzeContent(content);
}

module.exports = {
  generate,
  refine,
  analyze,
  getProviderInfo,
};
