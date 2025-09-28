const express = require('express');
const router = express.Router();
const { createTask, getTasksByUser, updateTaskStatus } = require('../controllers/taskController');

router.post('/', createTask);
router.get('/:userId', getTasksByUser);
router.put('/:id/status', updateTaskStatus);

module.exports = router;
