const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
let employeesArray = [];
let rolesArray = [];


// Connect to database 
const database = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Malcolm_01',
        database: 'employeeTracker'
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
    });
};

// view all Employee information
const viewAllEmployees = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_dept.dept_name, employee_role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN employee_Role ON employee.role_id = employee_Role.id
    INNER JOIN employee_Dept ON employee_Dept.id = employee_Role.department_id; `
    connection.query(query, (err, res) => {
        if (err) throw err
        console.log("View all employees")
        console.table(res)
        employeeUpdate()
    })
};

// view all departments
const viewDepartments = () => {
    const query = `SELECT dept_name FROM employee_Dept`
    connection.query(query, (err, res) => {
        if (err) throw err
        console.log('Viewing Departments')
        console.table(res)
        employeeUpdate()
    })
};

// view all roles
const viewRoles = () => {
    rolesArray = []
    const query = `SELECT title FROM employee_Role`
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ title }) => {
            rolesArray.push(title);
            console.log('Viewing Roles')
            console.log(res)
            console.log(rolesArray)
            employeeUpdate()
        })
    })
};

// add new employee
const addEmployee = () => {
    inquirer.prompt([{
            type: 'input',
            message: 'What is the employees first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'What is the employees manager id?',
            name: 'managersId'
        }
    ]).then((answers) => {
        connection.query(`INSERT INTO employees SET ?`, {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleId,
                manager_id: answers.managersId
            },
            (err) => {
                if (err) throw err;
                console.log('Added employee')
                console.log(answers)
                employeeUpdate()
            })
    })
};