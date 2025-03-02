const express = require("express");
const Transaction = require("../models/TransactionModel");
const Budget = require("../models/BudgetModel");

const router = express.Router();

// Add a new transaction
router.post("/", async (req, res) => {
    try {
        const { category, amount, tags } = req.body;
        const transaction = new Transaction({
            category,
            amount,
            tags,
        });
        await transaction.save();

        // Update budget for the category
        const budget = await Budget.findOne({ category });
        if (budget) {
            budget.currentSpent += amount;
            await budget.save();

            // Check if budget is exceeded
            if (budget.isExceeded()) {
                console.log(`Alert: Budget exceeded for ${category}!`);
                // You can send a notification or email here
            }
        }

        res.status(201).send(transaction);
    } catch (error) {
        res.status(500).send({ error: "Error adding transaction" });
    }
});

// Get all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.send(transactions);
    } catch (error) {
        res.status(500).send({ error: "Error fetching transactions" });
    }
});

// Update a transaction
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { category, amount, tags } = req.body;

        const transaction = await Transaction.findByIdAndUpdate(
            id,
            { category, amount, tags },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).send({ error: "Transaction not found" });
        }

        res.send(transaction);
    } catch (error) {
        res.status(500).send({ error: "Error updating transaction" });
    }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).send({ error: "Transaction not found" });
        }

        res.send({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error deleting transaction" });
    }
});

module.exports = router;