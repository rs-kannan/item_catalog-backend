const sendToken = (user, statusCode, res) => {
  ///creating JWT Token
  const token = user.getJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
