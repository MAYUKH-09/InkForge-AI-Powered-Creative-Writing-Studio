/**
 * Export Controller
 * Orchestrates document export — delegates to exportService.
 */

const { generatePDF, generateDOCX, generateTXT, sanitizeFilename } = require('../services/exportService');
const logger = require('../utils/logger');

/**
 * Handle export request — generates file and streams response.
 */
async function exportContent(req, res, next) {
  try {
    const { content, format, title } = req.body;
    const fileName = sanitizeFilename(title);

    logger.info(`[${req.id}] Exporting as ${format.toUpperCase()} | Title: "${title || 'Untitled'}"`);

    switch (format) {
      case 'pdf': {
        const buffer = await generatePDF(content, title);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}.pdf"`);
        res.send(buffer);
        break;
      }

      case 'docx': {
        const buffer = await generateDOCX(content, title);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}.docx"`);
        res.send(buffer);
        break;
      }

      case 'txt':
      default: {
        const text = generateTXT(content, title);
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}.txt"`);
        res.send(text);
        break;
      }
    }

    logger.success(`[${req.id}] Exported ${format.toUpperCase()} successfully`);
  } catch (error) {
    next(error);
  }
}

module.exports = { exportContent };
