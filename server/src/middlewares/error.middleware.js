const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    // const extraDetails = err.extraDetails || 'No extra details available';
    const extraDetails = err.extraDetails;
  
    return res
      .status(status)
      .json({ message: message, extraDetails: extraDetails });
  };
  
  module.exports = { errorMiddleware };
  
  // const customError = {
  //   status: 400,
  //   message: "invalid",
  // };
  // next(customError);
  