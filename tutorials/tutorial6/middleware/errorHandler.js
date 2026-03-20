const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "A user with this email already exists."
    });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((value) => value.message);

    return res.status(400).json({
      success: false,
      message: messages.join(" ")
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error."
  });
};

module.exports = errorHandler;
