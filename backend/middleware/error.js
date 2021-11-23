const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Mongoose Duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong Jwt error
  if (err.name === `JsonWebTokenError`) {
    const message = `Json web Token is invalid , Try again`;
    err = new ErrorHandler(message, 400);
  }

  // Jwt expire error
  if (err.name === `TokenExpiredError`) {
    const message = `Json token Expired ,Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};
