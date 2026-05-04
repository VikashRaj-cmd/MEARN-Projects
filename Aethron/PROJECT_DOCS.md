# Aethron — AI Learning Assistant
### Project Documentation for Job / Internship / Placement Interviews

---

## 1. PROJECT OVERVIEW

**Aethron** is a full-stack AI-powered learning assistant web application built with the MERN stack.
It allows students to upload study material (PDFs), extract content, generate AI summaries,
ask questions about documents, create flashcards, take quizzes, and track learning progress
from a single dashboard.

**Live Demo:** https://aethron.vercel.app
**GitHub:** https://github.com/VikashRaj-cmd/MEARN-Projects/tree/main/Aethron

---

## 2. TECH STACK

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | React 19, Vite, Tailwind CSS v4   |
| Backend     | Node.js, Express.js 5             |
| Database    | MongoDB Atlas, Mongoose           |
| AI          | Google Gemini API                 |
| Auth        | JWT (JSON Web Tokens), bcryptjs   |
| File Upload | Multer                            |
| PDF Parsing | pdf-parse                         |
| Hosting     | Vercel (frontend), Railway (backend) |
| Storage     | Cloudinary (PDF files)            |

---

## 3. FEATURES

### Authentication
- User registration and login with JWT
- Protected routes using middleware
- Password change with current password verification
- Token stored in localStorage, sent via Authorization header

### Document Management
- Upload PDF documents (up to 10MB)
- Automatic text extraction from PDFs using pdf-parse
- Text chunking for efficient AI context passing
- Document list with flashcard and quiz counts
- Delete documents with file cleanup

### AI Features (Google Gemini API)
- **AI Summary** — generates a structured summary of the document
- **Document Q&A Chat** — ask questions, get answers based on document content
- **Chat History** — saved per document, persisted in MongoDB
- **Flashcard Generation** — AI generates question/answer flashcard pairs
- **Quiz Generation** — AI generates multiple choice questions with explanations
- **Concept Explanation** — explain any concept from the document

### Flashcards
- Generate flashcards from any document
- Flip card interaction (question → answer)
- Star/unstar cards for priority review
- Review tracking (review count per card)
- Delete flashcard sets

### Quizzes
- Generate quizzes with configurable number of questions
- Multiple choice questions with 4 options
- Question navigation with progress dots
- Submit quiz and view detailed results
- Score calculation as percentage
- Detailed review showing correct/wrong answers with explanations
- Prevent re-submission of completed quizzes

### Dashboard
- Total documents, flashcards, quizzes count
- Recent activity feed (documents accessed + quizzes attempted)
- Sorted by timestamp, links to correct page (results vs take)

### Profile
- View username and email
- Change password with validation

---

## 4. PROJECT ARCHITECTURE

```
Aethron/
├── Backend/                        # Express.js API
│   ├── config/
│   │   ├── db.js                   # MongoDB Atlas connection
│   │   ├── multer.js               # File upload config (Cloudinary)
│   │   └── cloudinary.js           # Cloudinary SDK config
│   ├── controllers/
│   │   ├── authController.js       # Register, login, profile, password
│   │   ├── documentController.js   # Upload, get, delete documents
│   │   ├── aiController.js         # Gemini AI integrations
│   │   ├── flashcardController.js  # Flashcard CRUD + review
│   │   ├── quizController.js       # Quiz CRUD + submit + results
│   │   └── progressController.js   # Dashboard stats + activity
│   ├── middleware/
│   │   ├── auth.js                 # JWT protect middleware
│   │   └── errorHandler.js         # Global error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Document.js
│   │   ├── Flashcard.js
│   │   ├── Quiz.js
│   │   └── ChatHistory.js
│   ├── routes/                     # Express routers
│   ├── utils/
│   │   ├── geminiService.js        # Gemini API calls
│   │   ├── pdfParser.js            # PDF text extraction
│   │   └── textChunker.js          # Chunk text for AI context
│   └── server.js                   # Entry point, middleware, routes
│
└── Frontend/ai-learning-assistant/ # React + Vite app
    └── src/
        ├── components/
        │   ├── common/             # Button, Modal, Spinner, Tabs, etc.
        │   ├── quizzes/            # QuizCard, QuizManager
        │   ├── flashcards/         # Flashcard, FlashcardManager
        │   ├── chat/               # ChatInterface
        │   ├── ai/                 # AiAction
        │   └── layout/             # AppLayout, Header, Sidebar
        ├── Pages/
        │   ├── Auth/               # Login, Register
        │   ├── Dashboard/          # DashboardPage
        │   ├── Documents/          # DocumentListPage, DocumentDetailPage
        │   ├── Flashcards/         # FlashcardPage, FlashcardsListPage
        │   ├── Quizzes/            # QuizTakePage, QuizResultPage
        │   └── Profile/            # ProfilePage
        ├── services/               # Axios API call functions
        ├── context/                # AuthContext (React Context)
        └── utils/                  # axiosInstance, apiPaths
```

