# InMan Tauri

Desktop inventory management application built with Tauri, React, and TypeScript.

## About

Cross-platform desktop application for inventory management, built using Tauri framework for better performance and smaller bundle sizes.

## Tech Stack

- Tauri (desktop framework)
- React 18
- TypeScript
- Vite
- Tailwind CSS 4
- Radix UI (headless components)
- Zustand (state management)
- SQLite (via Tauri SQL plugin)
- Next-themes (dark mode support)
- Sonner (toast notifications)

## Features

- Cross-platform desktop support (Windows, macOS, Linux)
- Local SQLite database
- Dark/light theme
- Toast notifications
- Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- Rust toolchain
- Tauri CLI

### Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/             # React components
├── pages/                  # Route pages
├── hooks/                  # Custom hooks
├── store/                  # Zustand stores
├── utils/                  # Utility functions
└── main.tsx                # Entry point
```

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Tauri commands
npm run tauri [command]
```
