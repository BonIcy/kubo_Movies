const db = require('../db/config');

const getNewMovies = async (req, res) => {
  try {
    const connection = await db;
    

    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    const formattedDate = threeWeeksAgo.toISOString().split('T')[0]; 

    const query = `
      SELECT m.id, m.tittle, m.description, m.release_date, c.name AS category
      FROM movies m
      JOIN categories c ON m.category_id = c.id
      WHERE m.release_date >= ?
      ORDER BY m.release_date DESC
    `;

    const [results] = await connection.query(query, [formattedDate]);

    res.json(results);
  } catch (error) {
    console.error('Error getting new movies:', error);
    res.status(500).json({ error: 'Error retrieving new movies' });
  }
};

module.exports = { getNewMovies };
