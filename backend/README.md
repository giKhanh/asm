# SurveySG Backend (Simple Edition)

A super-light backend demo for SurveySG. Just the basics – no fluff.

## 🚀 What's Inside

• GOVAA mock login  
• User sign-up & login  
• JWT authentication  
• MongoDB with Mongoose  
• Jest testing with 80% coverage
• Docker support

## 🛠 Quick Start

```bash
# 1. Install deps
cd backend
npm install

# 2. Create .env file (see example below)
# 3. Start MongoDB (locally or via Docker)
# 4. Run the server
npm start
```

## 🔧 Development Scripts

```bash
npm start              # Production server
npm run dev            # Development with nodemon
npm test               # Run all tests
npm run test:watch     # Test watch mode  
npm run test:coverage  # Coverage report (target: 80%)
```

## 📦 Environment Setup

Create `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/surveysg
JWT_SECRET=your_secret_key
GOVAA_MOCK_EMAIL=test@agency.gov.sg
GOVAA_MOCK_PASSWORD=password123
```

## 🐳 Docker Usage

### Option 1: Full Stack with Docker Compose

```bash
# Starts MongoDB + Backend + Mongo Express UI
docker-compose up -d

# Access:
# - Backend API: http://localhost:3000
# - Mongo Express: http://localhost:8081
```

### Option 2: Backend Only

```bash
# Build & run just the backend
docker build -t surveysg-backend .
docker run -p 3000:3000 surveysg-backend
```

## 📚 Main Endpoints

| Method | Path | Notes |
| ------ | ---- | ----- |
| GET    | /health                  | Ping server |
| POST   | /api/auth/govaa          | GOVAA mock check |
| POST   | /api/auth/register       | Create account |
| POST   | /api/auth/login          | Login |
| POST   | /api/auth/logout         | Logout |
| GET    | /api/auth/status         | Check session |
| GET    | /api/user/agencies       | List agencies |
| GET    | /api/user/profile        | Needs login |

## 🧪 Testing

```bash
npm test               # Run all tests
npm run test:watch     # Watch mode for development
npm run test:coverage  # Generate coverage report
```

**Coverage targets**: 80% for branches, functions, lines, and statements.

Test files located in `tests/` directory with setup in `tests/setup.js`.

## 🧩 Folder Map

```
backend/
  src/
    app.js              # Express app
    server.js           # Server entry point
    models/User.js      # Mongoose model
    routes/             # API routes
    controllers/        # Logic
    middleware/         # Validation & auth
    utils/              # JWT utilities
    constants/          # App constants
    config/             # Database config
  tests/                # Jest test files
  docker-compose.yml    # Full stack Docker setup
  Dockerfile           # Backend container
  jest.config.js       # Test configuration
```

## 🖥 Tech Stack

• Node.js + Express  
• MongoDB + Mongoose  
• JWT authentication
• Jest testing framework
• Docker & Docker Compose
• Nodemon for development

## 🔒 Security Features

• JWT token authentication
• Input validation middleware
• Government email validation (.gov.sg)
• Non-root Docker user
• CORS protection

## 🎉 That's it

Simple but complete! Run it and start building.
