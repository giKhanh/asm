const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/agencies',
    userController.getAgencies
);

router.get('/profile',
    requireAuth,
    userController.getProfile
);

module.exports = router;