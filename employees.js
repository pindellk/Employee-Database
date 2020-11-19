// Establish dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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

// Object for main action menu
const actionMenu = {
    type: "list",
    name: "select",
    message: "What would you like to do?",
    choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View ALL Roles",
        "Quit"
    ]
};

const newEmployee = [
    {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Sales Lead", new inquirer.Separator(), "Salesperson", new inquirer.Separator(), "Lead Engineer", new inquirer.Separator(), "Software Engineer", new inquirer.Separator(), "Account Manager", new inquirer.Separator(), "Accountant", new inquirer.Separator(), "Legal Team Lead", new inquirer.Separator(), "Lawyer"]
    },
    // {
    //     type: "list",
    //     name: "manager",
    //     message: "Who is the employee's manager?",
    //     choices: ["None", new inquirer.Separator(), employees.manager] // grab managers from DB
    // },
    {
        type: "list",
        name: "department",
        message: "What department is the employee in?",
        choices: ["Sales", new inquirer.Separator(), "Engineering", new inquirer.Separator(), "Finance", new inquirer.Separator(), "Legal"]
    },
    {
        type: "number",
        name: "salary",
        message: "What is the employee's salary?",
        validate: val => /[1-9]/gi.test(val),
    }
];

// Function that prompts the user to select an action
function start() {
    inquirer
        .prompt(actionMenu)
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Employees by Department":
                    deptEmployees();
                    break;

                case "View All Employees by Manager":
                    mngrEmployees();
                    break;

                // case "Add Employee":
                //     addEmployee();
                //     break;

                // case "Remove Employee":
                //     removeEmployees();
                //     break;

                // case "Update Employee Role":
                //     updateRole();
                //     break;

                // case "Update Employee Manager":
                //     updateManager();
                //     break;

                // case "View ALL Employees":
                //     viewRoles();
                //     break;
            }
        });
}

// Function to view all employees
function viewEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary ";
    query += "FROM employee INNER JOIN role ";
    query += "ON employee.role_id = role.id ";
    query += "INNER JOIN department ";
    query += "ON role.department_id = department.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}

// Function to view all employees by department
function deptEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, department.name ";
    query += "FROM employee INNER JOIN role ";
    query += "ON employee.role_id = role.id ";
    query += "INNER JOIN department ";
    query += "ON role.department_id = department.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}

// Function to view all employees by manager
// function mngrEmployees() {
//     var query = "employee.id, employee.first_name, employee.last_name, employee.manager_id ";
//     query += "FROM employee INNER JOIN role ";
//     query += "ON employee.role_id = role.id ";
//     query += "WHERE role.title = "manager" ";

//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });
// }

// Function to add employee
function addEmployee() {
    inquirer
        .prompt(newEmployee)
        .then((answers) => {
            connection.query("INSERT INTO ________ SET ?", {   // add joined table
                first_name: answers.firstName,
                last_name: answers.lastName,
                role: answers.role,
                manager: answers.manager,
                department: answers.department,
                salary: answers.salary,
            }),
                function (err) {
                    if (err) throw err;
                    console.log("Employee successfully added\n");
                };
        });
}

// Function to remove employee
function removeEmployee(employee) {
    connection.query("DELETE FROM ______ WHERE ?", { employee }, function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee deleted\n");
    });
}

// Function to update employee role
function updateRole() {

}

// Function to update employee manager
function updateManager() {

}

// Function to view all roles
function viewRoles() {

}

// Function to end database connection
function endConnection() {
    connection.end();
};