const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { sendEmailOTP } = require('../services/otpService');


// controllers/authController.js


const { sendEmailOTP } = require('../services/emailService');

exports.signup = async (req, res) => {
    console.log('Signup process started');
    try {
        const { name, phone, companyName, companyEmail, employeeSize } = req.body;
        console.log('Received data:', { name, phone, companyName, companyEmail, employeeSize });

        const existingUser = await User.findOne({ companyEmail });
        if (existingUser) {
            console.log('User already exists:', companyEmail);
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        const user = new User({ name, phone, companyName, companyEmail, employeeSize });
        const emailOTP = Math.floor(100000 + Math.random() * 900000).toString();
        user.emailOTP = emailOTP;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();
        console.log('User saved successfully:', user._id);

        const emailSent = await sendEmailOTP(companyEmail, emailOTP);

        let responseMessage = 'User registered successfully.';
        if (emailSent) {
            responseMessage += ' Please check your email for the OTP.';
        } else {
            responseMessage += ' There was an issue sending the OTP email. Please use the OTP provided in the response for verification.';
        }

        res.status(201).json({
            message: responseMessage,
            userId: user._id,
            otp: process.env.NODE_ENV !== 'production' ? emailOTP : undefined
        });
    } catch (error) {
        console.error('Error in signup process:', error);
        res.status(500).json({ message: 'An error occurred during registration. Please try again.' });
    }
};