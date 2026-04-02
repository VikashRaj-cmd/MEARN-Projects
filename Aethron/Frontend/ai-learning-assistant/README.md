# Aethron Frontend

React + Vite frontend for the Aethron AI Learning Assistant.

The frontend provides authentication screens, dashboard analytics, document browsing, AI actions, flashcards, quiz flows, and profile management in a responsive interface.

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React

## Features

- Login and registration flow
- Protected routes
- Dashboard with recent activity
- Document list and document detail pages
- Embedded PDF viewer
- AI summary, chat, and concept explanation UI
- Flashcard study flow
- Quiz attempt and result pages
- User profile page

## Scripts

```bash
npm install
npm run dev
```

Available scripts:

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build
- `npm run preview` previews the build locally
- `npm run lint` runs ESLint

## Environment Variables

Create a `.env` file in `Frontend/ai-learning-assistant` if you want to override the backend URL.

```env
VITE_API_BASE_URL=http://localhost:8000
```

If not provided, the frontend defaults to `http://localhost:8000`.

## Run Locally

```bash
cd Frontend/ai-learning-assistant
npm install
npm run dev
```

Open the app in the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Main Routes

- `/login`
- `/register`
- `/dashboard`
- `/documents`
- `/documents/:id`
- `/documents/:id/flashcards`
- `/quizzes/:quizId`
- `/quizzes/:quizId/results`
- `/flashcards`
- `/profile`

## Notes

- The frontend expects the backend API to be running
- Uploaded document URLs are resolved using `VITE_API_BASE_URL`
- For deployment, point `VITE_API_BASE_URL` to your hosted backend
