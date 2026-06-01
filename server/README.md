# NxtBuild - Server

Backend server for NxtBuild, an AI-powered web application builder using Express.js, Firebase, and Google's Gemini API.

## Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- Google Gemini API key

## Installation

1. **Clone the repository:**
```bash
cd server
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Fill in your environment variables:**
- Firebase configuration
- Gemini API key
- JWT secret
- CORS origin
- Database URI (if using MongoDB)

## Configuration

### Environment Variables

See `.env.example` for all available options:

```env
# Server
PORT=5000
NODE_ENV=development

# Firebase
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
# ... more Firebase config

# Gemini API
GEMINI_API_KEY=your_gemini_key

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

## Scripts

```bash
# Start server
npm start

# Development mode (with auto-reload)
npm run dev

# Lint code
npm run lint

# Run tests
npm test
```

## Project Structure

```
server/
├── src/
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── config/                # Configuration files
│   │   ├── config.js          # Main config loader
│   │   ├── firebase.config.js
│   │   └── gemini.config.js
│   ├── routes/                # API routes
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── generation.routes.js
│   ├── controllers/           # Route handlers
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   └── generation.controller.js
│   ├── middleware/            # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── logging.middleware.js
│   ├── services/              # Business logic
│   │   ├── auth.service.js
│   │   ├── project.service.js
│   │   ├── gemini.service.js
│   │   └── generation.service.js
│   ├── utils/                 # Utility functions
│   │   ├── jwt.utils.js
│   │   ├── code.utils.js
│   │   ├── validation.utils.js
│   │   ├── sanitization.utils.js
│   │   └── logger.js
│   ├── constants/
│   │   └── prompts.js
│   └── models/                # Database models (future)
├── logs/                      # Application logs
├── .env.example
├── .prettierrc.json
├── eslint.config.js
├── vitest.config.js
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout (protected)

### Projects
- `GET /api/projects` - Get all projects (protected)
- `POST /api/projects` - Create project (protected)
- `GET /api/projects/:id` - Get project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Code Generation
- `POST /api/generation/:projectId` - Generate code (protected)

## Features

✅ User authentication with JWT
✅ Firebase integration
✅ Google Gemini AI code generation
✅ Input validation and sanitization
✅ Rate limiting
✅ Security headers (Helmet)
✅ Request logging
✅ Error handling
✅ CORS support
✅ Request compression
✅ Code formatting (Prettier)
✅ Linting (ESLint)

## Security

- **Helmet.js** - Set security HTTP headers
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Using express-validator
- **Input Sanitization** - Using xss library
- **JWT Authentication** - Secure token-based auth
- **CORS Protection** - Whitelist allowed origins
- **Password Hashing** - Using bcryptjs

## Logging

Logs are written to `logs/app-YYYY-MM-DD.log`:

```javascript
import { createLogger } from './utils/logger.js';

const logger = createLogger('MODULE_NAME');

logger.info('User logged in', { userId: 123 });
logger.error('Database error', error);
logger.warn('High memory usage');
logger.success('Code generated successfully');
```

## Error Handling

All errors are caught and logged:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack (development only)"
}
```

## Testing

Run tests with:
```bash
npm test
```

Tests are located in `src/**/*.test.js` and use Vitest.

## Development

### Code Style

Code is formatted with Prettier and linted with ESLint. Run before committing:

```bash
npm run lint
```

### Adding New Features

1. Create controller in `controllers/`
2. Create service in `services/`
3. Create routes in `routes/`
4. Add validation rules in `utils/validation.utils.js`
5. Write tests in `*.test.js`

## Production Deployment

1. Set `NODE_ENV=production`
2. Update all environment variables
3. Use a process manager (PM2, systemd)
4. Set up database backups
5. Enable monitoring and logging

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env or use:
PORT=3001 npm start
```

**Firebase connection error:**
- Check Firebase credentials in .env
- Ensure Firebase project is active

**Rate limit errors:**
- Adjust `RATE_LIMIT_MAX_REQUESTS` in .env

## Support

For issues and questions, check:
- [API Documentation](../API_DOCUMENTATION.md)
- Project Issues on GitHub
- Firebase Documentation
- Gemini API Documentation

## License

ISC
