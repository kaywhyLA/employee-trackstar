INSERT INTO departments (dept_name)
VALUES 
('Finance'),
('Sales'),
('Legal'),
('Engineering');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Quentin', 'Tarantino', 1, 1),
('Jordan', 'Peele', 2, 1),
('Greta', 'Gerwig', 3, 1),
('Martin', 'Scorsese', 1, 1),
('Wes', 'Anderson', 3, null),
('Christopher', 'Nolan', 1, 1),
('Coen', 'Brothers', 3, null);

INSERT INTO employee_role (title, salary, department_id)
VALUES 
('Sales Lead', 60000, 1),
('Lead Engineer', 175000, 1),
('Software Engineer', 95000, 2),
('Account Manager', 160000, 3),
('Accountant', 120000, 3),
('Legal Team Lead', 190000, 4), 
('Lawyer', 200000, 4), 
('Salesperson', 70000, 1);