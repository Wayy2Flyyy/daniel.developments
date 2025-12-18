# Danielillis Domain

## Overview

Danielillis Domain is a digital showroom and e-commerce platform for selling premium FiveM scripts, web templates, and developer tools. The application features a modern portfolio showcase, product catalog with shopping cart functionality, secure user authentication, and a checkout system. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for local state (cart, auth)
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for UI transitions
- **Build Tool**: Vite with custom plugins for Replit integration

**Key Design Patterns**:
- Component-based architecture with shadcn/ui primitives
- Context providers for cross-cutting concerns (AuthProvider, CartProvider)
- Custom hooks for mobile detection and toast notifications
- Path aliases (@/ for client/src, @shared/ for shared code)

### Backend Architecture

- **Framework**: Express.js with TypeScript
- **Build**: esbuild for production bundling with selective dependency bundling
- **Session Management**: Custom session-based authentication with HttpOnly cookies
- **Password Security**: bcryptjs with 12 rounds for hashing

**API Structure**:
- RESTful endpoints under `/api/` prefix
- Authentication routes: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/sessions`
- Product routes: `/api/products`, `/api/products/:id`, `/api/products/category/:category`
- Order routes: `/api/orders`

**Security Features**:
- Rate limiting on authentication endpoints
- Timing-safe password verification with dummy hash
- Session token hashing with SHA-256
- CSRF protection via SameSite cookies

### Data Storage

- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema synchronization

**Core Tables**:
- `users` - User accounts with email as primary identifier, password hash, MFA support
- `sessions` - Session tokens with expiry, IP/user agent tracking, revocation support
- `products` - Product catalog with categories, features, pricing
- `orders` - Order history linked to email
- `emailVerificationTokens` - Email verification flow
- `passwordResetTokens` - Password reset flow

### Authentication System

Session-based authentication chosen over JWT for better security and control:
- 7-day default session, 30-day with "remember me"
- Server-side session storage with PostgreSQL
- Multiple device session management with revocation
- Email verification and password reset token support

## External Dependencies

### Database
- **PostgreSQL** - Primary database (requires DATABASE_URL environment variable)
- **Drizzle ORM** - Type-safe database queries and schema management
- **connect-pg-simple** - PostgreSQL session store

### Frontend Libraries
- **@tanstack/react-query** - Server state management and caching
- **@radix-ui/react-*** - Accessible UI primitives (full component suite)
- **framer-motion** - Animation library
- **react-hook-form** + **zod** - Form handling and validation
- **cmdk** - Command palette component
- **embla-carousel-react** - Carousel component
- **vaul** - Drawer component
- **react-day-picker** - Date picker
- **recharts** - Charting library

### Backend Libraries
- **express** - HTTP server framework
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie handling middleware
- **zod-validation-error** - User-friendly validation errors

### Build Tools
- **Vite** - Frontend build and dev server
- **esbuild** - Backend bundling for production
- **tsx** - TypeScript execution for development

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal** - Error overlay
- **@replit/vite-plugin-cartographer** - Development tooling
- **@replit/vite-plugin-dev-banner** - Development banner
- Custom `vite-plugin-meta-images` for OpenGraph images