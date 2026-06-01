# Development Guide - NxtBuild

Complete guide for setting up and developing NxtBuild.

## Quick Start

### 1. Clone & Install

```bash
# Clone repository
git clone <repo-url>
cd ai_powered_web_app_builder

# Setup server
cd server
cp .env.example .env
npm install

# Setup client (in new terminal)
cd ../client
cp .env.example .env
npm install
```

### 2. Configure Environment

**Server (.env):**
```env
PORT=5000
NODE_ENV=development
FIREBASE_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=dev_secret
CORS_ORIGIN=http://localhost:5173
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=NxtBuild
VITE_ENABLE_ERROR_TRACKING=true
```

### 3. Start Development

**Terminal 1 - Server:**
```bash
cd server
npm run dev
# Server running at http://localhost:5000
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
# App running at http://localhost:5173
```

## Architecture

### Frontend (React + Vite)

```
Landing Page → Login → Dashboard → Builder
                ↓
            Protected Routes
```

**Key Features:**
- React Context for state management
- Framer Motion for animations
- Three.js for 3D effects
- Vite for fast HMR development
- Error boundaries for error handling
- Skeleton loaders for loading states

### Backend (Express.js)

```
Request → Middleware (Auth, Validation) → Controller → Service → Response
           ↓
        Logging, Error Handling
```

**Key Features:**
- JWT authentication
- Input validation (express-validator)
- Input sanitization (XSS prevention)
- Rate limiting
- Error logging
- Firebase integration
- Gemini API integration

## Development Workflow

### 1. Creating a New Feature

#### Example: New API Endpoint

**Step 1: Define Route** (`server/src/routes/new.routes.js`)
```javascript
import { Router } from 'express';
import { handler } from '../controllers/new.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import { validateInput, handleValidationErrors } from '../utils/validation.utils.js';

const router = Router();
router.use(authenticate);
router.post('/', validateInput, handleValidationErrors, handler);
export default router;
```

**Step 2: Create Controller** (`server/src/controllers/new.controller.js`)
```javascript
import { sanitizeInput } from '../utils/sanitization.utils.js';
import * as service from '../services/new.service.js';

export const handler = async (req, res, next) => {
  try {
    const input = sanitizeInput(req.body.input);
    const result = await service.process(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
```

**Step 3: Create Service** (`server/src/services/new.service.js`)
```javascript
export const process = async (input) => {
  // Business logic
  return result;
};
```

**Step 4: Add Tests** (`server/src/controllers/new.controller.test.js`)
```javascript
import { describe, it, expect } from 'vitest';

describe('New Controller', () => {
  it('should handle request', () => {
    // Test code
  });
});
```

### 2. Creating a React Component

#### Example: New Page

**Step 1: Create Component** (`client/src/pages/NewPage.jsx`)
```javascript
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { createClientLogger } from '../utils/logger.js';
import '../styles/new-page.css';

const logger = createClientLogger('NewPage');

function NewPage() {
  const [state, setState] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="new-page"
    >
      {/* Component content */}
    </motion.div>
  );
}

export default NewPage;
```

**Step 2: Add Route** (`client/src/App.jsx`)
```javascript
import NewPage from './pages/NewPage.jsx';

// In Routes component
<Route path="/new-page" element={<NewPage />} />
```

**Step 3: Add Styling** (`client/src/styles/new-page.css`)
```css
.new-page {
  /* Your styles */
}
```

### 3. Code Quality

Before committing, run:

```bash
# Format code
npm run format

# Lint
npm run lint

# Fix linting issues
npm run lint -- --fix

# Run tests
npm run test
```

### 4. Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, test, format, lint
npm run format && npm run lint && npm run test

# Commit
git commit -m "feat: add new feature"

# Push
git push origin feature/new-feature

# Create Pull Request
```

## Testing

### Unit Tests (Services, Utils)

```bash
# Run all tests
npm run test

# Run specific file
npm run test -- src/utils/validation.utils.test.js

# Watch mode
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

### Example Test

```javascript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myFunction.js';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });

  it('should handle errors', () => {
    expect(() => myFunction(badInput)).toThrow();
  });
});
```

## Debugging

### Frontend

1. **Browser DevTools:**
   - Open Chrome DevTools (F12)
   - Sources tab for breakpoints
   - Console for logs

2. **React DevTools:**
   - Install React DevTools extension
   - Inspect component state and props

3. **Logging:**
```javascript
import { createClientLogger } from './utils/logger.js';
const logger = createClientLogger('MyComponent');
logger.error('Error message', { data });
```

### Backend

1. **Server Logs:**
   - Check `logs/app-YYYY-MM-DD.log`
   - Watch console for real-time logs

2. **Debug Mode:**
```bash
# With Node debugger
node --inspect server.js
# Open chrome://inspect
```

3. **Logging:**
```javascript
import { createLogger } from './utils/logger.js';
const logger = createLogger('MODULE');
logger.error('Error', { details });
```

## Performance Tips

### Frontend

- Use React.lazy for code splitting
- Memoize expensive computations
- Avoid inline functions in JSX
- Use key prop correctly in lists
- Optimize images
- Cache API responses

### Backend

- Use database indexing
- Implement response caching
- Compress responses
- Optimize queries
- Use async/await properly

## Security Checklist

- [ ] Input validation on all endpoints
- [ ] Input sanitization for XSS prevention
- [ ] JWT tokens in secure cookies
- [ ] HTTPS in production
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Security headers (Helmet)
- [ ] Database query parameterization
- [ ] Environment variables not exposed
- [ ] Regular dependency updates

## Deployment

### Preparing for Production

1. **Build frontend:**
```bash
cd client
npm run build
```

2. **Test build:**
```bash
npm run preview
```

3. **Update environment variables:**
```bash
# Set production values
NODE_ENV=production
JWT_SECRET=strong_production_secret
```

4. **Deploy:**
   - Frontend: Vercel, Netlify
   - Backend: Heroku, AWS, DigitalOcean

## Common Issues & Solutions

### Issue: Port already in use
**Solution:**
```bash
# Change PORT in .env
# Or kill the process:
lsof -i :5000
kill -9 <PID>
```

### Issue: CORS errors
**Solution:**
- Check `CORS_ORIGIN` in server `.env`
- Verify client `VITE_API_URL`
- Ensure server is running

### Issue: Build fails
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Firebase auth not working
**Solution:**
- Check Firebase credentials in `.env`
- Verify Firebase project is active
- Check redirect URLs in Firebase console

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Guide](https://expressjs.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Gemini API Docs](https://ai.google.dev)
- [Three.js Documentation](https://threejs.org)

## Support

For questions and issues:
1. Check existing documentation
2. Review project issues on GitHub
3. Ask in team chat/discussions
4. Submit detailed bug reports

---

**Happy Coding! 🚀**
