const express = require("express");
const Budget = require("../models/BudgetModel");

const router = express.Router();

// Set a budget
router.post("/", async (req, res) => {
    try {
        const { category, limit } = req.body;
        const budget = new Budget({
            category,
            limit,
        });
        await budget.save();
        res.status(201).send(budget);
    } catch (error) {
        res.status(500).send({ error: "Error setting budget" });
    }
});

// Get all budgets
router.get("/", async (req, res) => {
    try {
        const budgets = await Budget.find({});
        res.send(budgets);
    } catch (error) {
        res.status(500).send({ error: "Error fetching budgets" });
    }
});

// Update a budget
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { category, limit } = req.body;

        const budget = await Budget.findByIdAndUpdate(
            id,
            { category, limit },
            { new: true }
        );

        if (!budget) {
            return res.status(404).send({ error: "Budget not found" });
        }

        res.send(budget);
    } catch (error) {
        res.status(500).send({ error: "Error updating budget" });
    }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const budget = await Budget.findByIdAndDelete(id);

        if (!budget) {
            return res.status(404).send({ error: "Budget not found" });
        }

        res.send({ message: "Budget deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error deleting budget" });
    }
});

module.exports = router;