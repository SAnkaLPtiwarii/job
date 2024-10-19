const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', async (req, res, next) => {
    try {
        await authController.signup(req, res);
    } catch (error) {
        next(error); // Pass any errors to the global error handler
    }
});

module.exports = router;