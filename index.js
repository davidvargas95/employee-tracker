const inquirer = require("inquirer");
const db = require("./db");
const index = require("./db/index");

// This shows us our table of selected data
function viewTable() {
    db
    .showAll()
    .then((result) => {
        console.table(result);
        start();
    })
}
viewTable();

// Asks the user which function they would like to perform
function start() {
    inquirer.prompt(
        {
         type: "list",
         message: "Select an option",
         name: "mainMenu",
         choices: 
         [
            "-1- View Departments",
            "-2- View Roles",
            "-3- View Employees",
            "-4- Add a Department",
            "-5- Delete a Department",
            "-6- Add a Role",
            "-7- Delete a Role",
            "-8- Add an employee",
            "-9- Delete an Employee",
            "-10- Exit"
         ]   
        }
    )
    // Routes to the proper function
    .then((choices) => {
        switch(choices.mainMenu) {
            case "-1- View Departments":
                vDepartmentsTable();
                break;

            case "-2- View Roles":
                vRolesTable();
                break;

            case "-3- View Employees":
                vEmployeesTable();
                break;

            case "-4- Add a Department":
                addDepartment();
                break;

            case "-5- Delete a Department":
                deleteDepartment();
                break;
                
            case "-6- Add a Role":
                addRole();
                break;

            case "-7- Delete a Role":
                deleteRole();
                break;

            case "-8- Add an employee":
                addEmployee();
                break;

            case "-9- Delete an Employee":
                deleteEmployee();
                break;

            default:
            index.endConnection();
        };
    });
};

// View all Departments
function vDepartmentsTable() {
    db.getDepartments()
    .then((result) => {
        console.table(result);
        start();
    })
};

// View all roles
function vRolesTable() {
    db.viewRole()
    .then((result) => {
        console.table(result);
        start();
    })
};

// View all employees
function vEmployeesTable() {
    db.getEmployee()
    .then((result) => {
        console.table(result);
        start();
    })
};

// Add a department
function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "What department are you adding?"
    }
    ).then((response) => {
        db.addDepartment(response.department);
        start();
    })
};

// Delete a department
function deleteDepartment() {
    db.getDepartments()
    .then((dInfo) => {
        const dList = dInfo.map((dData) => ({
            value: dData.id,
            name: dData.department_name
        }))

        inquirer.prompt({
            type: "list",
            name: "departmentChoices",
            message: "Which department are you removing?",
            choices: dList
        }).then((response) => {
            db.noDepartment(response.departmentChoices);
            start();
        })
    })
};

// Add a role
function addRole() {
    db.getDepartments()
    .then((dInfo) => {
        const dList = dInfo.map((dData) => ({
            value: dData.id,
            name: dData.department_name
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "departmentChoices",
                message: "Which department are you adding a role to?",
                choices: dList
            },
            {
                type: "input",
                name: "rTitle",
                message: "What role are you adding?"
            },
            {
                type: "input",
                name: "rSalary",
                message: "What is the salary?"
            }
        ]).then((response) => {
            const newRole = {
                title: response.rTitle,
                salary: response.rSalary,
                department_id: response.departmentChoices
            }
            db.addRole(newRole);
            start();
        })
    })
};

// Delete a role
function deleteRole() {
    db.getDepartments()
    .then((dInfo) => {
        const dList = dInfo.map((dData) => ({
            value: dData.id,
            name: dData.department_name
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "departmentChoices",
                message: "Which department are you removing a role from?",
                choices: dList
            }
        ]).then((response) => {
            const depSelect = response.departmentChoices;
            db.getRole(depSelect)
            .then((rInfo) => {
                const rList = rInfo.map((rData) => ({
                    value: rData.id,
                    name: rData.title
                }))
                inquirer.prompt(
                    {
                        type: "list",
                        name: "roleChoices",
                        message: "Which role are you removing?",
                        choices: rList
                    }
                ).then((response) => {
                    db.removeRole(response.roleChoices);
                    start();
                })
            })
        })
    })
};

// Add an employee
function addEmployee() {
    db.getDepartments()
    .then((dInfo) => {
        const dList = dInfo.map((dData) => ({
            value: dData.id,
            name: dData.department_name
        }))
        inquirer.prompt({
            type: "list",
            name: "departmentChoices",
            message: "Which department are you adding an employee to?",
            choices: dList
        }).then((response) => {
            const depSelect = response.departmentChoices;
            db.getRole(depSelect)
            .then((rData) => {
                const rList = rData.map((dData) => ({
                    value: dData.id,
                    name: dData.title
                }))
                inquirer.prompt([
                    {
                        type: "list",
                        name: "roleChoices",
                        message: "Which role is this employee?",
                        choices: rList
                    },
                    {
                        type: "input",
                        name: "firstName",
                        message: "What is this employee's first name?"
                    },
                    {
                        type: "input",
                        name: "lastName",
                        message: "What is this employee's last name?"
                    }
                ]).then((response) => {
                    const newEmployee = {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: response.roleChoices,
                    }
                    db.addEmployee(newEmployee);
                    start();
                })
            })
        })
    })
};

// Delete an employee
function deleteEmployee() {
    db.getEmployee()
    .then((eInfo) => {
        const eList = eInfo.map((dData) => ({
            value: dData.id,
            name: dData.first_name + " " + dData.last_name
        }))
        inquirer.prompt(
            {
                type: "list",
                name: "employeeName",
                message: "Which employee are you removing?",
                choices: eList
            }
        ).then((response) => {
            db.removeEmployee(response.employeeName);
            start();
        })
    })
};