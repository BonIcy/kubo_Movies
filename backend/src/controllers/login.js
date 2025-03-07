const db = require('../db/config');
const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/generateJWT');

const login = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: 'Data required' });
  }

  const { email, password } = req.body;

  try {
    const connection = await db;
    const [user] = await connection.query('SELECT id, email, password FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(400).json({ msg: 'User with this email address not found' });
    }

    const validPassword = bcrypt.compareSync(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const token = await generateJWT(user[0].id, null);

    return res.json({
      msg: 'Login successfully',
      token,
      userEmail: user[0].email
    });

  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { login };
