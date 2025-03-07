const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const validateJwt = async (req, res, next) => {
  console.log("Ejecutando validateJwt...");

  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No se recibió un token o es inválido");
    return res.status(401).json({ error: 'Unauthorized, token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT256);
    req.userId = decodedToken.id;
    console.log("Token válido, usuario autorizado");
    next();
  } catch (error) {
    console.log("Token inválido");
    return res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = validateJwt;
