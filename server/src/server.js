// Import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectionDB = require('./db/db.js');
const { userRouter } = require('./router/user.route.js');
const { userOtpRouter } = require('./router/userOtp.route.js');
const { errorMiddleware } = require('./middlewares/error.middleware.js');

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  methods: 'GET, POST, PUT',
  credentials: true,
}));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/users/otp', userOtpRouter);
app.use(errorMiddleware);

// Database connection
const port = process.env.PORT || 3000;
connectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
