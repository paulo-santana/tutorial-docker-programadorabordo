const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "mysql-container",
  user: "root",
  password: "senhaMuitoLoka",
  database: "teste_docker"
});

connection.connect(err => {
  if (err) throw err;
  else {
    connection.query('show variables like "char%"', function(error, results) {
      if (error) throw error;
      console.log(
        results.map(item => ({
          variable_name: item.Variable_name,
          value: item.Value
        }))
      );
    });
  }
});

app.get("/products", function(req, res) {
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) {
      console.log(error);
      res.send([]);
      return;
    }

    res.send(
      results.map(item => ({ id: item.id, name: item.name, price: item.price }))
    );
  });
});

app.listen(9001, "0.0.0.0", () => {
  console.log("Listening on port 9001");
});
