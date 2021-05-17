const db = require('../db/connection');
const cTable = require('console.table');

//fetches the departments table
const viewAllDepartments = function () {
    const sql = 'SELECT * FROM department';

    db.query(sql, (err, results) => {
      try { 
        console.log('\n');
        console.table(results); }
      catch (err) { console.log("Something is wrong with the database connection:"+ err)}     
    });
}

//Used to insert new departments
const addDepartment = function (department_name) {
    const sql = `INSERT INTO department (department_name) VALUES (?)`;
  
    db.query(sql, department_name, (err, results) => {
      try { console.log('\n'); console.log("Department added."); }
      catch (err) { console.log("Something is wrong with the database connection:"+ err)} 
    });
}

//removes department by id
const removeDepartment = function (id) {
    const sql = `DELETE FROM department WHERE id = ?`;
  
    db.query(sql, id, (err, results) => {
      try { console.log('\n'); console.log("Department removed."); }
      catch (err) { console.log("Something is wrong with the database connection:"+ err)}
    });
}

module.exports = {viewAllDepartments,addDepartment,removeDepartment};