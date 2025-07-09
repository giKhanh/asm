# SurveySG Backend (Simple Edition)

A super-light backend demo for SurveySG. Just the basics – no fluff.

## 🚀 What's Inside

• GOVAA mock login  
• User sign-up & login  
• Session auth (cookie)  
• MongoDB with Mongoose  

## 🛠 Quick Start

```bash
# 1. Install deps
cd backend
npm install

# 2. Copy .env example
cp .env.example .env   # or create it manually – see below

# 3. Run (needs MongoDB!)
npm start
```

`.env` example:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/surveysg
SESSION_SECRET=change_me
GOVAA_MOCK_EMAIL=test@agency.gov.sg
GOVAA_MOCK_PASSWORD=password123
```

## 📚 Main Endpoints

| Method | Path | Notes |
| ------ | ---- | ----- |
| GET    | /health                  | Ping server |
| POST   | /api/auth/govaa          | GOVAA mock check |
| POST   | /api/auth/set-govaa-session | Save GOVAA info to session |
| POST   | /api/auth/register       | Create account |
| POST   | /api/auth/login          | Login |
| POST   | /api/auth/logout         | Logout |
| GET    | /api/auth/status         | Check session |
| GET    | /api/user/agencies       | List agencies |
| GET    | /api/user/profile        | Needs login |

## 🧩 Folder Map

```
backend/
  src/
    app.js            # Express app
    models/User.js    # Mongoose model
    routes/           # API routes
    controllers/      # Logic
    middleware/       # Validation & auth
```

## 🖥 Tech Stack

• Node.js + Express  
• MongoDB + Mongoose  
• express-session  

## 🎉 That's it

Run it
