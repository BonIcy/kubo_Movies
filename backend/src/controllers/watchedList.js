const db = require('../db/config');

const getWatchedList = async (req, res) => {
  try {
    const connection = await db;

    const query = `
      SELECT 
        u.id AS user_id,
        u.name AS user_name,
        m.id AS movie_id,
        m.tittle AS movie_title,
        m.description AS movie_description,
        c.name AS category_name,
        uwm.watched_at
      FROM users_watched_movies uwm
      JOIN users u ON uwm.user_id = u.id
      JOIN movies m ON uwm.movie_id = m.id
      JOIN categories c ON m.category_id = c.id
      ORDER BY uwm.watched_at DESC
    `;

    const [results] = await connection.query(query);

    const usersMap = {};

    results.forEach((row) => {
      if (!usersMap[row.user_id]) {
        usersMap[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          watched_movies: []
        };
      }

      usersMap[row.user_id].watched_movies.push({
        movie_id: row.movie_id,
        title: row.movie_title,
        description: row.movie_description,
        category: row.category_name,
        watched_at: row.watched_at
      });
    });

    const watchedList = Object.values(usersMap);
    res.json(watchedList);
  } catch (error) {
    console.error('Error fetching watched list:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
};

module.exports = { getWatchedList };
