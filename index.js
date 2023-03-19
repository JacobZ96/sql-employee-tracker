const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const { exit } = require('process');

db.connect(() => {
    init();
});

// function that will display the list to choose from 
function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
        }
    ])
    .then(response => {
        if (response.questions === 'View all departments') {
            viewDept()
        }
        else if (response.questions === 'View all roles') {
            viewRoles()
        }
        else if (response.questions === 'View all employees') {
            viewEmpl()
        }
        else if (response.questions === 'Add a department') {
            addDept()
        }
        else if (response.questions === 'Add a role') {
            addRoles()
        }
        else if (response.questions === 'Add an employee') {
            addEmpl()
        }
        else if (response.questions === 'Update an employee role') {
            addUpdt()
        }
        else  if (response.questions === 'Quit') {
            exit()
        }
    })
}

// function to view all departments
function viewDept() {
    db.query('SELECT * FROM departments', (err, data) => {
        console.table(data);
        init()
    })
}

// View all roles
function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        console.table(data);
        init()
    })
}

// View all employees
function viewEmpl() {
    db.query('SELECT * FROM employees', (err, data) => {
        console.table(data)
        init()
    })
}

// adds a new department to the list of departments
function addDept() {
    inquirer.prompt([
        {
            type: 'question',
            name: 'newDepartment',
            message: 'What would you like the new department called?'
        }
    ])
    .then((response) => {
        db.query(`INSERT INTO departments (dept_name) VALUES (?)`, response.newDepartment, err => {
            console.log('Department created');
            viewDept();
        })
    })
}

// add a new role to the list of roles
function addRoles() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the new role would you like to add?'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'What is the department ID for this role?'
        }
    ])
    .then ((response) => {
        db.query(`INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)`, [response.newRole, response.newSalary, response.deptId], err => {
            console.log('New role created');
            viewRoles();
        })
    })
}

// adds a new employee to the list of employees
function addEmpl() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the First Name of the new employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the Last Name of the new employee?'
        },
        {
            type :'input',
            name: 'roleId',
            message: 'What is the role ID of the new employee?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'What is the manager ID of this employee'
        }
    ])
    .then((response) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.firstName, response.lastName, response.roleId, response.manager], err => {
            console.log('New employee added');
            viewEmpl();
        })
    })
}

// updates and employees role
function addUpdt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'pickedEmpl',
            message: 'What is the ID of the employee?'
        },
        {
            type: 'input',
            name: 'newRole',
            message: "What is this employee's new role ID?"
        }
    ])
    .then((response) => {
        db.query(`UPDATE employees SET employees.id = ? WHERE employee.id = ?`, [response.pickedEmpl, response.newRole], err => {
            console.log('Employee updated');
            viewEmpl();
        })
    })
}