const { AGENCIES } = require('../constants');

const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const isGovEmail = (email) => {
    return email && email.endsWith('.gov.sg');
};

const isValidAgency = (agency) => {
    return AGENCIES.includes(agency);
};

const validateGovaaLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email'
        });
    }
    if (!isGovEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Must use government email (.gov.sg)'
        });
    }

    next();
};

const validateRegistration = (req, res, next) => {
    const { govaaName, govaaEmail, contactEmail, agency, jobDescription, acceptedTerms } = req.body;

    if (!govaaName || !govaaEmail || !contactEmail || !agency || !jobDescription || acceptedTerms === undefined) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    if (!isValidEmail(contactEmail)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid contact email'
        });
    }

    if (!isValidAgency(agency)) {
        return res.status(400).json({
            success: false,
            message: 'Please select a valid agency'
        });
    }

    if (jobDescription.length < 10 || jobDescription.length > 500) {
        return res.status(400).json({
            success: false,
            message: 'Job description must be between 10-500 characters'
        });
    }

    if (acceptedTerms !== true) {
        return res.status(400).json({
            success: false,
            message: 'You must accept the terms and conditions'
        });
    }

    next();
};

module.exports = {
    AGENCIES,
    validateGovaaLogin,
    validateRegistration
};