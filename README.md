# SurveySG - Fullstack Application

A complete fullstack application with React frontend and Node.js backend, featuring government agency authentication system.

## 📋 Project Overview

This project consists of two main parts:

- **Backend**: Super-light Node.js API with GOVAA mock authentication
- **Frontend**: React-based web application with government agency authentication

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- MongoDB
- npm 8+

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env   # Configure your environment variables

# Start backend server (needs MongoDB!)
npm start
```

**Backend .env example:**

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/surveysg
JWT_SECRET=your_secret_key
GOVAA_MOCK_EMAIL=test@agency.gov.sg
GOVAA_MOCK_PASSWORD=password123
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗️ Architecture

```
assignment/
├── backend/              # Node.js API Server (Simple Edition)
│   ├── src/
│   │   ├── app.js           # Express app
│   │   ├── models/User.js   # Mongoose model
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Logic
│   │   └── middleware/      # Validation & auth
│   └── tests/               # Backend tests
├── frontend/             # React Authentication App
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   └── layout/      # Layout components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── services/        # API service functions
│   │   ├── hooks/           # Custom React hooks
│   │   ├── constants/       # App constants
│   │   └── utils/           # Utility functions
│   └── tests/               # Frontend tests
└── README.md            # This file
```

## 🔑 Key Features

### Backend Features

- **GOVAA Mock Login**: Government agency authentication simulation
- **User Sign-up & Login**: Complete user management system
- **MongoDB with Mongoose**: Data persistence layer
- **JWT Authentication**: Secure token-based auth

### Frontend Features

- **Government Agency Authentication**: Login using @agency.gov.sg email addresses
- **User Registration**: Sign up with agency details
- **Profile Management**: View and manage user profiles
- **JWT Authentication**: Secure token-based authentication
- **Responsive Design**: Works on desktop and mobile
- **Comprehensive Testing**: Test suite with Jest

## 📚 API Endpoints

| Method | Path | Notes |
| ------ | ---- | ----- |
| GET    | /health                     | Ping server |
| POST   | /api/auth/govaa             | GOVAA mock check |
| POST   | /api/auth/register          | Create account |
| POST   | /api/auth/login             | Login |
| POST   | /api/auth/logout            | Logout |
| GET    | /api/auth/status            | Check session |
| GET    | /api/user/agencies          | List agencies |
| GET    | /api/user/profile           | Needs login |

## 🔗 Key Frontend Pages

- **Login Page** (`/login`) - Government agency login
- **Register Page** (`/register`) - New user registration  
- **Home Page** (`/`) - Dashboard/welcome page
- **Profile Page** (`/profile`) - User profile management

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## 🐳 Docker Support

### Backend

```bash
cd backend
docker build -t surveysg-backend .
docker run -p 3000:3000 surveysg-backend
```

### Frontend

```bash
cd frontend
# Build Docker image
docker build -t surveysg-frontend .

# Run container
docker run -p 8080:80 surveysg-frontend

# Or use convenience scripts
npm run docker:build    # Build image
npm run docker:run      # Run container
npm run docker:stop     # Stop container
npm run docker:clean    # Remove container
```

### Docker Compose

## 🛠️ Tech Stack

### Backend

- Node.js + Express
- MongoDB + Mongoose  
- JWT authentication
- Jest (testing)

### Frontend

- React 18
- Vite (build tool and dev server)
- Jest + React Testing Library
- Babel (JavaScript compiler)
- ESLint (code linting)
- Docker

## 🔧 Development Commands

### Backend

```bash
npm start          # Start server
npm test           # Run tests
npm run dev        # Development mode
```

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests
npm run lint       # Run ESLint
```

## 🚀 Deployment

### Frontend Deployment

1. **Build the production version**:

```bash
cd frontend
npm run build
```

2. **The `dist/` folder contains production-ready files**

3. **Deploy using any static hosting service** (Netlify, Vercel, etc.)

### Backend Deployment

- Backend is ready for deployment
- Configure environment variables appropriately
- Ensure MongoDB connection is set up

## 🔗 Backend Integration

The frontend connects to the Node.js backend API. Make sure the backend is running for full functionality.

**Default API endpoint**: `http://localhost:5000`

Update the API base URL in `src/services/api.js` if needed.

## 📝 Environment Variables

### Production Setup

Make sure to configure proper environment variables:

- Database connection strings
- JWT secrets  
- API endpoints
- Authentication credentials

## 🧑‍💻 Development Notes

1. **Frontend**: Uses React Context for state management
2. **Authentication**: Handled via JWT tokens  
3. **API Calls**: All go through the `api.js` service
4. **Testing**: Components tested with Jest and React Testing Library
5. **Backend**: Super-light design with just the basics

## 📋 Requirements

- Node.js 16+
- npm 8+
- Modern web browser
- MongoDB (for backend)
- Backend API running (for full frontend functionality)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes  
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is part of an assignment/interview process.

---

**Note**: This is a demonstration project showcasing fullstack development skills with modern web technologies.
