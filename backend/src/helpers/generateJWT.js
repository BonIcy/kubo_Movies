const jwt = require('jsonwebtoken');
const generateJWT = (id, rolId) => {
  return new Promise((resolve, reject) => {
    const payload = { id, rolId };
    jwt.sign(payload, process.env.JWT256, {
      expiresIn: '10h',
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('The token can not be generated');
      } else {
        resolve(token);
      }
    });
  });
};
module.exports = generateJWT