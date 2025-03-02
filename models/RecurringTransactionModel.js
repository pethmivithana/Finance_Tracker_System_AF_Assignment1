const mongoose = require("mongoose");

const RecurringTransactionSchema = new mongoose.Schema({
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    recurringTime: { type: String, required: true }, // e.g., "monthly", "weekly"
    nextDate: { type: Date, required: true },
});

module.exports = mongoose.model("RecurringTransaction", RecurringTransactionSchema);