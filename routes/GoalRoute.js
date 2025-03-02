const express = require('express');
const Budget = require('../models/GoalsModel'); // Import the Budget model
const Goal = require('../models/GoalsModel');
const router = express.Router();

// POST endpoint to create a new budget
router.post('/', async (req, res) => {
  try {
    const { title, expectedAmount, totalAmount, description, expectedTime } = req.body;

    if (!title || !expectedAmount || !description || !expectedTime) {
      return res.status(400).json({
        message: 'Send all required fields: title, expectedAmount, description, expectedTime',
      });
    }

    const newGoal = await Goal.create({
      title,
      expectedAmount,
      totalAmount: totalAmount || 0,  // Default to 0 if not provided
      description,
      expectedTime,
    });

    return res.status(201).json(newGoal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET all budgets
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({});
    return res.status(200).json({
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET a specific budget by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Budget.findById(id);

    if (!goal) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    return res.status(200).json(goal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// PUT (update) a budget by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, expectedAmount, totalAmount, description, expectedTime } = req.body;

    if (!title || !expectedAmount || !description || !expectedTime) {
      return res.status(400).json({
        message: 'Send all required fields: title, expectedAmount, description, expectedTime',
      });
    }

    const { id } = req.params;
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { title, expectedAmount, totalAmount, description, expectedTime },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    return res.status(200).json({ message: 'Goal updated successfully', goal: updatedGoal });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// DELETE a budget by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGoal = await Goal.findByIdAndDelete(id);

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    return res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; // Export the router to use in the server.js
