const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = mysql.createPool({
  host: "sql.freedb.tech",       // from FreeDB
  user: "freedb_GWT_TANMAY",        // your FreeDB username
  password: "G9t%2J*ZfQ?vtHC",     // your FreeDB password
  database: "freedb_mytarakeswar", // your DB name
  port: 3306
});

// API endpoint
app.get('/restaurants', (req, res) => {
  const type = req.query.type; // Veg / Non-Veg / Both
  let sql = "SELECT * FROM restaurants";
  let params = [];
  if (type && type !== "All") {
    sql += " WHERE type = ?";
    params.push(type);
  }
  pool.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("✅ API running on port 5000");
});
