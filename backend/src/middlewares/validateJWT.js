const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const validateJwt = async (req, res, next) => {
  console.log("running validateJwt...");

  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("invalid token");
    return res.status(401).json({ error: 'Unauthorized, token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT256);
    req.userId = decodedToken.id;
    console.log("valid token, user created successfully");
    next();
  } catch (error) {
    console.log("invalid token");
    return res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = validateJwt;