---

## 5. API ENDPOINTS

### Auth — /api/auth
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | /register             | Register new user    |
| POST   | /login                | Login, returns JWT   |
| GET    | /profile              | Get user profile     |
| PUT    | /profile              | Update profile       |
| POST   | /change-password      | Change password      |

### Documents — /api/documents
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | /upload               | Upload PDF           |
| GET    | /                     | Get all documents    |
| GET    | /:id                  | Get single document  |
| DELETE | /:id                  | Delete document      |

### AI — /api/ai
| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| POST   | /generate-summary           | Generate AI summary     |
| POST   | /generate-flashcards        | Generate flashcards     |
| POST   | /generate-quiz              | Generate quiz           |
| POST   | /chat                       | Chat with document      |
| POST   | /explain-concept            | Explain a concept       |
| GET    | /chat-history/:documentId   | Get saved chat history  |

### Flashcards — /api/flashcards
| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | /                         | Get all flashcard sets  |
| GET    | /:documentId              | Get flashcards for doc  |
| POST   | /:cardId/review           | Mark card reviewed      |
| PUT    | /:cardId/star             | Toggle star             |
| DELETE | /:id                      | Delete flashcard set    |

### Quizzes — /api/quizzes
| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | /:documentId          | Get quizzes for doc     |
| GET    | /quiz/:id             | Get single quiz         |
| POST   | /:id/submit           | Submit quiz answers     |
| GET    | /:id/results          | Get quiz results        |
| DELETE | /:id                  | Delete quiz             |

### Progress — /api/progress
| Method | Endpoint    | Description          |
|--------|-------------|----------------------|
| GET    | /dashboard  | Get dashboard data   |

---

## 6. DATABASE MODELS

### User
- username, email, password (hashed with bcryptjs)
- timestamps

### Document
- userId (ref), title, fileName, filePath (Cloudinary URL)
- fileSize, extractedText, chunks[], status
- lastAccessed, timestamps

### Flashcard
- userId, documentId (ref)
- cards[]: { question, answer, isStarred, reviewCount }
- timestamps

### Quiz
- userId, documentId (ref), title
- questions[]: { question, options[], correctAnswer, explanation }
- userAnswers[]: { questionIndex, selectedAnswer, isCorrect }
- score, totalQuestions, completedAt
- timestamps

### ChatHistory
- userId, documentId (ref)
- messages[]: { role, content, timestamp }

---

## 7. KEY TECHNICAL DECISIONS & CHALLENGES

### Why Gemini API?
- Free tier with generous limits
- Supports large context windows (important for passing full document text)
- Simple REST-like SDK

### Text Chunking
- PDFs can be very large; Gemini has token limits
- Implemented a custom text chunker that splits extracted text into
  overlapping chunks (500 words, 50 word overlap) for better AI context

### JWT Authentication Flow
- On login, server signs a JWT with user ID and expiry
- Frontend stores token in localStorage
- Axios interceptor automatically attaches token to every request
- Backend protect middleware verifies token on every protected route

### Quiz Re-submission Prevention
- Backend checks quiz.completedAt before allowing submit
- Frontend redirects to results page if quiz already completed
- Prevents 400 errors from accidental re-submission

### File Storage Strategy
- Local disk (Multer) for development
- Cloudinary for production (permanent storage, CDN delivery)
- filePath stored as relative path in DB, full URL built on frontend
  using VITE_API_URL environment variable

### CORS Configuration
- Explicitly whitelisted frontend origins (localhost + Vercel URL)
- Credentials: true for JWT cookie support

---

## 8. HOW TO RUN LOCALLY

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### Backend
```bash
cd Backend
npm install
# Create .env with required variables (see .env.example)
npm run dev
# Runs on http://localhost:8000
```

### Frontend
```bash
cd Frontend/ai-learning-assistant
npm install
# Create .env with VITE_API_URL=http://localhost:8000
npm run dev
# Runs on http://localhost:5173
```

---

## 9. ENVIRONMENT VARIABLES

