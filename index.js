const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const { exit } = require('process');

db.connect(() => {
    init();
});

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

function viewDept() {
    db.query('SELECT * FROM departments', (err, data) => {
        console.table(data);
        init()
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        console.table(data);
        init()
    })
}

function viewEmpl() {
    db.query('SELECT * FROM employees', (err, data) => {
        console.table(data)
        init()
    })
}

function addDept() {
    inquirer.prompt([
        {
            type: 'question',
            name: 'newDepartment',
            message: 'What would you like the new department called?'
        }
    ])
    .then((response) => {
        db.query(`INSERT INTO departments (dept_name) VALUES(?)`, response.newDepartment, err => {
            console.log('Department created');
            viewDept();
        })
    })
}

