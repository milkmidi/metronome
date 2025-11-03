# Project Context

## Purpose
A web-based metronome application providing musicians with precise tempo control, visual and audio feedback. Supports multiple time signatures (2/4, 3/4, 4/4) and BPM range of 60-240.

## Tech Stack
- **Frontend**: React 19 with TypeScript 5.8
- **Styling**: Tailwind CSS 3.4 with PostCSS and Autoprefixer
- **Build Tool**: Vite 6.3
- **Testing**: Vitest 3.2 with React Testing Library
- **Code Quality**: ESLint with Airbnb style guide
- **Audio**: Web Audio API for precise timing and sound generation
- **Deployment**: GitHub Pages via gh-pages

## Project Conventions

### Code Style
- **Language**: TypeScript with strict type checking
- **Linting**: ESLint with Airbnb configuration
- **Component Structure**: Functional components with hooks
- **File Naming**:
  - Components: PascalCase (e.g., `MetronomeControls.tsx`)
  - Utils: kebab-case (e.g., `metronome-utils.ts`)
  - Tests: Co-located with `__tests__` directories
- **Type Definitions**: Centralized in `src/types/` directory

### Architecture Patterns
- **Component Organization**: Feature-based structure under `src/components/metronome/`
- **State Management**: React hooks (useState, useEffect, useRef)
- **Separation of Concerns**:
  - UI components in `components/metronome/`
  - Business logic in `utils/`
  - Type definitions in `types/`
- **Audio Handling**: Web Audio API with AudioContext for precise timing
- **Component Composition**: Small, focused components (Display, Controls, TimeSignature, Speed)

### Testing Strategy
- **Framework**: Vitest with jsdom environment
- **Testing Library**: React Testing Library for component tests
- **Coverage**: Run with `npm run test:coverage`
- **Test Location**: Co-located `__tests__` directories next to components/utils
- **Test Files**: `*.test.tsx` or `*.test.ts` naming convention
- **Approach**: Focus on user behavior and component interactions

### Git Workflow
- **Main Branch**: `dev` (working branch)
- **Commit Messages**: Clear, descriptive messages
- **Deployment**: Automated via GitHub Actions to gh-pages
- **Hooks**: Pre-deployment builds required
- **Scripts**: Use `npm run predeploy` before `npm run deploy`

## Domain Context
- **BPM (Beats Per Minute)**: Standard tempo measurement in music (60-240 range)
- **Time Signatures**: Notation indicating beats per measure
  - 2/4: 2 beats per measure, quarter note gets the beat
  - 3/4: 3 beats per measure (waltz time)
  - 4/4: 4 beats per measure (common time)
- **Strong Beat**: First beat of each measure (emphasized with distinct sound)
- **Weak Beat**: Non-emphasized beats in the measure
- **Visual Feedback**: Beat indicators show current position in measure

## Important Constraints
- **Browser Compatibility**: Requires Web Audio API support
- **Audio Files**: Requires `public/sounds/strong-beat.mp3` and `weak-beat.mp3`
- **Timing Precision**: Must use Web Audio API scheduling (not setTimeout/setInterval)
- **User Interaction**: Audio context may require user gesture to start (browser security)
- **Responsive Design**: Must work across different screen sizes

## External Dependencies
- **Audio Assets**: Sound files from free sources (Freesound, SoundBible, Zapsplat)
- **Deployment**: GitHub Pages hosting
- **No Backend**: Pure client-side application, no server or API dependencies
