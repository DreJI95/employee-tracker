const db = require('../db/connection');
const cTable = require('console.table');

//fetches the roles table
const viewAllRoles = function () {
    const sql = `SELECT role.id, role.title, department.department_name AS 'department', role.salary FROM role
    LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, results) => {
      try { console.log('\n'); console.table(results); }
      catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

//Used to insert new roles
const addRole = function (title, salary, department_id) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department_id];
  
    db.query(sql, params, (err, results) => {
      try { console.log('\n'); console.table(results); }
      catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

//removes role by id
const removeRole = function (id) {
    const sql = `DELETE FROM role WHERE id = ?`;
  
    db.query(sql, id, (err, results) => {
      try { console.log('\n'); console.table(results); }
      catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

module.exports = {viewAllRoles,addRole,removeRole};