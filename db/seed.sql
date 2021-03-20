USE employeeTrackerdb;
INSERT INTO departments (department_name)
VALUES
("Marketing"),
("Sales"),
("Purchasing"),
("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES
("Advertising Assistant", 35000, 1),
("Graphic Designer", 40000, 1),
("Marketing Manager", 60000, 1),
("Account Support Specialist", 37000, 2),
("Retail Sales", 40000, 2),
("Sales Manager", 85000, 2),
("Buyer's Assistant", 35000, 3),
("Associate Buyer", 45000, 3),
("Purchasing Manager", 100000, 3),
("Accounts Payable", 50000, 4),
("Accounts Receivable", 50000, 4),
("CFO", 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Michael", "Smith", 1, 3),
("Veronica", "Sanchez", 2, 3),
("Ally", "Hull", 3, NULL),
("Jace", "Lynch", 4, 6),
("Jenna", "James", 5, 6),
("Jacob", "Stafford", 6, NULL),
("Cindy", "Carter", 7, 9),
("Lacey", "Morse", 8, 9),
("Tom", "Miller", 9, NULL),
("Laura", "Gordon", 10, 12),
("Marcy", "Walsh", 11, 12),
("Bruce", "Bonney", 12, NULL);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
