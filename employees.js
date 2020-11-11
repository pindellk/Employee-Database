// Establish dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const query = connection.query();

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
    console.log("Connected as id " + connection.threadId + "\n");
    // Run the start function after the connection is made to prompt the user
    start();
});

const actionMenu = {
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee ", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View ALL Roles"]
};

const newEmployee = [
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "number",
        name: "id",
        message: "What is your ID?",
        validate: val => /[1-9]/gi.test(val),
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager", new inquirer.Separator(), "Engineer", new inquirer.Separator(), "Intern"]
    }
];

// Function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt(actionMenu)
        .then((answer) => {
            let nextTask;
            if (answer.action === actionMenu.choices[0]) {
                viewEmployees();
            }
            if (answer.action === actionMenu.choices[1]) {
                deptEmployees();
            }
            if (answer.action === actionMenu.choices[2]) {
                mngEmployees();
            }
            if (answer.action === actionMenu.choices[3]) {
                addEmployee();
            }
            if (answer.action === actionMenu.choices[4]) {
                removeEmployee();
            }
            if (answer.action === actionMenu.choices[5]) {
                updateRole();
            }
            if (answer.action === actionMenu.choices[6]) {
                updateManager();
            }
            if (answer.action === actionMenu.choices[7]) {
                viewRoles();
            }
        });
}

// Function to view all employees
function viewEmployees() {
    query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(id, first_name, last_name, title, department, salary, manager);
    });
}

// Function to view all employees by department
// Function to view all employees by manager
// Function to add employee
function addEmployee() {
    
    inquirer
      .prompt(newEmployee)
      .then((answers) => {
       connection.query("INSERT INTO employees SET ?",
      }), function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee added\n");
    });
}

// Function to remove employee
function removeEmployee(employee) {
    query("DELETE FROM ______ WHERE ?", { employee }, function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee deleted\n");
    });
}

// Function to update employee role
// Function to update employee manager
// Function to view all roles

// Function to end database connection
function endConnection() {
    connection.end();
};