# Aethron Backend

Express.js backend for the Aethron AI Learning Assistant.

This service handles authentication, document upload and processing, AI-powered study workflows, flashcards, quizzes, and dashboard analytics. Data is stored in MongoDB Atlas and protected routes use JWT authentication.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- JWT authentication
- Multer for file uploads
- Gemini API for AI generation

## Features

- User registration and login
- Protected profile routes
- PDF upload and processing
- Text chunking for AI context
- Summary generation
- Flashcard generation and review tracking
- Quiz generation, submission, and results
- Document chat and concept explanation
- Dashboard metrics and recent activity

## Scripts

```bash
npm install
npm run dev
```

Available scripts:

- `npm run dev` runs the API with nodemon
- `npm start` runs the API in normal mode

## Environment Variables

Create `Backend/.env` from `Backend/.env.example`.

```env
MONGO_URI=
PORT=8000
JWT_SECRET=
JWT_EXPIRE=7d
NODE_ENV=development
MAX_FILE_SIZE=10485760
GEMINI_API_KEY=
```

## Main API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `POST /api/auth/change-password`

### Documents

- `POST /api/documents/upload`
- `GET /api/documents`
- `GET /api/documents/:id`
- `DELETE /api/documents/:id`

### AI

- `POST /api/ai/generate-summary`
- `POST /api/ai/generate-flashcards`
- `POST /api/ai/generate-quiz`
- `POST /api/ai/chat`
- `POST /api/ai/explain-concept`
- `GET /api/ai/chat-history/:documentId`

### Flashcards

- `GET /api/flashcards`
- `GET /api/flashcards/:documentId`
- `POST /api/flashcards/:cardId/review`
- `PUT /api/flashcards/:cardId/star`
- `DELETE /api/flashcards/:id`

### Quizzes

- `GET /api/quizzes/:documentId`
- `GET /api/quizzes/quiz/:id`
- `POST /api/quizzes/:id/submit`
- `GET /api/quizzes/:id/results`
- `DELETE /api/quizzes/:id`

### Progress

- `GET /api/progress/dashboard`

## Run Locally

```bash
cd Backend
npm install
npm run dev
```

Create `.env` from `.env.example`, then start the server.

The backend listens on `http://localhost:8000` by default.

## Notes

- Uploaded files are stored in `Backend/uploads/`
- The current app serves uploads from the local filesystem
- For production, review CORS, secret management, and storage strategy
