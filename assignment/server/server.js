const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbConfig"); // Corrected path to dbconfig.js
const authRouter = require("./routers/auth.router");
const projectRouter = require("./routers/project.router");
const tableRouter = require("./routers/table.route"); // Assuming this is the correct file name
require("dotenv").config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS

// Define the port to listen on, defaulting to 5000 if not specified in .env
let PORT = process.env.PORT || 8080;

// Define routes
app.use("/auth", authRouter); // Routes for authentication
app.use("/project", projectRouter); // Routes for project management
app.use("/table", tableRouter); // Routes for table operations

// Define a simple home route
app.get("/", (req, res) => {
  return res.json({ msg: "home" });
});

// Start the server and connect to the database
app.listen(PORT, async () => {
  try {
    await dbConnection(); // Ensure the database connection is established
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log("Error starting the server:", error);
  }
});
