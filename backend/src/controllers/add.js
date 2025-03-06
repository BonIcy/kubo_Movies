const db = require('../db/config');

const postData = async (req, res) => {
  const { table } = req.params;
  const data = req.body;

  if (!table) {
    return res.status(400).json({ error: 'table name is required' });
  }

  if (!data) {
    return res.status(400).json({ error: 'insert data is required to post' });
  }

  try {
    const connection = await db; 
    const query = `INSERT INTO ${table} SET ?`;
    const result = await connection.query(query, data);
    res.status(200).json({ message: `data inserted successfully in ${table}` });
  } catch (error) {
    console.log(`Error at trying to inserrt data on ${table}`);
    res.status(400).json({ error: 'error in inserting data' });
  }
};

module.exports = { postData };