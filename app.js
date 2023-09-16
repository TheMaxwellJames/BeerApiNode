const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//MySQL
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  });




// Add a new beer
app.post("/", (req, res) => {
    const { name, tagline, description, image } = req.body; // Get beer data from the request body
  
    // Validation: Ensure that required fields are provided
    if (!name || !tagline || !description || !image) {
      return res.status(400).send("All fields are required");
    }
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
  
      // Use a SQL query to insert a new beer into the database
      connection.query(
        "INSERT INTO beers (name, tagline, description, image) VALUES (?, ?, ?, ?)",
        [name, tagline, description, image],
        (err, result) => {
          connection.release();
  
          if (!err) {
            // If the insertion was successful, respond with the ID of the newly added beer
            res.status(201).send(`Beer added with ID: ${result.insertId}`);
          } else {
            console.log(err);
            res.status(500).send("Internal Server Error");
          }
        }
      );
    });
  });
  

  



//Get All Beers
app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from beers", (err, rows) => {
      connection.release();

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});




// Get a specific beer by ID
app.get("/:id", (req, res) => {
    const beerId = req.params.id; // Get the ID parameter from the URL
    
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
  
      // Use a SQL query to fetch the specific beer by ID
      connection.query("SELECT * FROM beers WHERE id = ?", [beerId], (err, rows) => {
        connection.release();
  
        if (!err) {
          if (rows.length > 0) {
            // If rows are returned, send the beer data
            res.send(rows[0]);
          } else {
            // If no rows are returned, send a 404 response (Not Found)
            res.status(404).send("Beer not found");
          }
        } else {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      });
    });
  });






// Delete a beer by ID
app.delete("/:id", (req, res) => {
    const beerId = req.params.id; // Get the ID parameter from the URL
    
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
  
      // Use a SQL query to delete the specific beer by ID
      connection.query("DELETE FROM beers WHERE id = ?", [beerId], (err, result) => {
        connection.release();
  
        if (!err) {
          if (result.affectedRows > 0) {
            // If affectedRows is greater than 0, the beer was deleted successfully
            res.status(204).send("Beer deleted"); // 204 No Content response with a message
          } else {
            // If no rows were affected, send a 404 response (Not Found)
            res.status(404).send("Beer not found");
          }
        } else {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      });
    });
  });
  
  
  
  // Update a beer by ID
app.put("/:id", (req, res) => {
  const beerId = req.params.id; // Get the ID parameter from the URL
  const { name, tagline, description, image } = req.body; // Get updated beer data from the request body

  // Validation: Ensure that required fields are provided
  if (!name || !tagline || !description || !image) {
    return res.status(400).send("All fields are required");
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    // Use a SQL query to update the specific beer by ID
    connection.query(
      "UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?",
      [name, tagline, description, image, beerId],
      (err, result) => {
        connection.release();

        if (!err) {
          if (result.affectedRows > 0) {
            // If affectedRows is greater than 0, the beer was updated successfully
            res.status(200).send(`Beer with ID ${beerId} updated`);
          } else {
            // If no rows were affected, send a 404 response (Not Found)
            res.status(404).send("Beer not found");
          }
        } else {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  });
});













//Listen on env port or port 5000
app.listen(port, () => console.log(`Listen on port ${port}`));