### Backend (.env)
```
MONGO_URI=mongodb+srv://...
PORT=8000
JWT_SECRET=...
JWT_EXPIRE=7d
NODE_ENV=development
MAX_FILE_SIZE=10485760
GEMINI_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
BASE_URL=http://localhost:8000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

---

## 10. INTERVIEW QUESTIONS & ANSWERS

**Q: What is the MERN stack?**
A: MERN stands for MongoDB, Express.js, React, Node.js. It is a full-stack JavaScript
   framework where MongoDB is the NoSQL database, Express handles the backend API,
   React builds the frontend UI, and Node.js is the runtime environment.

**Q: How does JWT authentication work in your project?**
A: When a user logs in, the backend verifies credentials, then signs a JWT containing
   the user ID using a secret key. The token is sent to the frontend and stored in
   localStorage. On every subsequent API request, an Axios interceptor attaches the
   token in the Authorization header as "Bearer <token>". The backend protect middleware
   verifies the token and attaches the user to req.user.

**Q: How do you handle file uploads?**
A: I use Multer as Express middleware to handle multipart/form-data. In production,
   Multer is configured with multer-storage-cloudinary to upload directly to Cloudinary
   instead of local disk. The Cloudinary URL is stored in MongoDB as the filePath.

**Q: How does the AI chat feature work?**
A: When a user sends a message, the frontend sends the message + documentId to the
   backend. The backend fetches the document's extracted text chunks from MongoDB,
   builds a prompt with the document context + conversation history + user question,
   and sends it to the Gemini API. The response is saved to ChatHistory and returned
   to the frontend.

**Q: What is text chunking and why did you implement it?**
A: Large PDFs can contain thousands of words which exceed AI token limits. Text chunking
   splits the extracted text into smaller overlapping segments (500 words with 50 word
   overlap). The overlap ensures context is not lost at chunk boundaries. Relevant chunks
   are selected and passed to the AI as context.

**Q: How do you prevent quiz re-submission?**
A: The Quiz model has a completedAt field. On submit, the backend checks if completedAt
   is already set and returns a 400 error if so. On the frontend, QuizTakePage fetches
   the quiz on load and immediately redirects to the results page if completedAt exists,
   so the submit button is never shown for completed quizzes.

**Q: What is React Context and how do you use it?**
A: React Context provides a way to share state across the component tree without prop
   drilling. I use AuthContext to store the authenticated user, token, login/logout
   functions, and loading state. Any component can access auth state using the useAuth
   custom hook.

**Q: How do you handle errors in your Express API?**
A: I have a global error handler middleware registered after all routes. Controllers
   call next(error) to pass errors to it. The handler formats the response with a
   consistent structure: { success: false, error: message, statusCode }. A 404 catch-all
   route handles unknown endpoints.

**Q: What is the difference between SQL and NoSQL? Why MongoDB?**
A: SQL databases use structured tables with fixed schemas and support complex joins.
   NoSQL databases like MongoDB store data as flexible JSON-like documents. I chose
   MongoDB because the data (documents, flashcards, quizzes) has varying structures,
   and MongoDB's document model maps naturally to JavaScript objects. MongoDB Atlas
   also provides a free managed cloud database.

**Q: How is your frontend structured?**
A: The frontend follows a feature-based structure. Pages contain full page components,
   components contains reusable UI pieces organized by feature (quizzes, flashcards,
   chat, common). Services contain all Axios API call functions. Context holds global
   state. Utils contains the Axios instance with interceptors and API path constants.

**Q: What is Vite and why use it over Create React App?**
A: Vite is a modern frontend build tool that uses native ES modules for development,
   making it significantly faster than Create React App's webpack-based bundler.
   Hot Module Replacement (HMR) is near-instant. Build times are also much faster.

**Q: How do you manage environment variables across dev and production?**
A: Backend uses dotenv to load .env files. Frontend uses Vite's built-in env support
   with VITE_ prefixed variables. Different .env files are used for local and production.
   Sensitive values are never committed to GitHub (covered by .gitignore).

---

## 11. WHAT I LEARNED / SKILLS DEMONSTRATED

- Full-stack JavaScript development (MERN)
- RESTful API design and implementation
- JWT-based authentication and authorization
- Third-party API integration (Google Gemini AI)
- File upload handling and cloud storage (Cloudinary)
- PDF text extraction and processing
- React state management with Context API
- Component-based UI architecture
- Responsive UI with Tailwind CSS
- MongoDB schema design with Mongoose
- Deployment on cloud platforms (Railway, Vercel, MongoDB Atlas)
- Environment variable management
- Git version control and GitHub

---

## 12. FUTURE IMPROVEMENTS

- Migrate file storage to Cloudinary (production-ready)
- Add spaced repetition algorithm for flashcard review scheduling
- Add real-time collaboration using Socket.io
- Add document sharing between users
- Implement proper study streak tracking (currently mocked)
- Add support for DOCX and PPTX file formats (mammoth + pptxgenjs already installed)
- Add email verification on registration
- Add rate limiting on AI endpoints to control API costs
- Write unit and integration tests (Jest + Supertest)

---
