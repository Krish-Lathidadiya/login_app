//models
const {User} = require("../models/user.model");
const {UserOtpVerification} = require("../models/userOtp.model.js");
//utils
const {transporter}=require('../utils/nodemailer.js')
//middleware
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

const sendOtpVerifiedEmail = async (userId, email) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "verify your email",
            html: `<p> Enter <b>OTP</b> in the app to verify your email address and complete the verification</p>
                  <p> this code expire in 1 hour</p>`
        };

        const newOtpVerification = new UserOtpVerification({
            userId: userId,
            otp,
            createdAt: Date.now(),
            expireAt: Date.now() + 3600000
        });

        await newOtpVerification.save();
        const info = await transporter.sendMail(mailOptions);
        // console.log(info.messageId)

        return {
            userId: userId,
            email: email,
            otp: otp,
        };
    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "Error sending verification email with OTP");
    }
};

const verifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new ApiError(404, "email not found");
    }
    
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(500, "invalid email address");
    }

    try {
        const responseData = await sendOtpVerifiedEmail(user._id, user.email);
        res.status(200).json(new ApiResponse(200, { responseData }, "Verification email with OTP sent successfully"));

    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "Error sending verification email with OTP");
    }
});


const verifyOtp = asyncHandler(async (req, res) => {
    try {

        const { userId, otp } = req.body;
        if (!userId || !otp) {
            throw new ApiError(404, "user and otp not found");
        }

        const UserOtpVerificationRecord = await UserOtpVerification.findOne({ userId});
        if (!UserOtpVerificationRecord) {
            throw new ApiError(500, "record not found");
        }

        const { expireAt, otp: hashOtp } = UserOtpVerificationRecord;

        if (expireAt < Date.now()) {
            // console.log(true);
            await UserOtpVerification.deleteMany({ hashOtp });
            throw new ApiError(400, "code has expired, please request again");
        }

        const validOtp = await UserOtpVerificationRecord.isOtpCorrect(otp);
        if (validOtp) {

        await UserOtpVerification.deleteMany({ userId });
        res.status(200).json(new ApiResponse(200, {}, "email verified successfully"));

        }else{
            throw new ApiError(500, "invalid otp passed, check your inbox");

        }

    } catch (error) {
        console.log(error.message);
        throw new ApiError(500, "verify otp failed");
    }
});


const resendOtpVerificationCode = asyncHandler(async (req, res) => {

        const { userId, email } = req.body;
        if (!userId || !email) {
            throw new ApiError(500, "user not found");
        }

        //if exist old record it delete and generate new record
        await UserOtpVerification.deleteMany({ userId });

        try {
            const responseData = await sendOtpVerifiedEmail(userId, email);
            res.status(200).json(new ApiResponse(200, { responseData }, "Verification email with OTP sent successfully"));
        } catch (error) {
            throw new ApiError(500, "Verification email with OTP sent failed")
        }

    
});

module.exports = { verifyEmail ,verifyOtp,resendOtpVerificationCode};
