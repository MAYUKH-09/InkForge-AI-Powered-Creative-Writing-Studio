/**
 * Request Validation Middleware
 * Schema-based validation for request bodies.
 * Returns 400 with structured errors if validation fails.
 */

// ─── Validation Schemas ─────────────────────────────────────────────────────

const schemas = {
  generateContent: {
    required: ['idea'],
    fields: {
      idea: { type: 'string', minLength: 1, maxLength: 5000 },
      contentType: { type: 'string', enum: ['story', 'essay', 'poem', 'script', 'article'] },
      genre: { type: 'string', maxLength: 100 },
      tone: { type: 'string', enum: ['professional', 'friendly', 'dramatic', 'mysterious', 'inspirational', 'dark', 'whimsical', 'reflective'] },
      style: { type: 'string', enum: ['formal', 'casual', 'fantasy', 'academic', 'journalistic', 'poetic', 'technical', 'humorous'] },
      characters: { type: 'string', maxLength: 500 },
      keywords: { type: 'string', maxLength: 500 },
    },
  },

  refineContent: {
    required: ['content', 'instructions'],
    fields: {
      content: { type: 'string', minLength: 1, maxLength: 50000 },
      instructions: { type: 'string', minLength: 1, maxLength: 2000 },
    },
  },

  exportContent: {
    required: ['content', 'format'],
    fields: {
      content: { type: 'string', minLength: 1 },
      format: { type: 'string', enum: ['pdf', 'docx', 'txt'] },
      title: { type: 'string', maxLength: 200 },
    },
  },
};

// ─── Validator ──────────────────────────────────────────────────────────────

function validateField(name, value, rules) {
  if (rules.type && typeof value !== rules.type) {
    return `${name} must be a ${rules.type}`;
  }
  if (rules.minLength && (typeof value === 'string') && value.trim().length < rules.minLength) {
    return `${name} must not be empty`;
  }
  if (rules.maxLength && (typeof value === 'string') && value.length > rules.maxLength) {
    return `${name} must be ${rules.maxLength} characters or fewer`;
  }
  if (rules.enum && !rules.enum.includes(value)) {
    return `${name} must be one of: ${rules.enum.join(', ')}`;
  }
  return null;
}

/**
 * Create validation middleware for a given schema name.
 * @param {string} schemaName - Key in the schemas object
 * @returns {Function} Express middleware
 */
function validateRequest(schemaName) {
  const schema = schemas[schemaName];
  if (!schema) {
    throw new Error(`Unknown validation schema: ${schemaName}`);
  }

  return (req, res, next) => {
    const errors = [];
    const body = req.body || {};

    // Check required fields
    for (const field of schema.required) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        errors.push(`${field} is required`);
      }
    }

    // Validate present fields
    for (const [field, rules] of Object.entries(schema.fields)) {
      if (body[field] !== undefined && body[field] !== null && body[field] !== '') {
        const error = validateField(field, body[field], rules);
        if (error) errors.push(error);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: errors[0], // Primary error for display
        errors,              // All errors for debugging
        code: 'VALIDATION_ERROR',
      });
    }

    next();
  };
}

module.exports = validateRequest;
