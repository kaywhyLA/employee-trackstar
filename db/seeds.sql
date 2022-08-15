INSERT INTO department (dept_name)
VALUES 
('Finance'),
('Sales'),
('Legal'),
('Engineering');

INSERT INTO employee (first_name, last_name)
VALUES 
('Quentin', 'Tarantino'),
('Jordan', 'Peele'),
('Greta', 'Gerwig'),
('Martin', 'Scorsese'),
('Wes', 'Anderson'),
('Christopher', 'Nolan'),
('Coen', 'Brothers');

INSERT INTO role (employee_title, employee_salary, department_id)
VALUES 
('Sales Lead', 60000, 1),
('Lead Engineer', 175000, 1),
('Software Engineer', 95000, 2),
('Account Manager', 16000, 3),
('Accountant', 120000, 3),
('Legal Team Lead', 190000, 4), 
('Lawyer', 200000, 4), 
('Salesperson', 70000, 1);