# Frontend - React Authentication App

A React-based frontend application with government agency authentication system, built with Vite for fast development.

## 🚀 Features

- **Government Agency Authentication**: Login using @agency.gov.sg email addresses
- **User Registration**: Sign up with agency details
- **Profile Management**: View and manage user profiles
- **JWT Authentication**: Secure token-based authentication
- **Responsive Design**: Works on desktop and mobile
- **Testing**: Comprehensive test suite with Jest

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Jest** - Testing framework
- **Babel** - JavaScript compiler
- **ESLint** - Code linting
- **Docker** - Containerization

## 📦 Installation

1. **Install dependencies**:

```bash
npm install
```

2. **Start development server**:

```bash
npm run dev
```

3. **Open your browser** and go to `http://localhost:5173`

## 🧪 Testing

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── layout/         # Layout components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API service functions
├── constants/          # App constants
└── utils/              # Utility functions

tests/                  # Test files
```

## 🔑 Key Pages

- **Login Page** (`/login`) - Government agency login
- **Register Page** (`/register`) - New user registration
- **Home Page** (`/`) - Dashboard/welcome page
- **Profile Page** (`/profile`) - User profile management

## 🐳 Docker Usage

Build the Docker image:

```bash
docker build -t surveysg-frontend .
```

Run the container:

```bash
docker run -p 8080:80 surveysg-frontend
```

Or use the convenience scripts:

```bash
npm run docker:build    # Build image
npm run docker:run      # Run container
npm run docker:stop     # Stop container
npm run docker:clean    # Remove container
```

## 🔗 Backend Integration

This frontend connects to a Node.js backend API. Make sure the backend is running for full functionality.

Default API endpoint: `http://localhost:5000`

## 📝 Environment Setup

The app expects a backend API to be running. Update the API base URL in `src/services/api.js` if needed.

## 🧑‍💻 Development

1. The app uses React Context for state management
2. Authentication is handled via JWT tokens
3. All API calls go through the `api.js` service
4. Components are tested with Jest and React Testing Library

## 🚀 Deployment

1. Build the production version:

```bash
npm run build
```

2. The `dist/` folder contains the production-ready files

3. Deploy using any static hosting service (Netlify, Vercel, etc.)

## 📋 Requirements

- Node.js 16+
- npm 8+
- Modern web browser
- Backend API running (for full functionality)
