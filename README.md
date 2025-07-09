# SurveySG - Fullstack Application

A complete fullstack application with React frontend and Node.js backend, featuring government agency authentication system.

## 📋 Project Overview

This project consists of two main parts:
- **Frontend**: React-based web application with modern UI
- **Backend**: Node.js API with MongoDB database

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

# Start backend server
npm start
```

**Backend .env example:**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/surveysg
SESSION_SECRET=change_me
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
├── backend/              # Node.js API Server
│   ├── src/
│   │   ├── app.js           # Express application
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   └── middleware/      # Auth & validation
│   └── tests/               # Backend tests
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   ├── services/        # API services
│   │   └── hooks/           # Custom hooks
│   └── tests/               # Frontend tests
└── README.md            # This file
```

## 🔑 Key Features

### Backend Features
- **GOVAA Mock Authentication**: Government agency login simulation
- **User Management**: Registration and authentication
- **Session Management**: Cookie-based sessions
- **MongoDB Integration**: Data persistence with Mongoose
- **API Endpoints**: RESTful API design

### Frontend Features
- **Modern React UI**: Built with React 18 and Vite
- **Government Authentication**: @agency.gov.sg email validation
- **Responsive Design**: Mobile and desktop optimized
- **Profile Management**: User profile handling
- **JWT Authentication**: Secure token-based auth

## 📚 API Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET    | /health                    | Server health check |
| POST   | /api/auth/govaa            | GOVAA authentication |
| POST   | /api/auth/set-govaa-session| Save GOVAA session |
| POST   | /api/auth/register         | User registration |
| POST   | /api/auth/login            | User login |
| POST   | /api/auth/logout           | User logout |
| GET    | /api/auth/status           | Check auth status |
| GET    | /api/user/agencies         | List agencies |
| GET    | /api/user/profile          | User profile (protected) |

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
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
docker build -t surveysg-frontend .
docker run -p 8080:80 surveysg-frontend
```

### Docker Compose
```bash
# Run both frontend and backend
docker-compose up
```

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- express-session
- Jest (testing)

### Frontend
- React 18
- Vite
- Jest + React Testing Library
- ESLint
- Babel

## 🔧 Development Commands

### Backend
```bash
npm start          # Start server
npm test           # Run tests
npm run dev        # Development mode
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview build
npm test           # Run tests
npm run lint       # Code linting
```

## 🚀 Deployment

1. **Build frontend for production**:
```bash
cd frontend
npm run build
```

2. **Backend is ready for deployment** - configure environment variables appropriately

3. **Deploy to your preferred hosting service** (Vercel, Netlify, Heroku, etc.)

## 📝 Environment Variables

Make sure to configure proper environment variables for production:
- Database connection strings
- Session secrets
- API endpoints
- Authentication credentials

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
