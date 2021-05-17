const db = require('../db/connection');
const cTable = require('console.table');

//fetches the employee table
const viewAllEmployees = function () {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, department.department_name, role.salary, 
    CONCAT(emp_m.first_name,' ',emp_m.last_name) AS "manager"
    FROM employee LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee emp_m ON employee.manager_id = emp_m.id
    ORDER BY employee.last_name ASC`;

    db.query(sql, (err, results) => {
        try { console.log('\n'); console.table(results); }
        catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

//Used to insert new employees
const addEmployee = function (first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id];
  
    db.query(sql, params, (err, results) => {
        try { console.log('\n'); console.table(results) }
        catch (err) { console.log("Something is wrong with the database connection:"+ err) }
    });
}

//update employee's role
const updateEmployeeRole = function (id, role_id) {
  
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [role_id, id];
  
    db.query(sql, params, (err, results) => {
        try { console.log('\n'); console.table(results); }
        catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

//update employee's manager
const updateEmployeeManager = function (id, manager_id) {
  
    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    const params = [manager_id, id];
  
    db.query(sql, params, (err, results) => {
        try { console.log('\n'); console.table(results); }
        catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

//removes employee by id
const removeEmployee = function (id) {
    const sql = `DELETE FROM employee WHERE id = ?`;
  
    db.query(sql, id, (err, results) => {
        try { console.log('\n'); console.table(results); }
        catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

module.exports = {viewAllEmployees,addEmployee,updateEmployeeRole,updateEmployeeManager,removeEmployee};