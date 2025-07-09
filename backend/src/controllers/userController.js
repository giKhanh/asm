const User = require('../models/User');
const { AGENCIES } = require('../constants');

const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            data: {
                user: user
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

const getAgencies = (req, res) => {
    res.json({
        success: true,
        data: {
            agencies: AGENCIES
        }
    });
};

module.exports = {
    getProfile,
    getAgencies
};