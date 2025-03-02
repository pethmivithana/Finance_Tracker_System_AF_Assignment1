const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    
    category: { type: String, required: true },
    limit: { type: Number, required: true },
    currentSpent: { type: Number, default: 0 },
});

// Method to check if budget is exceeded
BudgetSchema.methods.isExceeded = function () {
    return this.currentSpent > this.limit;
};

module.exports = mongoose.model("Budget", BudgetSchema);