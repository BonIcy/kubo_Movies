const db = require('../db/config');

const filterMovies = async (req, res) => {
  try {
    const connection = await db;
    
    let { page = 1, limit = 10, title, category_id, order = 'desc' } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    order = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    let query = `
      SELECT m.id, m.tittle, m.description, m.release_date, c.name AS category
      FROM movies m
      JOIN categories c ON m.category_id = c.id
      WHERE 1 = 1
    `;

    if (title) {
      query += ` AND m.tittle LIKE '%${title}%'`;
    }

    if (category_id) {
      query += ` AND m.category_id = ${category_id}`;
    }

    query += ` ORDER BY m.release_date ${order}`;

    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const results = await connection.query(query);
    res.json(results);
  } catch (error) {
    console.log('Error getting movies:', error);
    res.status(500).json({ error: 'Error retrieving movies' });
  }
};

module.exports = { filterMovies };
