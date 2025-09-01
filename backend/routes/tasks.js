const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// Add task
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user.id });
  await task.save();
  res.json(task);
});

// Edit task
router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, description },
    { new: true }
  );
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  res.json({ msg: 'Task deleted' });
});

// Toggle status
router.patch('/:id/toggle', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  task.status = task.status === 'pending' ? 'completed' : 'pending';
  await task.save();
  res.json(task);
});

module.exports = router;
