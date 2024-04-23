const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userOtpVerificationSchema = new mongoose.Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

userOtpVerificationSchema.pre("save", async function(next) {
    if (!this.isModified('otp')) return next();

    this.otp = await bcrypt.hash(this.otp, 10);
    next();
});

// Custom methods 
userOtpVerificationSchema.methods.isOtpCorrect = async function (plainOtp) {
    return await bcrypt.compare(plainOtp, this.otp);
};

const UserOtpVerification = mongoose.model('UserOtpVerification', userOtpVerificationSchema);

module.exports = {UserOtpVerification}


