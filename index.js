const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

db.connect(() => {
    init();
});

function init() {
    
}