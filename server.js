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

// add new department
const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        message: 'Which department would you like to add?',
        name: 'newDept'
    }]).then((answers) => {
        connection.query(`INSERT INTO employee_Dept SET?`, {
                dept_name: answers.newDept
            },
            (err) => {
                if (err) throw err;
                console.log('Added new department')
                console.table(answers)
                employeeUpdate()
            })
    })
};

// add roles
const addRoles = () => {
    inquirer.prompt([{
        type: 'input',
        message: 'Which role would you like to add?',
        name: 'newRole'
    }, {
        type: 'input',
        message: 'What is the salary?',
        name: 'salary'
    }]).then((answers) => {
        connection.query(`INSERT INTO employee_Role SET?`, {
                title: answers.newRole,
                salary: answers.salary
            },
            (err) => {
                if (err) throw err;
                console.log('Added new role')
                console.table(answers)
                employeeUpdate()
            })
    })
};

employeesArray = [];
const query = 'SELECT first_name FROM employee';
connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ first_name }) => {
        employeesArray.push(first_name);
    });
});
rolesArray = []
const query2 = `SELECT title FROM employee_Role`
connection.query(query2, (err, res) => {
    if (err) throw err;
    res.forEach(({ title }) => {
        rolesArray.push(title);
    });
});

// update employee role
const updateEmployeeRole = () => {
    inquirer.prompt([{
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: employeesArray,
            name: 'roleUpdate'
        },
        {
            type: 'list',
            message: 'What would you like for the new role?',
            choices: rolesArray,
            name: 'newRole'
        }
    ]).then((answers) => {
        connection.query(`UPDATE employee_Role SET title = ? WHERE first_name = ?`, {
                title: answers.newRole,
                first_name: answers.roleUpdate
            },
            (err) => {
                if (err) throw err;
                console.log('Updated Employee Role')
                console.table(answers)
                employeeUpdate()
            })
    })

}

employeeUpdate()