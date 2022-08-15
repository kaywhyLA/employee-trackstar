--database for employeeTracker
CREATE DATABASE employeeTracker;
USE employeeTracker;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

-- table for employees
CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11)
);

-- table for role 
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    employee_title VARCHAR (30),
    employee_salary DECIMAL,
    department_id INTEGER
);