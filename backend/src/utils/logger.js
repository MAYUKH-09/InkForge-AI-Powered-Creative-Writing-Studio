/**
 * Structured Logger Utility
 * Wraps console with timestamps, levels, and colors.
 */

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function timestamp() {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

function format(level, color, icon, ...args) {
  const ts = `${COLORS.dim}${timestamp()}${COLORS.reset}`;
  const lvl = `${color}${icon} ${level}${COLORS.reset}`;
  console.log(`${ts} ${lvl}`, ...args);
}

const logger = {
  info: (...args) => format('INFO', COLORS.blue, 'ℹ', ...args),
  success: (...args) => format('OK', COLORS.green, '✓', ...args),
  warn: (...args) => format('WARN', COLORS.yellow, '⚠', ...args),
  error: (...args) => format('ERROR', COLORS.red, '✗', ...args),
  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      format('DEBUG', COLORS.magenta, '◆', ...args);
    }
  },
  request: (method, path, status, duration) => {
    const color = status >= 400 ? COLORS.red : status >= 300 ? COLORS.yellow : COLORS.green;
    const ts = `${COLORS.dim}${timestamp()}${COLORS.reset}`;
    console.log(
      `${ts} ${COLORS.cyan}→${COLORS.reset} ${method} ${path} ${color}${status}${COLORS.reset} ${COLORS.dim}${duration}ms${COLORS.reset}`
    );
  },
};

module.exports = logger;
