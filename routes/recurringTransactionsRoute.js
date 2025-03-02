const express = require("express");
const RecurringTransaction = require("../models/RecurringTransactionModel");

const router = express.Router();

// Add a new recurring transaction
router.post("/", async (req, res) => {
    try {
        const { type, category, amount, recurringTime, nextDate } = req.body;
        const recurringTransaction = new RecurringTransaction({
            type,
            category,
            amount,
            recurringTime,
            nextDate,
        });
        await recurringTransaction.save();
        res.status(201).send(recurringTransaction);
    } catch (error) {
        res.status(500).send({ error: "Error adding recurring transaction" });
    }
});

// Get all recurring transactions
router.get("/", async (req, res) => {
    try {
        const recurringTransactions = await RecurringTransaction.find({});
        res.send(recurringTransactions);
    } catch (error) {
        res.status(500).send({ error: "Error fetching recurring transactions" });
    }
});

// Update a recurring transaction
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { type, category, amount, recurringTime, nextDate } = req.body;

        const recurringTransaction = await RecurringTransaction.findByIdAndUpdate(
            id,
            { type, category, amount, recurringTime, nextDate },
            { new: true }
        );

        if (!recurringTransaction) {
            return res.status(404).send({ error: "Recurring transaction not found" });
        }

        res.send(recurringTransaction);
    } catch (error) {
        res.status(500).send({ error: "Error updating recurring transaction" });
    }
});

// Delete a recurring transaction
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recurringTransaction = await RecurringTransaction.findByIdAndDelete(id);

        if (!recurringTransaction) {
            return res.status(404).send({ error: "Recurring transaction not found" });
        }

        res.send({ message: "Recurring transaction deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error deleting recurring transaction" });
    }
});

module.exports = router;