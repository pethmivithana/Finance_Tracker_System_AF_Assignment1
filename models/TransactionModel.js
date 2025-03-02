const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Bills",
        "Healthcare",
        "Education",
        "Salary",
        "Investment",
        "Other",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Auto-set to current timestamp
    },
    tags: {
      type: [String], // Example: ["#groceries", "#work"]
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
