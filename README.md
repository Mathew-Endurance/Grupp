# GRUPP UI – Modern React Dashboard

A clean and responsive dashboard built with React, TypeScript, and TailwindCSS. It features a modern UI, mobile-friendly layouts, and well-structured components to speed up development.

## Features

- **Responsive Design** – Looks great on both desktop and mobile
- **Modular Components** – Built with reusable and maintainable UI elements
- **Mobile Navigation** – Optimized navigation for smaller screens
- **User Roles & Settings** – Manage roles, permissions, and settings pages
- **Pagination** – Smart pagination logic for data-heavy tables
- **Modern UI** – Styled with TailwindCSS for a polished look

## Tech Stack

- **React 19** – With hooks and concurrent features
- **TypeScript** – Strong typing and better tooling
- **Vite** – Lightning-fast build tool
- **TailwindCSS** – Utility-first CSS styling
- **React Router** – Client-side routing
- **Lucide Icons** – Clean and modern icon set
- **Vitest** – Fast unit testing
- **React Testing Library** – Tests that simulate real user interactions

## Getting Started

### Prerequisites

- Node.js v18 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project folder
cd grupp

# Install dependencies
npm install
```

### Development

```bash
# Run the dev server
npm run dev
```

### Production Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Test coverage report
npm run test:coverage
```

## Project Structure

```
grupp/
├── public/             # Static files
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # Shared and common UI components
│   │   └── common/
│   ├── layout/         # App layout elements
│   ├── pages/          # Route-level views
│   │   └── settings/
│   ├── route/          # App routing config
│   ├── test/           # Test setup and helpers
│   ├── types/          # Custom TypeScript types
│   └── utils/          # Helper functions
├── App.tsx             # Root component
└── main.tsx            # App entry point
```

## UI Components Overview

### Layout

- `PageLayout` – Primary layout with sidebar
- `Sidebar` – Desktop side navigation
- `MobileMenu` – Mobile nav drawer
- `MobileFooter` – Bottom nav for small screens

### Common

- `TabNavigation` – Tabs for switching views
- `PageHeader` – Title and optional description
- `Pagination` – Component with pagination logic
- `UserRolesTable` – Role management table

## Testing Strategy

Tests are written with Vitest and React Testing Library, covering component behavior, responsiveness, and user interactions.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
