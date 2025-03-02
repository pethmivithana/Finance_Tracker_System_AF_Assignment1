const express = require('express');
const mongoose = require('mongoose');
const { PORT, mongoDBURL } = require('./config.js');
const goalRoute = require('./routes/GoalRoute.js');  // Import the budgetRoutes correctly
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const transactionRoutes = require('./routes/transactionRoutes.js');
const recurringTransactionsRoute = require('./routes/recurringTransactionsRoute.js');

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Basic route to check if the server is working
app.get('/', (req, res) => {
  return res.status(200).send('Welcome To Budget Management System');
});

// Use the budget routes on the /budgets path
app.use('/goals', goalRoute);
app.use('/api/transactions', transactionRoutes);
app.use('/api/recurring', recurringTransactionsRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB using mongoose
mongoose
  .connect(process.env.mongoDBURL || mongoDBURL)  // Use process.env or fallback to mongoDBURL from config.js
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
