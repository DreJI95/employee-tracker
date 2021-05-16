const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//fetches the employee table
router.get('/employees', (req,res) =>{
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, department.department_name, role.salary, 
    CONCAT(emp_m.first_name,' ',emp_m.last_name) AS "manager"
    FROM employee LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee emp_m ON employee.manager_id = emp_m.id
    ORDER BY employee.last_name ASC`;

    db.query(sql, (err, rows) => {
        try { res.json({
            message: 'success',
            data: rows,
          }); }
        catch (err) {
          res.status(500).json({ error: err.message }); }
    });
});

//Used to insert new employees
router.post('/employee', ({ body }, res) => {

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  
    db.query(sql, params, (err, result) => {
        try { 
            res.json({
            message: 'success',
            data: body
          }); }
        catch (err) {
            res.status(400).json({ error: err.message }); }
    });
});

//update employee's role
router.put('/employee/role/:id', (req, res) => {
  
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
  
    db.query(sql, params, (err, result) => {
        try {
            res.json({
              message: 'success',
              data: req.body,
              changes: result.affectedRows
            }); }
        catch (err) {
            if (err) { 
                res.status(400).json({ error: err.message }); }
            else if (!result.affectedRows) {
                res.json({
                    message: 'Employee not found'
                });
                } } 
    });
});

//update employee's manager
router.put('/employee/manager/:id', (req, res) => {
  
    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    const params = [req.body.manager_id, req.params.id];
  
    db.query(sql, params, (err, result) => {
        try {
            res.json({
              message: 'success',
              data: req.body,
              changes: result.affectedRows
            }); }
        catch (err) {
            if (err) { 
                res.status(400).json({ error: err.message }); }
            else if (!result.affectedRows) {
                res.json({
                    message: 'Employee not found'
                }); } }
    });
});

//removes employee by id
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
  
    db.query(sql, req.params.id, (err, result) => {
        try {
            res.json({
              message: 'deleted',
              changes: result.affectedRows,
              id: req.params.id
            }); }
        catch (err) {
            if (err) { 
                res.status(400).json({ error: res.message }); }
            else if (!result.affectedRows) {
                res.json({
                    message: 'Employee not found'
                }); } }
    });
});

module.exports = router;