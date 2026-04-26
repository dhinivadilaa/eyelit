# Eyelit

A Laravel 13 + React 19 starter kit with Inertia.js, featuring a modern UI component library and AI integration.

## Tech Stack

**Backend**
- Laravel 13
- Inertia.js
- Laravel Fortify (authentication)
- Laravel Wayfinder (navigation)

**Frontend**
- React 19
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Vite

**AI & Integrations**
- Anthropic SDK (Claude AI)

## Prerequisites

- PHP 8.3+
- Node.js 18+
- Composer 2.x
- MySQL / SQLite (or other supported database)

## Installation

```bash
# 1. Install PHP dependencies
composer install

# 2. Install Node dependencies
npm install

# 3. Set up environment file
cp .env.example .env

# 4. Generate application key and run migrations
php artisan key:generate
php artisan migrate --force

# 5. Build frontend assets
npm run build
```

## Development

```bash
# Run all services concurrently (server, queue, vite)
composer run dev

# Or run individually
php artisan serve              # Laravel server
php artisan queue:listen       # Queue worker
npm run dev                    # Vite dev server
```

## Available Scripts

### Composer
```bash
composer run dev       # Start dev environment
composer run test      # Run tests
composer run lint      # Format PHP code
composer run lint:check # Check PHP code style
```

### NPM
```bash
npm run dev            # Vite dev server
npm run build          # Production build
npm run types:check    # TypeScript type check
npm run lint           # ESLint fix
npm run lint:check     # ESLint check
npm run format         # Prettier format
npm run format:check   # Prettier check
```

### CI
```bash
composer run ci:check  # Full CI check (lint, types, tests)
```

## Project Structure

```
app/
├── Http/
│   ├── Controllers/          # Laravel controllers
│   ├── actions/              # Action classes
│   └── app.tsx               # React app entry
├── Console/
│   └── settings.php          # Wayfinder navigation config
└── ...

resources/js/
├── actions/                  # Inertia action classes
├── components/              # React components
│   ├── ui/                   # Radix UI base components
│   └── *.tsx                 # Feature components
├── hooks/                    # React hooks
├── layouts/                  # Page layouts (app, auth, settings)
├── lib/                      # Utilities
├── pages/                    # Route pages
│   ├── auth/                 # Auth pages
│   └── settings/             # Settings pages
└── types/                    # TypeScript type definitions
```

## Authentication

The project uses Laravel Fortify for authentication with the following features:

- Email & password authentication
- Two-factor authentication (2FA)
- Password reset
- Email verification

## UI Components

A collection of reusable UI components built on Radix UI:

- `Button`, `Input`, `Label`, `Checkbox`, `Select`
- `Dialog`, `DropdownMenu`, `Sheet`
- `Avatar`, `Badge`, `Card`, `Separator`
- `Collapsible`, `NavigationMenu`, `Toggle`
- `Tooltip`, `Sonner` (toast notifications)
- `Skeleton`, `Spinner`, `Alert`

All components support the application's theming system (light/dark mode).

## Theming

The application supports light and dark modes. Use the appearance settings page or the `use-appearance` hook to manage the theme.

## License

MIT
