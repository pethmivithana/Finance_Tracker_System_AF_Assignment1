require('dotenv').config();  // Load environment variables

const mongoDBURL = process.env.mongoDBURL;
const PORT = process.env.PORT;

module.exports = { mongoDBURL, PORT };  // Export them for use in other files
