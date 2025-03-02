const express = require("express");
const router = express.Router();
const RecurringTransaction = require("../models/RecurringTransactionModel");

// ✅ Create a recurring transaction
router.post("/", async (req, res) => {
  try {
    const { userId, category, transactionType, amount, recurringTime, nextOccurrence } = req.body;
    
    const transaction = new RecurringTransaction({
      userId,
      category,
      transactionType,
      amount,
      recurringTime,
      nextOccurrence,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
});

// ✅ Get all transactions for a user
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await RecurringTransaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

// ✅ Update a transaction (only if it belongs to the user)
router.put("/:id", async (req, res) => {
  try {
    const transaction = await RecurringTransaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    Object.assign(transaction, req.body); // Update fields dynamically
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
});

// ✅ Delete a transaction (only if it belongs to the user)
router.delete("/:id", async (req, res) => {
  try {
    const transaction = await RecurringTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
});

module.exports = router;
