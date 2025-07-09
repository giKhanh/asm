const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        govaaEmail: user.govaaEmail,
        agency: user.agency
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken
};