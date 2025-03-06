const db = require('../db/config');

const deleteData = async (req, res, table) => {
    const { id } = req.params;
    const query = `DELETE FROM ${table} WHERE id = ?`;
  
    try {
      const connection = await db; 
      const results = await connection.query(query, [id]); 
  
      if (results.affectedRows === 0) {
        res.status(404).json({ error: `Element with id ${id} not found` });
        return;
      }
  
      res.json({ message: `Element with Id ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error trying to delete on ${table}:`, error);
      res.status(500).json({ error: `Error trying to delete on ${table}` });
    }
  };
  
  module.exports = { deleteData };