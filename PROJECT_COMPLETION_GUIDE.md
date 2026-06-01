# NxtBuild - AI Powered Web App Builder

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)

NxtBuild is a full-stack AI-powered web application builder that uses Google's Gemini API to generate professional HTML/CSS/JavaScript code based on natural language descriptions. It features a beautiful warm/earthy color theme with modern UI components, real-time code generation, and a professional development experience.

## 🌟 Features

### Core Features
- ✅ **AI-Powered Code Generation** - Generate HTML/CSS/JS from natural language prompts
- ✅ **Real-time Live Preview** - See generated code instantly
- ✅ **Project Management** - Create, edit, delete, and organize projects
- ✅ **Chat Interface** - Interactive conversation with AI for refinements
- ✅ **Code Download** - Export generated code as HTML files
- ✅ **User Authentication** - Secure Firebase authentication with JWT

### UI/UX Features
- ✅ **Modern Design** - Glassmorphism effects, smooth animations
- ✅ **3D Animations** - Three.js powered 3D background effects
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Responsive Layout** - Works on desktop, tablet, and mobile
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Skeleton Loaders** - Professional loading states
- ✅ **Toast Notifications** - User feedback system

### Code Quality Features
- ✅ **Input Validation** - Comprehensive validation on all inputs
- ✅ **Input Sanitization** - XSS protection
- ✅ **Rate Limiting** - Prevent API abuse
- ✅ **Security Headers** - Helmet.js protection
- ✅ **Request Logging** - Complete request/response logging
- ✅ **Error Tracking** - Comprehensive error handling
- ✅ **ESLint & Prettier** - Code quality and formatting
- ✅ **Testing Setup** - Vitest configuration
- ✅ **API Documentation** - Complete API docs

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Setup Guide](#setup-guide)
- [Environment Configuration](#environment-configuration)
- [Running the App](#running-the-app)
- [Documentation](#documentation)
- [Security](#security)
- [Performance](#performance)
- [Improvements](#improvements)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd ai_powered_web_app_builder

# Setup server
cd server && cp .env.example .env && npm install
# Configure .env with your Firebase & Gemini keys

# Setup client (new terminal)
cd client && cp .env.example .env && npm install

# Start development
# Terminal 1: npm run dev (in server directory)
# Terminal 2: npm run dev (in client directory)

# Open http://localhost:5173
```

## 🏗️ Architecture

### Frontend (React + Vite)
```
┌─────────────────────────────────────────┐
│         Landing Page                    │
│  (3D Animation, Features, CTA)          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────┐
│    Login / Register      │
│  (Firebase Auth)         │
└──────────────┬───────────┘
               │ (JWT Token)
               ▼
┌──────────────────────────────────────────────┐
│         Dashboard (Protected)                │
│  ├─ Project Grid                             │
│  ├─ Create New Project                       │
│  └─ Project Management                       │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌───────────────────────────────────────────────┐
│    Builder Page (Protected)                   │
│  ├─ Chat Interface (AI Prompts)               │
│  ├─ Code Editor (Monaco/Monaco-like)          │
│  ├─ Live Preview (iframe)                     │
│  ├─ Download Code                             │
│  └─ Project Title Editor                      │
└───────────────────────────────────────────────┘
```

### Backend (Express.js + Firebase)
```
┌─────────────────────────────────────────────┐
│         HTTP Request                        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
        ┌─────────────────┐
        │ CORS / Security │
        │ (Helmet, Rate   │
        │  Limiting)      │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Authentication  │
        │ (JWT Validation)│
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Validation &    │
        │ Sanitization    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   Controller    │
        │   (Business     │
        │    Logic)       │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
 Firebase    Gemini API    Database
 (Auth,      (Code Gen)    (Projects)
  Storage)
```

## 📁 Project Structure
- **Primary Brown**: `#160F0C` - Deep warm brown background
- **Secondary Brown**: `#1F1511` - Lighter brown
- **Tertiary Brown**: `#2C1D18` - Medium brown
- **Accent (Terracotta)**: `#CB7D3E` - Primary accent color
- **Accent (Ochre/Gold)**: `#DBB169` - Secondary accent
- **Accent (Rust Brown)**: `#9B593C` - Tertiary accent
- **Text Primary**: `#EAD7A6` - Pale cream text
- **Text Secondary**: `#DBB169` - Golden ochre
- **Text Muted**: `#9A9A5D` - Olive muted text

## Project Structure

### Frontend (React + Vite)
```
client/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx      ✓ Complete - 3D animated hero, features section
│   │   ├── LoginPage.jsx         ✓ Complete - Sign up/Login with glowing background
│   │   ├── DashboardPage.jsx     ✓ Complete - Project management grid
│   │   └── BuilderPage.jsx       ✓ Complete - AI code generation with preview
│   ├── components/
│   │   ├── Navbar.jsx            ✓ Complete
│   │   ├── ChatInput.jsx         ✓ Complete
│   │   ├── ChatMessage.jsx       ✓ Complete
│   │   ├── CodeEditor.jsx        ✓ Complete
│   │   ├── LivePreview.jsx       ✓ Complete - Shows live HTML preview
│   │   ├── ProjectCard.jsx       ✓ Complete - 3D tilt effect
│   │   ├── FeatureCard.jsx       ✓ Complete
│   │   ├── Scene3D.jsx           ✓ Complete - Three.js 3D background
│   │   └── ProtectedRoute.jsx    ✓ Complete
│   ├── context/
│   │   ├── AuthContext.jsx       ✓ Complete
│   │   └── ToastContext.jsx      ✓ Complete
│   ├── services/
│   │   ├── api.js                ✓ Complete
│   │   ├── authService.js        ✓ Complete
│   │   ├── generationService.js  ✓ Complete
│   │   └── projectService.js     ✓ Complete
│   ├── styles/
│   │   ├── index.css             ✓ Complete - Global styles
│   │   ├── landing.css           ✓ Complete - 3D features, stats
│   │   ├── login.css             ✓ Complete - Background glows
│   │   ├── navbar.css            ✓ Complete
│   │   ├── dashboard.css         ✓ Complete - Grid layout
│   │   └── builder.css           ✓ Complete - Preview, typing animations
│   └── main.jsx                  ✓ Complete
└── index.html                    ✓ Complete
```

### Backend (Node.js + Firebase)
```
server/
├── src/
│   ├── app.js                    ✓ Complete - Express setup
│   ├── config/
│   │   ├── firebase.config.js    ✓ Complete
│   │   └── gemini.config.js      ✓ Complete
│   ├── routes/
│   │   ├── auth.routes.js        ✓ Complete
│   │   ├── generation.routes.js  ✓ Complete
│   │   ├── project.routes.js     ✓ Complete
│   │   └── index.js              ✓ Complete
│   ├── controllers/
│   │   ├── auth.controller.js    ✓ Complete
│   │   ├── generation.controller.js ✓ Complete
│   │   └── project.controller.js ✓ Complete
│   ├── services/
│   │   ├── auth.service.js       ✓ Complete
│   │   ├── gemini.service.js     ✓ Complete
│   │   ├── generation.service.js ✓ Complete
│   │   └── project.service.js    ✓ Complete
│   ├── middleware/
│   │   ├── auth.middleware.js    ✓ Complete
│   │   └── error.middleware.js   ✓ Complete
│   ├── utils/
│   │   ├── jwt.utils.js          ✓ Complete
│   │   └── code.utils.js         ✓ Complete
│   └── constants/
│       └── prompts.js            ✓ Complete
└── server.js                     ✓ Complete
```

## Completed Features

### ✓ Authentication
- User registration with email/password
- Secure login with JWT tokens
- Protected routes for authenticated users
- User profile management
- Logout functionality

### ✓ Project Management
- Create new projects
- View all projects in dashboard
- Display project previews with live iframes
- Delete projects with confirmation
- Edit project titles
- Track project updates

### ✓ AI Code Generation
- Describe app in natural language
- Real-time code generation using Gemini API
- Live preview of generated HTML/CSS/JS
- Chat history for each project
- Download generated code as HTML files
- Code refinement through follow-up prompts

### ✓ User Interface
- Modern glassmorphism design
- Responsive layout (desktop/tablet/mobile)
- 3D animated elements (Three.js)
- Smooth animations and transitions (Framer Motion)
- Dark theme with warm accent colors
- Toast notifications for user feedback
- Loading states with spinner animations

### ✓ Styling Enhancements
- Complete CSS for all pages
- Responsive media queries
- Animated backgrounds (floating glows)
- Typing indicator animations
- Hover effects and transitions
- Glass panel effects with blur
- Gradient overlays

## CSS Features Implemented

### Global Styles (index.css)
- CSS variables for consistent theming
- Custom scrollbar styling
- Toast notifications system
- Loading spinner with animation
- Glassmorphism utility classes
- Global animations (spin, pulse, slideInRight)

### Landing Page (landing.css)
- 3D scene background integration
- Hero section with animated text
- Stats section with dividers
- Feature cards grid (3 columns responsive)
- Footer with company branding
- Responsive breakpoints for 1024px and 768px

### Login Page (login.css)
- Background glow animations
- Card-based form layout
- Input field styling with icons
- Submit button with shimmer effect
- Sign up/Login toggle animation
- Responsive mobile design

### Dashboard (dashboard.css)
- Project grid layout with auto-fill
- Project card with preview iframes
- Empty state with icon
- Hover effects on cards
- Action buttons (Open, Delete)
- Time display for last updates

### Builder (builder.css)
- Split layout (chat + preview)
- Chat message styling
- Typing indicator animations
- Code editor theme (VS Code dark)
- Live preview container
- Tab switching interface
- Responsive mobile layout

### Navbar (navbar.css)
- Sticky positioned navigation
- User badge with avatar initial
- Logout button styling
- Active link indication
- Mobile-responsive hiding

## Missing CSS Classes - FIXED
- `preview-empty` ✓ Added
- `preview-empty-icon` ✓ Added
- `preview-empty-title` ✓ Added
- `preview-empty-subtitle` ✓ Added
- `preview-iframe` ✓ Added
- `bg-glow`, `bg-glow-1`, `bg-glow-2` ✓ Added
- Typing dot animations ✓ Added

## How to Run

### Setup Environment
```bash
# Install dependencies for both client and server
cd client && npm install
cd ../server && npm install
```

### Configure Environment Variables
Create `.env` files in both `client/` and `server/` directories with required keys:

**Server .env:**
```
PORT=5000
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_id
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Client .env:**
```
VITE_API_URL=http://localhost:5000/api
```

### Start Development Servers
```bash
# Terminal 1: Start backend
cd server && npm start

# Terminal 2: Start frontend
cd client && npm run dev
```

## Technologies Used
- **Frontend**: React 18, Vite, Framer Motion, Three.js, TailwindCSS concepts
- **Backend**: Node.js, Express, Firebase, Google Gemini API
- **UI Libraries**: Lucide React icons, react-parallax-tilt
- **Styling**: Custom CSS with CSS variables, Glassmorphism effects
- **Authentication**: JWT tokens with Firebase

## Key Features Highlights

### 1. **AI-Powered Code Generation**
   - Natural language to HTML/CSS/JavaScript conversion
   - Multi-turn conversation for refinement
   - Version history tracking

### 2. **Real-time Preview**
   - Live iframe preview of generated code
   - Interactive code editor
   - Download as HTML file

### 3. **Beautiful UI/UX**
   - 3D animated backgrounds
   - Smooth transitions and animations
   - Modern dark theme with warm accents
   - Responsive design

### 4. **Project Management**
   - Create, view, edit, delete projects
   - Persistent storage with Firebase
   - Project history and updates

### 5. **Authentication**
   - Secure user registration
   - JWT-based session management
   - Protected routes

## Verification Checklist
- ✓ All CSS files have proper styling
- ✓ All React components are complete
- ✓ Backend endpoints are configured
- ✓ Authentication flow is implemented
- ✓ Code generation service is working
- ✓ Database integration with Firebase
- ✓ Error handling and validation
- ✓ Loading states and animations
- ✓ Responsive design implemented
- ✓ Color palette properly applied

## Project Status: **COMPLETE & ENHANCED**
All core features have been implemented, styled, and enhanced with production-ready improvements.

---

## 🚀 Phase 2 Improvements Implemented

### ✅ Environment Configuration
- Created `.env.example` files for both server and client
- Implemented centralized config loaders
- Validation of required environment variables

### ✅ Input Validation & Sanitization
- **express-validator** for server-side validation
- Custom validation rules for all endpoints:
  - Auth validation (password strength, email format)
  - Project validation (title, code, description)
  - Generation validation (prompt length limits)
- **xss library** for input sanitization
- XSS attack prevention on all user inputs

### ✅ Error Boundaries (React)
- React Error Boundary component for graceful error handling
- Fallback error UI with helpful messages
- Error logging and tracking
- Development-only stack traces

### ✅ Professional Loading States
- **Skeleton Loaders** instead of basic spinners
- Animated gradient loading placeholders
- Component-specific skeletons:
  - `SkeletonLoader` - Generic loader
  - `SkeletonText` - Text block loader
  - `SkeletonCard` - Card loader
  - `DashboardSkeleton` - Dashboard grid skeleton
  - `BuilderSkeleton` - Builder page skeleton
  - `ProjectCardSkeleton` - Project card skeleton

### ✅ Logging System
**Backend:**
- Comprehensive logger utility with multiple log levels
- Automatic log file rotation (daily)
- Colored console output for development
- Request/response logging middleware
- Error tracking with full stack traces
- Logs stored in `logs/app-YYYY-MM-DD.log`

**Frontend:**
- Client-side logger for debugging
- localStorage persistence (last 100 logs)
- Error tracking to server (optional)
- Styled console logging

### ✅ Security Enhancements
- **Helmet.js** for security HTTP headers
- **Rate Limiting** to prevent API abuse
- **CORS** properly configured
- **Request Compression** for smaller payloads
- **XSS Protection** via input sanitization
- **CSRF** protection ready

### ✅ Code Quality Tools
**ESLint Configuration:**
- Server-side ESLint config (ES modules)
- Client-side ESLint config (React hooks, props)
- Comprehensive rule set for code consistency
- Auto-fixable issues

**Prettier Formatting:**
- Consistent code style
- 80-character line width
- Single quotes, trailing commas
- Standardized indentation

### ✅ Testing Infrastructure
- **Vitest** configuration for both server and client
- Example test files for:
  - Sanitization utilities
  - Logger utilities
- Test setup for client (jsdom environment)
- Coverage reporting setup

### ✅ API Documentation
Complete API documentation with:
- All endpoints documented
- Request/response examples
- Validation rules
- Error codes and meanings
- Rate limiting information
- cURL and JavaScript examples
- Best practices guide

### ✅ Comprehensive Guides
1. **Development Guide** (`DEVELOPMENT_GUIDE.md`)
   - Quick start instructions
   - Development workflow
   - Feature creation examples
   - Testing guidelines
   - Debugging tips
   - Common issues & solutions

2. **Server README** (`server/README.md`)
   - Installation instructions
   - Configuration guide
   - Project structure
   - API endpoints
   - Security details
   - Logging system
   - Error handling

3. **Client README** (`client/README.md`)
   - Setup instructions
   - Project structure
   - All features explained
   - Component documentation
   - API integration guide
   - Testing instructions
   - Deployment guide

---

## 📊 Quality Metrics

| Aspect | Status | Details |
|--------|--------|---------|
| **Code Security** | ✅ Enhanced | Input validation, sanitization, XSS protection |
| **Error Handling** | ✅ Comprehensive | Error boundaries, logging, tracking |
| **Code Quality** | ✅ Professional | ESLint, Prettier, test setup |
| **Performance** | ✅ Optimized | Skeleton loaders, compression, rate limiting |
| **Documentation** | ✅ Complete | API docs, guides, READMEs |
| **Testing** | ✅ Ready | Vitest setup, example tests |
| **Security Headers** | ✅ Enabled | Helmet.js, CORS, rate limiting |

---

## 🔐 Security Features Checklist

- ✅ Input validation on all endpoints
- ✅ Input sanitization (XSS prevention)
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Rate limiting (100 requests/15 min)
- ✅ Security headers (Helmet)
- ✅ Request compression (gzip)
- ✅ Password hashing (bcryptjs)
- ✅ Environment variable protection
- ✅ Error logging (no sensitive data exposed)

---

## 📈 Performance Optimizations

- **Frontend:**
  - Skeleton loaders for better UX
  - Code splitting ready (React.lazy)
  - CSS minification
  - Image optimization
  - Smooth animations with Framer Motion

- **Backend:**
  - Response compression
  - Rate limiting
  - Request validation early
  - Efficient error handling
  - Logging optimization

---

## 🎯 Next Steps (Future Enhancements)

### Phase 3
- [ ] TypeScript migration
- [ ] Advanced code splitting
- [ ] PWA capabilities
- [ ] Service workers
- [ ] Advanced analytics
- [ ] Performance monitoring (Sentry)

### Advanced Features
- [ ] Template library
- [ ] Collaborative editing
- [ ] Version control
- [ ] Component reuse
- [ ] Export to React/Vue/Angular
- [ ] Code review workflow
- [ ] Team collaboration

### DevOps
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated testing in pipeline
- [ ] Pre-commit hooks
- [ ] Database backups
- [ ] Monitoring and alerts

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project overview |
| `API_DOCUMENTATION.md` | Complete API reference |
| `DEVELOPMENT_GUIDE.md` | Developer setup & workflow |
| `PROJECT_COMPLETION_GUIDE.md` | Project details & improvements |
| `server/README.md` | Backend documentation |
| `client/README.md` | Frontend documentation |

---

## 🛠️ Tools & Dependencies

### Frontend
- React 19
- Vite 6
- Framer Motion (animations)
- Three.js (3D)
- Axios (HTTP)
- Firebase (Auth)
- ESLint + Prettier
- Vitest (testing)

### Backend
- Express 5
- Firebase Admin
- Google Generative AI
- JWT (jsonwebtoken)
- bcryptjs (hashing)
- express-validator
- xss (sanitization)
- Helmet (security)
- express-rate-limit
- Vitest (testing)

---

## 🚀 Deployment Ready

The project is now production-ready with:
- Complete error handling
- Security best practices
- Comprehensive logging
- Input validation & sanitization
- Rate limiting
- Professional UI/UX
- Full documentation
- Testing infrastructure

---

## 📞 Support & Contributing

For issues, improvements, or questions:
1. Review the documentation files
2. Check existing issues
3. Follow the development guide
4. Run tests before submitting PRs
5. Ensure code passes linting

---

**Project Last Updated:** May 2024
**Status:** Production Ready with Enterprise-Grade Features
**Quality:** Professional Grade
