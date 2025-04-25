# Galvanize Workflow Explorer

This project implements a Workflow Explorer UI for the Hybrid Thinking Productivity Platform. It allows users to visualize and interact with workflow stages in a modular, intuitive interface.

## Features

- **Overview Mode**: View all workflow stages in a horizontal rail
- **Detail View**: Examine and edit individual stages
- **Stage Preview**: Hover over stages to see detailed information
- **Snapshot Management**: Restore previous versions of stage prompts
- **Status Indicators**: Visual feedback on stage and validator status

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
# or
yarn
```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server. Once started, you can view the application by opening your browser and navigating to:

**http://localhost:5173/**

The page will automatically reload if you make changes to the code.

## Project Structure

- `src/types`: TypeScript interfaces and types
- `src/mocks`: Mock data for development
- `src/context`: React context for state management
- `src/components/workflow`: UI components for the Workflow Explorer

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```
