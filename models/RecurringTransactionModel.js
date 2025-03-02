const mongoose = require("mongoose");

const RecurringTransactionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  recurringTime: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  nextOccurrence: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RecurringTransaction", RecurringTransactionSchema);
