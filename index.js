const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");

// Create Express server
const app = express();

// Database
dbConnection();

// Public directory
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server running over ${process.env.PORT} port`);
});
