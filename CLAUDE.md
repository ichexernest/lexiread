# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LexiRead is a Next.js 15 language learning platform that helps users improve vocabulary through interactive article reading and quiz-based learning. Users can click on words to get AI-powered definitions and track their vocabulary progress through a personal dashboard.

## Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Production build (includes Prisma generation)
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm test             # Run all Jest tests
npm test:watch       # Run tests in watch mode
npm test -- ArticleCard  # Run specific test file
```

## Architecture

### App Router Structure
The app uses Next.js 15 App Router with route groups:
- `(Main)/` - Protected routes requiring authentication
- `api/` - Server-side API endpoints
- Components are organized by feature with co-located tests

### Key Components
- **ArticleViewer**: Interactive reading with click-to-define functionality
- **VocListContainer**: Vocabulary management with familiarity tracking (0-4 scale)
- **QuizBoard**: Adaptive vocabulary quizzes based on user familiarity
- **LearningDashBoard**: Progress tracking and statistics

### Data Flow
- **useApi** hook provides unified API client with SWR caching
- **useLazyLoad** optimizes component loading
- Prisma handles database operations with PostgreSQL
- Clerk manages authentication and user sessions

### Database Schema
Core entities:
- `PublicVocabulary` & `VocabularyDefinition` - Global vocabulary database
- `UserVocabulary` - Personal word tracking with familiarity scores
- `PublicArticle` & `ArticleContent` - Curated articles
- `UserArticle` - User's saved articles

## Testing Setup

Uses Jest with React Testing Library:
- Tests located alongside components (`.test.tsx`)
- Mock implementations for external dependencies
- Coverage collection enabled for `src/` directory
- Use `npm test -- --testNamePattern="should render"` for specific test cases

## Key Configuration

- **Authentication**: Clerk middleware in `middleware.ts` handles route protection
- **Database**: Prisma with PostgreSQL, migrations managed via Prisma CLI
- **Styling**: TailwindCSS 4 with custom theme in `tailwind.config.ts`
- **API Integration**: OpenAI for vocabulary definitions, RSS parsing for articles

## Common Patterns

- Server Actions are used in `(Main)/Admin/actions.ts` for data mutations
- SWR keys follow pattern: `[endpoint, ...params]`
- Vocabulary familiarity uses 0-4 scale (0=unfamiliar, 4=mastered)
- Components export default function with TypeScript interfaces
- API routes return `NextResponse.json()` for consistency