const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    employeeSize: { type: Number, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailOTP: String,
    otpExpiry: Date,
}, { timestamps: true });  // Add this line to include createdAt and updatedAt fields

// Add a pre-save hook to handle potential duplicate key errors
userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (user.isNew) {
            const existingUser = await mongoose.model('User').findOne({ companyEmail: user.companyEmail });
            if (existingUser) {
                throw new Error('Company email already exists');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);