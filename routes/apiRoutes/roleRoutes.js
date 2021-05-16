const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//fetches the roles table
router.get('/roles', (req,res) =>{
    const sql = `SELECT role.id, role.title, department.department_name AS 'department', role.salary FROM role
    LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        try { 
          res.json({
          message: 'success',
          data: rows,
        }) } 
        catch (err) {
            res.status(500).json({ error: err.message }); }
    });
});

//Used to insert new roles
router.post('/role', ({ body }, res) => {

    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];
  
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

//removes role by id
router.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM role WHERE id = ?`;
  
    db.query(sql, req.params.id, (err, result) => {
        try {
            res.json({
              message: 'deleted',
              changes: result.affectedRows,
              id: req.params.id
            }); }
        catch (err) {
            if (err)
                { res.status(400).json({ error: res.message }); }
            else if (!result.affectedRows) {
                res.json({
                message: 'Role not found'
                }); }}
    });
});

module.exports = router;