/**
 * Content Analyzer
 * Analyzes text content and returns comprehensive metrics.
 * Uses readability module for Flesch score calculations.
 */

const { countSyllables, calculateFleschScore, getReadingLevel } = require('./readability');

/**
 * Analyze content and return comprehensive metrics.
 * @param {string} content - Raw content (may include markdown)
 * @returns {Object} Analysis results
 */
function analyzeContent(content) {
  // Strip markdown formatting for analysis
  const text = content.replace(/[#*_\-~`>]/g, '').trim();

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

  const wordCount = words.length;
  const sentenceCount = sentences.length;

  // Average sentence length
  const avgSentenceLength = sentenceCount > 0
    ? Math.round(wordCount / sentenceCount)
    : 0;

  // Syllable count for readability
  const syllableCount = words.reduce((total, word) => total + countSyllables(word), 0);

  // Flesch Reading Ease
  const readabilityScore = calculateFleschScore(wordCount, sentenceCount, syllableCount);
  const readingLevel = getReadingLevel(readabilityScore);

  // Reading time (200 WPM average)
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  // Vocabulary richness (unique / total)
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, '')));
  const vocabularyRichness = wordCount > 0
    ? Math.round((uniqueWords.size / wordCount) * 100)
    : 0;

  return {
    wordCount,
    characterCount: text.length,
    sentenceCount,
    paragraphCount: paragraphs.length,
    avgSentenceLength,
    readabilityScore,
    readingLevel,
    readingTimeMinutes,
    vocabularyRichness,
  };
}

module.exports = { analyzeContent };
