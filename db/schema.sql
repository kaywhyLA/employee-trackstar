--database for employeeTracker
DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

CREATE TABLE departments (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);

-- table for employees
CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11), 
    PRIMARY KEY (id)
);

-- table for role 
CREATE TABLE employee_role (
    id INTEGER(11) AUTO_INCREMENT NOT NULL, 
    title VARCHAR (30),
    salary DECIMAL(10, 2),
    department_id INTEGER(11),
    PRIMARY KEY (id)
);