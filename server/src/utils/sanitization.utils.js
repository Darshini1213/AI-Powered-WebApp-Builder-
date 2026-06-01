// Input Sanitization Utilities
import xss from 'xss';

// Sanitize user input to prevent XSS attacks
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return xss(input.trim(), {
      whiteList: {},
      stripIgnoredTag: true,
    });
  }
  return input;
};

// Sanitize HTML code output (more permissive for code generation)
export const sanitizeHtmlCode = (code) => {
  if (typeof code !== 'string') return '';
  
  // For HTML/CSS/JS code, allow more tags but still sanitize dangerous content
  const options = {
    whiteList: {
      'h1': [], 'h2': [], 'h3': [], 'h4': [], 'h5': [], 'h6': [],
      'p': [], 'br': [], 'hr': [],
      'div': ['class', 'id', 'style'],
      'span': ['class', 'id', 'style'],
      'a': ['href', 'target', 'title'],
      'img': ['src', 'alt', 'width', 'height', 'style'],
      'button': ['class', 'id', 'type'],
      'form': ['method', 'action', 'class'],
      'input': ['type', 'name', 'value', 'placeholder', 'class'],
      'textarea': ['name', 'class'],
      'select': ['name', 'class'],
      'option': ['value'],
      'ul': ['class'], 'ol': ['class'], 'li': ['class'],
      'table': ['class'], 'thead': [], 'tbody': [], 'tr': [],
      'th': ['class'], 'td': ['class'],
      'section': ['class', 'id'],
      'article': ['class', 'id'],
      'header': ['class', 'id'],
      'footer': ['class', 'id'],
      'nav': ['class', 'id'],
      'style': [],
    },
    stripIgnoredTag: false,
    stripComments: true,
    onTagAttr: (tag, name, value) => {
      // Prevent javascript: in attributes
      if (value && value.toLowerCase().includes('javascript:')) {
        return '';
      }
      return `${name}="${value}"`;
    },
  };

  return xss(code, options);
};

// Sanitize object properties
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

// Sanitize array of objects
export const sanitizeArray = (arr) => {
  if (!Array.isArray(arr)) return arr;
  return arr.map((item) => {
    if (typeof item === 'string') {
      return sanitizeInput(item);
    }
    if (typeof item === 'object') {
      return sanitizeObject(item);
    }
    return item;
  });
};

// Validate and sanitize email
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return '';
  const sanitized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : '';
};

// Validate and sanitize URL
export const sanitizeUrl = (url) => {
  if (typeof url !== 'string') return '';
  try {
    const sanitized = url.trim();
    new URL(sanitized);
    return sanitized;
  } catch {
    return '';
  }
};

export default {
  sanitizeInput,
  sanitizeHtmlCode,
  sanitizeObject,
  sanitizeArray,
  sanitizeEmail,
  sanitizeUrl,
};
