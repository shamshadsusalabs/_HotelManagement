
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
; // Logging the token received
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
    // Logging verification failure
      return res.sendStatus(403);
    }
   // Logging user details after verification
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
