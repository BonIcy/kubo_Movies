const db = require('../db/config');

const updateData = async (req, res) => {
    const { table, id } = req.params;
    const data = req.body;

    if (!table) {
      return res.status(400).json({ error: 'the table name is required' });
    }
    if (!id) {
      return res.status(400).json({ error: 'the id is required' });
    }
    if (!data) {
      return res.status(400).json({ error: 'the data to update is required' });
    }
    const query = `UPDATE ${table} SET ? WHERE id = ?`;
  
    try {
      const connection = await db; 
      const result = await connection.query(query, [data, id]); 
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: `Element with id ${id} not found` });
        return;
      }
      res.status(200).json({ message: `element updated successfully on ${table}` });
    } catch (error) {
      console.error(`error updating data on:  ${table}:`, error);
      res.status(500).json({ error: `error trying to update an element on: ${table}` });
    }
  };
  
  module.exports = { updateData };
  