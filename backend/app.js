const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// API endpoint to save billing data
app.post("/api/save-billing", (req, res) => {
  const { name, email, phone, movie, theatre, seats, total_price } = req.body;

  // Log the data received from the frontend
  console.log("Received billing data from frontend:", req.body);

  // Validate the incoming data
  if (
    !name ||
    !email ||
    !phone ||
    !movie ||
    !theatre ||
    !seats ||
    !total_price
  ) {
    console.error("Validation failed: Missing fields in the request body.");
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert data into the database
  const query = `
    INSERT INTO BillingDetails (name, email, phone, movie, theatre, seats, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [name, email, phone, movie, theatre, seats.join(", "), total_price],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into the database:", err);
        return res.status(500).json({ error: "Failed to save billing data" });
      }

      console.log("Data inserted successfully into the database.");
      res.status(201).json({ message: "Billing data saved successfully" });
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
