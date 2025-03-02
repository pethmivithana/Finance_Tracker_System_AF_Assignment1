const express = require("express");
const Transaction = require("../models/TransactionModel");

const router = express.Router();

// Create a new transaction
router.post("/", async (req, res) => {
  try {
    const { category, amount, date, tags } = req.body;
    const newTransaction = new Transaction({ category, amount, date, tags });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully", newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

// Get a transaction by ID
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction", error });
  }
});

// Update a transaction
router.put("/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTransaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json({ message: "Transaction updated successfully", updatedTransaction });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
});

module.exports = router;
