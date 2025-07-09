require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

connectDB();

const localhostRegex = /^http:\/\/localhost:\d+$/;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (localhostRegex.test(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'SurveySG Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

app.use((error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: 'Server error'
    });
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;