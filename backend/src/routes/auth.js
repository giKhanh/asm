const express = require('express');
const authController = require('../controllers/authController');
const { validateGovaaLogin, validateRegistration } = require('../middleware/validation');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/govaa',
    validateGovaaLogin,
    authController.govaaAuth
);

router.post('/register',
    validateRegistration,
    authController.register
);

router.post('/login',
    validateGovaaLogin,
    authController.login
);

router.post('/logout',
    authController.logout
);

router.get('/status',
    optionalAuth,
    authController.getAuthStatus
);

module.exports = router;