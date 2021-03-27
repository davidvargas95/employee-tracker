const connection = require("./connection");

module.exports = {
    showAll(){
        return connection.query(
            `SELECT 
                d.id as department_ID, 
                d.department_name, 
                r.title, 
                r.salary, 
                CONCAT(e.first_name, " ", e.last_name) as Name, 
                e.role_id 
            FROM employees e 
            INNER JOIN roles r ON e.role_id = r.id 
            LEFT JOIN departments d ON e.manager_id = d.id 
            GROUP BY e.id 
            ORDER BY e.id;`)
    },
    // View all departments
    getDepartments() {
        return connection.query("SELECT * FROM departments")
    },
    // View all roles
    viewRole(){
        return connection.query("SELECT r.id, r.title, r.salary, d.department_name as Department FROM roles r "+  
        "INNER JOIN departments d "+
        "ON r.department_id = d.id;");
    },
    // Get roles
    getRole(data) {
        return connection.query("SELECT * FROM roles WHERE department_id = ?", data);
    },
    // Get employees
    getEmployee(){
        return connection.query("SELECT e.id, e.first_name, e.last_name, r.title as Title FROM employees e INNER JOIN roles r ON e.role_id = r.id;");
    },
    // Add a new department
    addDepartment(data){
        return connection.query("INSERT INTO departments SET department_name = ?", data);
    },
    // Delete a department
    noDepartment(data){
        return connection.query("DELETE FROM departments WHERE id = ?", data);
    },
    // Add a new role
    addRole(data) {
        return connection.query("INSERT INTO roles SET ?", data);
    },
    // Remove a role
    removeRole(data){
        return connection.query("DELETE FROM roles WHERE id = ?", data);
    },
    // Add a new employee
    addEmployee(data){
        return connection.query("INSERT INTO employees SET ?", data);
    },
    // Remove an employee
    removeEmployee(data){
        return connection.query("DELETE FROM employees WHERE id = ? ", data)
    },
    // Exit the application
    endConnection (){
        return connection.end();
    }
}
