const db = require('../db/config');

const getData = async (req, res, table) => {
  try {
    const connection = await db; 
    const query = `SELECT * FROM ${table}`;
    const results = await connection.query(query);

    res.json(results);
  } catch (error) {
    console.log(`Error trying to get table data from ${table}:`, error);
    res.status(500).json({
      error: `Error trying to consult the db for ${table}`,
    });
  }
};

module.exports = { getData };