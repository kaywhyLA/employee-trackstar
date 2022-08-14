const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database 
const database = mysql.createConnection({
        host: 'localhost',
        port: '3001',
        user: 'root',
        password: 'Malcolm_01',
        database: 'departments'
    },
    console.log('connected')
);

// first prompt question for employer choice
const employeeUpdate = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'employeeChoice',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'View Departments',
            'View Roles',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    }]).then((answer) => {
        switch (answer.employeeChoice) {
            case 'View all Employees':
                viewAllEmployees();
                break;

            case 'View Departments':
                viewDepartments();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Add Departments':
                addDepartment();
                break;
            case 'Add Roles':
                addRoles();
                break;

            case 'Update Employee Role':
                updateEmployeeRole();
                break;
        }
    })
}

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});