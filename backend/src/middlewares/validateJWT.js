const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv');
dotenv.config();
const validateJwt = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT256);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }
};
module.exports = validateJwt