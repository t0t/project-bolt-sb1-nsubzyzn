# Minimalist Design Studio

A modern web application for a design studio, built with Next.js 13, TypeScript, and Tailwind CSS. The application features a minimalist design approach with a content management system for blog posts and portfolio items.

## Features

- 🎨 Minimalist Design
- 📱 Fully Responsive
- 📝 Content Management System
- 🔍 SEO Optimized
- 🚀 Fast Performance
- 💾 Local Storage for Posts
- ✅ Form Validation
- 🧪 Unit Testing

## Tech Stack

- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Form Validation**: Zod
- **Testing**: React Testing Library
- **State Management**: Custom Hooks

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── work/              # Portfolio work pages
├── components/            # React components
├── lib/                   # Utility functions and hooks
│   ├── hooks/            # Custom React hooks
│   ├── tests/            # Test files
│   └── validation.ts     # Zod schemas
└── public/               # Static assets
```

## Key Components

### Content Management

The application uses a custom `usePosts` hook for managing blog posts and portfolio items:

```typescript
const { posts, isLoading, error, addPost, updatePost, deletePost } = usePosts();
```

### Data Validation

Input validation is handled by Zod schemas:

```typescript
const postSchema = z.object({
  title: z.string().min(1).max(100),
  excerpt: z.string().min(1).max(500),
  category: z.string().min(1).max(50),
  image: z.string().url().optional(),
});
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

Run the test suite:

```bash
npm test
```

The project includes unit tests for:
- Post management functionality
- Data validation
- Component rendering

## Recent Updates

- Migrated to local storage for improved performance
- Added comprehensive form validation
- Implemented unit testing
- Improved error handling
- Added loading states
- Centralized post management in custom hook

## Best Practices

- **TypeScript**: Strict type checking enabled
- **Error Handling**: Comprehensive error states and user feedback
- **Testing**: Unit tests for critical functionality
- **Performance**: Optimized rendering with proper state management
- **Accessibility**: ARIA labels and semantic HTML
- **Responsive Design**: Mobile-first approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.