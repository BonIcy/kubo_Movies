const db = require('../db/config');
const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/generateJWT');

const register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: 'Data required' });
  }

  const { name, email, password } = req.body;

  try {
    const connection = await db;


    const [existingUser] = await connection.query('SELECT email FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const result = await connection.query(query, [name, email, hashedPassword]);

    if (result.affectedRows === 1) {
      const token = await generateJWT(result.insertId, null); 

      return res.status(201).json({
        msg: 'User created successfully',
        token
      });
    }

    return res.status(500).json({ msg: 'Error creating user' });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { register };