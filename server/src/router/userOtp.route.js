const express = require('express');
const Router = express.Router(); 

const  { verifyEmail ,verifyOtp,resendOtpVerificationCode}=require('../controllers/userOtp.controller')

Router.post('/verifyEmail',verifyEmail)
Router.post('/verifyOtp',verifyOtp)
Router.post('/resendOtpVerificationCode',resendOtpVerificationCode)

module.exports = { userOtpRouter :Router }