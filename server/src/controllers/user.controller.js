const { User } = require("../models/user.model");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const bcrypt = require("bcrypt");

const generateAccessAndRefreshToken = async (userId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Store refreshToken in the database directly
    await User.updateOne({ _id: userId }, { $set: { refreshToken } });
    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(500, `Tokens generation error: ${error.message}`);
  }
};

const register = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, phone, dob, gender, password } =
      req.body;

    if (
      [firstName, lastName, email, phone, dob, gender, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(500, "User with email already exists");
    }

    console.log("requested file from multer", req.file);
    const avatarLocalPath = req?.file ? req?.file?.path || null : null;
    // console.log(req?.file?.path);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      avatar: avatarLocalPath,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(200, { createdUser }, "User registered Successfully")
      );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "Please enter a username or email.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not found. Please register.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findOne(user._id).select(  "-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  // console.log("accessToken:",accessToken);
  // console.log("refreshToken:",refreshToken);
  
  res
    .status(200)
    .cookie("accessToken", accessToken, { ...options, expiresIn: "7d" })
    .cookie("refreshToken", refreshToken, { ...options, expiresIn: "7d" })
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser,accessToken ,refreshToken},
        "Login successful"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { userId, password, confirmPassword } = req.body;
  if (!userId || !password || !confirmPassword) {
    throw new ApiError(
      400,
      "Please provide userId, password, and confirmPassword."
    );
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and confirmPassword must match.");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  user.password = password;

  try {
    await user.save();
    res
      .status(200)
      .json(new ApiResponse(200, { user }, "Password updated successfully."));
  } catch (error) {
    console.error("Error updating password:", error);
    throw new ApiError(500, "Error updating password.");
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken ||  req.header("Authorization")?.replace("Bearer ", "") ||  req.body.refreshToken;
    if(!incomingRefreshToken){
      throw new ApiError(401,"unauthorized access")
    }
    const decoded = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if(!user){
      throw new ApiError(401,"invalid refresh token")
    }
    if(incomingRefreshToken !== user.refreshToken){
      throw new ApiError(401,"refresh token is expired or used")
    }

    //generateAccessAndRefreshToken pn kari shkai
    const accessToken = user.generateAccessToken();

    if (accessToken) {
      const options = {
        httpOnly: true,
        secure: true,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Assuming this is defined somewhere
      };
      
      return res.status(200)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, {accessToken}, "Login successful"));
    } else {
      throw new ApiError(500, "Error refreshing access token");
    }
  } catch (error) {
    throw new ApiError(500, error?.message || "Error refreshing access token");
  }
});

module.exports = { register, login, logout, resetPassword };
