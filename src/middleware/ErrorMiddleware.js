const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  // Wrong MongoDB Id error
  if (err.name === 'CastError') {
    const message = `Resource not found.`
    err = new ErrorHandler(message, 404) // 404 Not Found for invalid resource
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(message, 400) // 400 Bad Request for duplicate key
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid credentials, please try again'
    err = new ErrorHandler(message, 401) // 401 Unauthorized for invalid token
  }

  // JWT Expire error
  if (err.name === 'TokenExpiredError') {
    const message = 'Invalid credentials, please try again'
    err = new ErrorHandler(message, 401) // 401 Unauthorized for expired token
  }

  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
  })
}
