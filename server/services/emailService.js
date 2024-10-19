// services/emailService.js

const nodemailer = require('nodemailer');

let transporter;

if (process.env.NODE_ENV === 'production') {
    // Production email configuration
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
} else {
    // Development email configuration
    // Still use Gmail, but with a try-catch to fallback to console logging
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
}

exports.sendEmailOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Your OTP for Email Verification",
        text: `Your OTP is: ${otp}`,
        html: `<b>Your OTP is: ${otp}</b>`,
    };

    try {
        if (process.env.NODE_ENV === 'production') {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: %s', info.messageId);
        } else {
            // In development, attempt to send, but fallback to console log
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Development mode - Email sent: %s', info.messageId);
            } catch (error) {
                console.log('Development mode - Email sending failed. Logging email content:');
                console.log('To:', email);
                console.log('Subject:', mailOptions.subject);
                console.log('OTP:', otp);
            }
        }
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// exports.sendJobAlert = async (candidateEmail, job) => {
//     const mailOptions = {
//         from: process.env.EMAIL_FROM,
//         to: candidateEmail,
//         subject: `New Job Opportunity: ${job.title}`,
//         html: `
//       <h1>New Job Opportunity</h1>
//       <h2>${job.title}</h2>
//       <p><strong>Company:</strong> ${job.company.companyName}</p>
//       <p><strong>Description:</strong> ${job.description}</p>
//       <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
//       <p><strong>Application Deadline:</strong> ${new Date(job.endDate).toLocaleDateString()}</p>
//       <p>To apply or learn more about this opportunity, please contact the company directly.</p>
//     `
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Job alert sent to ${candidateEmail}`);
//     } catch (error) {
//         console.error(`Error sending job alert to ${candidateEmail}:`, error);
//         throw error;
//     }
// };