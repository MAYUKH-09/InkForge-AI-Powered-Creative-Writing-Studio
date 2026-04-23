/**
 * Content Controller
 * Orchestrates content generation and refinement.
 * No HTTP concerns — receives validated input, returns data.
 */

const ai = require('../../../ai');
const logger = require('../utils/logger');

/**
 * Handle content generation request.
 */
async function generateContent(req, res, next) {
  try {
    const { idea, genre, tone, characters, keywords, style, contentType, wordLimit, targetAudience } = req.body;

    logger.info(
      `[${req.id}] Generating ${contentType || 'story'}`,
      `| Style: ${style || 'formal'} | Tone: ${tone || 'professional'} | Limit: ${wordLimit || 'none'}`
    );

    const result = await ai.generate({
      idea: idea.trim(),
      genre,
      tone,
      characters,
      keywords,
      style,
      contentType,
      wordLimit,
      targetAudience,
    });

    logger.success(
      `[${req.id}] Generated ${result.analysis.wordCount} words`,
      `via ${result.metadata.provider}`,
      result.fromCache ? '(cached)' : ''
    );
    
    res.json({
      success: true,
      title: result.title || idea.substring(0, 50),
      content: result.content,
      metadata: result.metadata,
      analysis: result.analysis,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle content refinement request.
 */
async function refineContent(req, res, next) {
  try {
    const { content, instructions } = req.body;

    logger.info(`[${req.id}] Refining content | Instructions: ${instructions.substring(0, 60)}...`);

    const result = await ai.refine(content.trim(), instructions.trim());

    logger.success(`[${req.id}] Refined to ${result.analysis.wordCount} words via ${result.metadata.provider}`);

    res.json({
      success: true,
      content: result.content,
      metadata: result.metadata,
      analysis: result.analysis,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { generateContent, refineContent };
