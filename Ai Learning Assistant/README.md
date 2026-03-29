# Aethron

AI Learning Assistant built with the MERN stack and MongoDB Atlas.

Aethron helps learners upload study material, extract document content, generate AI summaries, ask questions about documents, create flashcards, take quizzes, and track recent learning activity from a single dashboard.

## Tech Stack

- MongoDB Atlas for the database
- Express.js for the backend API
- React + Vite for the frontend
- Node.js runtime
- Tailwind CSS for styling
- Gemini API for AI-powered study features

## Features

- User authentication with JWT
- PDF document upload and text extraction
- AI-generated summaries
- Document Q&A chat with saved chat history
- AI-generated flashcards
- AI-generated quizzes with results page
- Learning dashboard with recent activity and progress metrics
- Profile management

## Project Structure

```text
Ai Learning Assistant/
|-- Backend/
|-- Frontend/
|   `-- ai-learning-assistant/
`-- README.md
```

## Getting Started

### 1. Clone the project

```bash
git clone <your-repo-url>
cd "Ai Learning Assistant"
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create `Backend/.env` from `Backend/.env.example` and add your values.

Start the backend:

```bash
npm run dev
```

The API runs on `http://localhost:8000` by default.

### 3. Frontend setup

Open a new terminal:

```bash
cd Frontend/ai-learning-assistant
npm install
```

Optionally create a frontend `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on the Vite development server, usually `http://localhost:5173`.

## Environment Variables

### Backend

See `Backend/.env.example` for the required variables:

- `MONGO_URI`
- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `NODE_ENV`
- `MAX_FILE_SIZE`
- `GEMINI_API_KEY`

### Frontend

- `VITE_API_BASE_URL` optional, defaults to `http://localhost:8000`

## Available Scripts

### Root

There is no root package script yet. Run backend and frontend separately.

### Backend

- `npm run dev` starts the API with nodemon
- `npm start` starts the API with Node.js

### Frontend

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run preview` previews the production build
- `npm run lint` runs ESLint

## API Overview

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

## Deployment Notes

- Use MongoDB Atlas for `MONGO_URI`
- Set a strong `JWT_SECRET`
- Set `VITE_API_BASE_URL` to your deployed backend URL
- Configure CORS before production deployment
- Do not commit real `.env` files or private API keys

## Publish Checklist

- Add your GitHub repository URL
- Add screenshots or a demo link
- Rotate any secrets that were previously stored in local `.env` files
- Verify frontend and backend production URLs
- Add license information if you want the repo to be open source

## Documentation

- [Backend README](./Backend/README.md)
- [Frontend README](./Frontend/ai-learning-assistant/README.md)
