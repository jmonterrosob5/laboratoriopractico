const db = require('../models/db');

const createTask = async (req, res) => {
  const { user_id, title, description } = req.body;
  try {
    const result = await db.query('INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *', [user_id, title, description]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTasksByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createTask, getTasksByUser, updateTaskStatus };
