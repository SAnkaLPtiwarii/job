const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendEmailOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify your email',
        text: `Your OTP for email verification is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email OTP sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email OTP to ${email}:`, error);
        throw error;
    }
};

