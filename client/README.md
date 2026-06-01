# NxtBuild - Client

Frontend application for NxtBuild, an AI-powered web application builder built with React, Vite, and Three.js.

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

1. **Clone the repository:**
```bash
cd client
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Fill in your configuration:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=NxtBuild
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
VITE_DEFAULT_THEME=dark
```

## Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
client/
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Root component
│   ├── index.css                # Global styles
│   ├── pages/                   # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── BuilderPage.jsx
│   ├── components/              # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── CodeEditor.jsx
│   │   ├── LivePreview.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── Scene3D.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── BackButton.jsx
│   ├── context/                 # Context API providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── services/                # API services
│   │   ├── api.js               # Axios instance
│   │   ├── authService.js
│   │   ├── projectService.js
│   │   └── generationService.js
│   ├── utils/                   # Utility functions
│   │   ├── logger.js            # Client logger
│   │   └── validators.js        # Form validators
│   ├── styles/                  # Global & component styles
│   │   ├── landing.css
│   │   ├── login.css
│   │   ├── navbar.css
│   │   ├── dashboard.css
│   │   ├── builder.css
│   │   ├── error-boundary.css
│   │   └── skeleton-loader.css
│   └── test/                    # Test setup
│       └── setup.js
├── index.html
├── vite.config.js
├── vitest.config.js
├── eslint.config.js
├── .prettierrc.json
├── .env.example
└── package.json
```

## Features

✅ Modern React with Hooks
✅ Vite for fast development
✅ Three.js 3D animations
✅ Framer Motion animations
✅ Firebase authentication
✅ State management with Context API
✅ Responsive design
✅ Dark/Light theme toggle
✅ Error boundaries
✅ Loading states with skeleton loaders
✅ Toast notifications
✅ Form validation
✅ Code editor integration
✅ Live preview
✅ PWA ready

## Pages

### Landing Page (`/`)
- Hero section with 3D animation
- Feature showcase
- Call-to-action buttons
- Stats section

### Login Page (`/login`)
- Sign up form
- Login form
- Email validation
- Password requirements
- Social auth ready

### Dashboard (`/dashboard`)
- Project list grid
- Create new project
- Delete projects
- Last updated timestamps
- Project cards with preview

### Builder (`/builder/:projectId`)
- Chat interface with AI
- Code editor
- Live preview
- Download code
- Project title editing
- Message history

## Components

### ErrorBoundary
Catches React component errors and displays fallback UI:
```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### SkeletonLoader
Displays loading placeholders:
```jsx
<SkeletonLoader width="100%" height="20px" />
<DashboardSkeleton />
<BuilderSkeleton />
```

### Toast Notifications
Show user feedback:
```jsx
const { showToast } = useContext(ToastContext);
showToast('Success!', 'success');
showToast('Error!', 'error');
```

### Theme Toggle
Switch between dark and light themes:
```jsx
const { theme, toggleTheme } = useContext(ThemeContext);
```

## Styling

Uses a custom warm/earthy color scheme:
- **Primary**: `#160F0C` - Deep brown
- **Accent**: `#CB7D3E` - Terracotta
- **Text**: `#EAD7A6` - Pale cream
- **Secondary**: `#DBB169` - Gold

CSS utilities:
- Glass panel effect
- Gradient animations
- Responsive grid layout
- Smooth transitions

## API Integration

API requests are made through services:

```javascript
// Authentication
import { register, emailLogin, logout } from './services/authService.js';

// Projects
import { 
  getProjects, 
  createProject, 
  getProject, 
  updateProject, 
  deleteProject 
} from './services/projectService.js';

// Code Generation
import { generateCode } from './services/generationService.js';
```

## Authentication

Uses JWT tokens stored in cookies:
- Automatic token refresh
- Protected routes
- User context available throughout app
- Automatic logout on token expiry

## Logging

Client-side logger for debugging:
```javascript
import { createClientLogger } from './utils/logger.js';

const logger = createClientLogger('MODULE_NAME');
logger.error('Error message', { data });
logger.info('Info message');
```

View logs in localStorage: `localStorage.getItem('app_logs')`

## Development

### Environment Variables

Create `.env.local` for local development overrides:
```env
VITE_API_URL=http://localhost:5000/api
VITE_DEFAULT_THEME=light
```

### Hot Module Replacement (HMR)

Vite provides instant updates during development:
```bash
npm run dev
```

### Code Quality

Format and lint before committing:
```bash
npm run lint
npm run format
```

## Testing

Run tests with Vitest:
```bash
npm run test
```

Test files: `src/**/*.test.jsx`

## Build

Create optimized production build:
```bash
npm run build
```

Output is in `dist/` directory.

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Performance

- Code splitting with React.lazy
- Image optimization
- CSS minification
- JavaScript minification
- Gzip compression
- Service worker support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Security

- XSS protection
- CSRF tokens
- Secure HTTP headers
- Input validation
- Sanitized output
- Secure cookie storage

## Troubleshooting

**CORS errors:**
- Check `VITE_API_URL` in .env
- Ensure server is running
- Verify CORS configuration on server

**Login not working:**
- Check Firebase credentials
- Verify JWT token format
- Check browser cookies

**Build errors:**
- Clear `node_modules` and reinstall
- Clear `.vite` cache
- Check Node.js version

## Contributing

1. Create feature branch
2. Make changes
3. Run `npm run lint` and `npm run format`
4. Run tests: `npm run test`
5. Submit pull request

## Support

For issues and questions:
- Check [API Documentation](../API_DOCUMENTATION.md)
- Review project issues
- Check Vite documentation
- React documentation

## License

ISC
