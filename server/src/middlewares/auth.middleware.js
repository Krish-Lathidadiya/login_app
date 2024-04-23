//bramahastra
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

///check user valid or not (means login or not)
const veriftJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("Token:", token);
    if (!token) {
      throw new ApiError(400, "Unauthorized access request");
    }
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(400, "Invalid access token");
    }
    //valid user
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Log the error for debugging
    throw new ApiError(500, error?.message || "JWT verification error");
  }
});

module.exports = {veriftJwt}