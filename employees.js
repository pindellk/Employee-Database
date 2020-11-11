// Establish dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const { start } = require("repl");

// Create connection info for sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "orangedejavu8",
    database: "employees_DB"
});

// Connect to mysql server and databse
connection.connect(function (err) {
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    start();
});

// Function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({

      })
      .then(function(answer) {
          
      })
}