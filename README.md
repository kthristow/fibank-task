# Fibank Task - Star Wars Characters App

A modern React application built with TypeScript, Vite, and Tailwind CSS that displays Star Wars characters from the SWAPI API with authentication, pagination, caching, and offline support.

## 🚀 Features

- **Authentication System**: Session-based authentication with protected routes
- **Form Validation**: React Hook Form with Zod schema validation
- **Data Fetching**: SWAPI integration for Star Wars character data
- **Pagination**: Navigate through paginated character lists
- **Caching**: LocalStorage-based caching (5-minute TTL) to reduce API calls
- **Offline Detection**: Graceful handling of network failures with user feedback
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Code Quality**: ESLint configuration with React and TypeScript rules

## 📦 Tech Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **React Router DOM 7.10** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first styling
- **React Hook Form 7.67** - Form state management
- **Zod 4.1** - Schema validation
- **ESLint** - Code linting

## 🏗️ Project Structure

```
src/
├── api/
│   └── api.ts                    # SWAPI API integration
├── assets/
│   └── offline.png               # Offline state illustration
├── components/
│   ├── common/
│   │   ├── Alert.tsx            # Reusable alert component
│   │   ├── Modal.tsx            # Modal dialog component
│   │   └── Spinner.tsx          # Loading spinner
│   ├── LoginForm.tsx            # Login form with validation
│   ├── Pagination.tsx           # Pagination controls
│   ├── PeopleTable.tsx          # Character data table
│   └── ProtectedRoute.tsx       # Route authentication guard
├── context/
│   ├── AuthContext.tsx          # Authentication provider
│   └── AuthContextDefinition.tsx # Auth context types
├── hooks/
│   ├── useAuth.ts               # Authentication hook
│   └── usePeopleTable.tsx       # Table data management hook
├── lib/
│   ├── cache.ts                 # LocalStorage cache utilities
│   └── validation.ts            # Zod validation schemas
├── pages/
│   ├── LoginPage.tsx            # Login page
│   └── PeopleTablePage.tsx      # Main table page
├── App.tsx                       # Root component with routing
├── main.tsx                      # Application entry point
└── index.css                     # Tailwind directives & global styles
```

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd fibank-task

# Install dependencies
npm install
```

## 🚀 Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

## 🏭 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧹 Linting

```bash
# Run ESLint
npm run lint
```

## 📝 Usage

1. **Login**: Enter any username and password (minimum 4 characters, maximum 30 characters)
2. **Browse Characters**: View paginated Star Wars character data
3. **Navigation**: Use Previous/Next buttons to navigate between pages
4. **Caching**: Data is automatically cached for 5 minutes to improve performance
5. **Offline Mode**: Try disconnecting your network - the app will display an offline modal
6. **Logout**: Click the logout button to end your session

## 🔑 Key Implementation Details

### Authentication

- Session-based authentication using `sessionStorage`
- Protected routes redirect unauthenticated users to login
- Auth state persists across page refreshes

### Caching Strategy

- 5-minute TTL for cached API responses
- Per-page caching using unique cache keys
- Automatic cache invalidation on expiry

### Form Validation

- Zod schemas for type-safe validation
- Real-time validation feedback
- Username and password: 4-30 characters

### Offline Handling

- Network status detection
- User-friendly offline modal with retry option
- Graceful degradation when API is unavailable

## 🎨 Styling

The application uses Tailwind CSS with a slate color palette:

- Background: `slate-50` to `slate-100`
- Primary text: `slate-700` to `slate-900`
- Accent: `blue-600` for interactive elements

## 📄 License

Private project for Fibank task demonstration.

## 👤 Author

Kaloyan Hristov
