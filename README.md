# Lexiread

Lexiread is an interactive language learning platform that helps users improve their vocabulary through reading and quiz-based learning.

## 🚀 Live Demo

<div align="center">
  
  **[Visit Lexiread](https://lexiread.vercel.app)** 
  

</div>


## Features

### 📚 Reading Experience
- Interactive article reading interface
- AI-powered GPT vocabulary explanation
- Click-to-define vocabulary lookup
- Save articles for later reading
- Contextual learning
- Daily curated selection of 5 news articles

### 📝 Vocabulary Management
- Personal vocabulary tracking
- Word familiarity tracking
- Personal learning progress tracking

### ⚡ Quiz System
- Interactive vocabulary quizzes
- Real-time feedback
- Randomized tests based on word familiarity

### 👤 User Management
- Secure authentication via Clerk
- Multiple login options (Google, Facebook)
- Personal profile management

## Tech Stack

- **Frontend**: Next.js 15, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Prisma with PostgreSQL
- **Authentication**: Clerk
- **Styling**: TailwindCSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lexiread.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:
```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

