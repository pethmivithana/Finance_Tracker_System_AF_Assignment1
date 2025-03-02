const express = require("express");
const Transaction = require("../models/TransactionModel");
const RecurringTransaction = require("../models/RecurringTransactionModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get spending trends over time
router.get("/spending-trends", authMiddleware(), async (req, res) => {
    try {
        const { startDate, endDate, category, tags } = req.query;
        const userId = req.user.userId;

        // Build the query
        const query = { user: userId };
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (category) {
            query.category = category;
        }
        if (tags) {
            query.tags = { $in: tags.split(",") };
        }

        // Fetch transactions
        const transactions = await Transaction.find(query);

        // Aggregate spending by date
        const spendingTrends = transactions.reduce((acc, transaction) => {
            const date = transaction.date.toISOString().split("T")[0]; // Group by date
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += transaction.amount;
            return acc;
        }, {});

        res.json({ spendingTrends });
    } catch (error) {
        res.status(500).json({ message: "Error fetching spending trends", error });
    }
});

// Visualize income vs. expenses
router.get("/income-vs-expenses", authMiddleware(), async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user.userId;

        // Build the query
        const query = { user: userId };
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Fetch transactions
        const transactions = await Transaction.find(query);

        // Calculate total income and expenses
        const incomeVsExpenses = transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === "income") {
                    acc.income += transaction.amount;
                } else if (transaction.type === "expense") {
                    acc.expenses += transaction.amount;
                }
                return acc;
            },
            { income: 0, expenses: 0 }
        );

        res.json({ incomeVsExpenses });
    } catch (error) {
        res.status(500).json({ message: "Error fetching income vs. expenses", error });
    }
});

module.exports = router;