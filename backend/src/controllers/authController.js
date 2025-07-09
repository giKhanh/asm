const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { GOVAA_CONFIG } = require('../constants');


const govaaAuth = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !email.endsWith('.gov.sg') || password !== GOVAA_CONFIG.PASSWORD) {
            return res.status(403).json({
                success: false,
                message: 'Invalid GOVAA credentials. Use any .gov.sg email with password: password123'
            });
        }

        const name = email.split('@')[0].replace('.', ' ').split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        const existingUser = await User.findOne({ govaaEmail: email });

        if (existingUser) {
            if (!existingUser.isActive) {
                return res.status(403).json({
                    success: false,
                    message: 'Account is deactivated'
                });
            }

            existingUser.lastLoginAt = new Date();
            await existingUser.save();

            const token = generateToken(existingUser);

            return res.json({
                success: true,
                message: 'Login successful',
                token: token,
                data: { user: existingUser }
            });
        } else {
            return res.json({
                success: true,
                message: 'GOVAA authentication successful - please complete registration',
                needsRegistration: true,
                govaaUser: {
                    name: name,
                    email: email
                }
            });
        }
    } catch (error) {
        console.error('GOVAA auth error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const register = async(req, res) => {
    try {
        const { govaaName, govaaEmail, contactEmail, agency, jobDescription, acceptedTerms } = req.body;

        if (!govaaName || !govaaEmail || !contactEmail || !agency || !jobDescription || !acceptedTerms) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ govaaEmail: govaaEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Account already exists. Please login instead.'
            });
        }

        const newUser = new User({
            name: govaaName,
            govaaEmail: govaaEmail,
            contactEmail: contactEmail,
            agency: agency,
            jobDescription: jobDescription,
            acceptedTerms: acceptedTerms
        });

        await newUser.save();

        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token: token,
            data: { user: newUser }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !email.endsWith('.gov.sg') || password !== GOVAA_CONFIG.PASSWORD) {
            return res.status(401).json({
                success: false,
                message: 'Invalid GOVAA credentials'
            });
        }

        const user = await User.findOne({ govaaEmail: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No SurveySG account found. Please register first.'
            });
        }


        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Account is deactivated'
            });
        }

        user.lastLoginAt = new Date();
        await user.save();

        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            data: { user: user }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const logout = (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Logout successful. Please remove token from client.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const getAuthStatus = async(req, res) => {
    try {
        if (req.user) {
            const user = await User.findById(req.user.id);

            if (!user || !user.isActive) {
                return res.json({
                    success: true,
                    authenticated: false
                });
            }

            res.json({
                success: true,
                authenticated: true,
                data: { user: user }
            });
        } else {
            res.json({
                success: true,
                authenticated: false
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    govaaAuth,
    register,
    login,
    logout,
    getAuthStatus
};