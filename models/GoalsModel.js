const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Name of the budget (e.g., "Monthly Rent", "Vacation")
    },
    expectedAmount: {
      type: Number,
      required: true, // The estimated amount user plans to allocate
    },
    totalAmount: {
      type: Number,
      default: 0, // The actual amount spent so far (default is 0)
    },
    description: {
      type: String,
      required: true, // Short description of the budget
    },
    expectedTime: {
      type: Date,
      required: true, // Deadline or expected date for budget completion
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
