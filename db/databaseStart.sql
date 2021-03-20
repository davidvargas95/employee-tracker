DROP DATABASE IF EXISTS employeeTrackerdb;

CREATE DATABASE employeeTrackerdb;

USE employeeTrackerdb;

CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (ID)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES departments (id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),

    FOREIGN KEY (role_id)
    REFERENCES roles (id),

    FOREIGN KEY (manager_id)
    REFERENCES roles (id)
);