/**
 * Readability Analysis Utilities
 * Extracted single-responsibility module for text readability metrics.
 */

/**
 * Estimate syllable count for a word using English heuristics.
 * @param {string} word
 * @returns {number}
 */
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

/**
 * Calculate Flesch Reading Ease score.
 * @param {number} wordCount
 * @param {number} sentenceCount
 * @param {number} syllableCount
 * @returns {number} Score 0–100
 */
function calculateFleschScore(wordCount, sentenceCount, syllableCount) {
  if (sentenceCount === 0 || wordCount === 0) return 0;
  const raw = 206.835 - (1.015 * (wordCount / sentenceCount)) - (84.6 * (syllableCount / wordCount));
  return Math.max(0, Math.min(100, Math.round(raw)));
}

/**
 * Map a Flesch score to a human-readable reading level.
 * @param {number} score
 * @returns {string}
 */
function getReadingLevel(score) {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}

module.exports = { countSyllables, calculateFleschScore, getReadingLevel };
