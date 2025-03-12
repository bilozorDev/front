# Project Guidelines for Claude Code

## Commands
- `pnpm dev` - Start development server with turbopack
- `pnpm build` - Build the project
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm update-types` - Generate Supabase TypeScript types

## Code Style
- **Components**: React functional components with TypeScript
- **State Management**: Zustand for global state, React hooks for local state
- **TypeScript**: Strict mode enabled, explicit return types
- **Imports**: Group and sort imports (React/Next first, then UI components, then utilities)
- **Naming**: PascalCase for components, camelCase for functions/variables 
- **CSS**: Tailwind utility classes with consistent spacing patterns
- **Error Handling**: Use try/catch for async operations

## Architecture
- **Next.js App Router**: Follow file-based routing conventions
- **React Query**: Use for data fetching and caching
- **Supabase**: Database and authentication backend
- **Components**: Keep reusable components in `/components` folder
- **API Functions**: Keep server functions in dedicated files

## Project Structure
- `/app` - Next.js App Router pages
- `/components` - Reusable React components
- `/queries` - API and database queries
- `/utils` - Utility functions
- `/types` - TypeScript type definitions