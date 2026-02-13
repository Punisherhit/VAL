# replit.md

## Overview

This is an interactive Valentine-themed website built as a full-stack application with a React frontend and Express backend. The app presents users with a "Will you be my Valentine?" experience featuring multiple screens: a start screen with YES/NO buttons, a love screen (for YES), and a heartbreak screen (for NO). Each screen displays rotating poems/messages, floating heart animations, and music player links. The core experience is frontend-driven with romantic animations and themed content, while the backend provides a minimal API and serves the static files.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router) with three main routes: `/` (Start), `/love` (YES path), `/heartbreak` (NO path)
- **Styling**: Tailwind CSS with CSS variables for theming, using a romantic pink/red color palette. Shadcn/ui component library (new-york style) provides the base UI components
- **Animations**: Framer Motion for page transitions, floating hearts, and interactive elements
- **Icons**: Lucide React for all iconography
- **State Management**: React Query for server state (minimal usage), React useState/useEffect for local state, localStorage for persisting user input (names, date)
- **Build Tool**: Vite with React plugin
- **Custom Fonts**: Google Fonts - Pacifico (display), Nunito (body), Dancing Script (handwriting)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, executed via tsx
- **API**: Minimal REST API - currently only a `/api/status` health check endpoint
- **Static Serving**: In production, serves built Vite output from `dist/public`
- **Dev Server**: Vite dev server middleware with HMR in development mode
- **Build**: Custom build script using esbuild for server and Vite for client. Server bundles to `dist/index.cjs`, client to `dist/public/`

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: node-postgres (pg) Pool using `DATABASE_URL` environment variable
- **Schema**: Minimal - only a `users` table (id, username, password) defined in `shared/schema.ts`. The app is primarily frontend-focused and doesn't heavily use the database
- **Migrations**: Drizzle Kit with `db:push` command, migrations output to `./migrations`
- **Validation**: Drizzle-Zod for schema validation

### Shared Layer
- `shared/schema.ts` - Database schema and Zod types shared between frontend and backend
- `shared/routes.ts` - API route definitions with Zod response schemas and URL builder utility

### Content System
- All poems, messages, and quotes are hardcoded in `client/src/hooks/use-content.ts`
- A `useRotator` hook auto-cycles through content on a timer (default 4 seconds) with manual next/back navigation
- Four content categories: love-poems, love-messages, sad-poems, sad-messages

### Key Design Patterns
- The NO button on the start screen has a "runaway" mechanic on desktop - it moves randomly when hovered
- User personalization (names, anniversary date) persists via localStorage
- The love screen calculates and displays days together from the stored date
- Music player buttons open YouTube links in new tabs rather than embedding audio

## External Dependencies

### Database
- **PostgreSQL**: Required, connected via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session store (available but not actively used in current routes)

### Frontend Libraries
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library for page transitions and floating effects
- **lucide-react**: Icon library
- **wouter**: Lightweight routing
- **Radix UI**: Full suite of accessible UI primitives (dialog, popover, tabs, etc.)
- **shadcn/ui**: Component library built on Radix + Tailwind
- **embla-carousel-react**: Carousel component
- **react-day-picker**: Calendar/date picker
- **react-hook-form + @hookform/resolvers**: Form handling with Zod validation
- **recharts**: Charting library (available via shadcn)
- **vaul**: Drawer component
- **cmdk**: Command menu component

### External Services
- **Google Fonts CDN**: Pacifico, Nunito, Dancing Script, DM Sans, Fira Code, Geist Mono, Architects Daughter
- **YouTube**: Music playback via external link (`https://youtu.be/3JWTaaS7LdU`)

### Build & Dev Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundler for production
- **tsx**: TypeScript execution for development
- **drizzle-kit**: Database migration tool
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer** and **@replit/vite-plugin-dev-banner**: Replit-specific dev plugins