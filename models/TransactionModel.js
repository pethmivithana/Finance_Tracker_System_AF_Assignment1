const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({

    category: { type: String, required: true },
    amount: { type: Number, required: true },
    tags: [{ type: String }],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);