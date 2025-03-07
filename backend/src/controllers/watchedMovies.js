const db = require('../db/config');

const markAsWatched = async (req, res) => {
  try {
    const connection = await db;
    const userId = req.userId;
    const { movie_id } = req.body;

    console.log('🔹 UserID:', userId);
    console.log('🔹 MovieID:', movie_id);

    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id is required' });
    }
    const [movieExists] = await connection.query(
      `SELECT id FROM movies WHERE id = ?`, [movie_id]
    );

    if (movieExists.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const checkQuery = `SELECT * FROM users_watched_movies WHERE user_id = ? AND movie_id = ?`;
    const [existingRecord] = await connection.query(checkQuery, [userId, movie_id]);

    if (existingRecord.length > 0) {
      return res.status(400).json({ error: 'Movie already marked as watched' });
    }
    const insertQuery = `INSERT INTO users_watched_movies (user_id, movie_id) VALUES (?, ?)`;
    await connection.query(insertQuery, [userId, movie_id]);

    console.log('✅ Movie marked as watched successfully');
    res.status(201).json({ message: 'Movie marked as watched successfully' });

  } catch (error) {
    console.error(' Error at trying to insert data on watched:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
};

module.exports = { markAsWatched };
