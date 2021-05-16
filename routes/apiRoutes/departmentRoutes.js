const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//fetches the departments table
router.get('/departments', (req,res) =>{
    const sql = 'SELECT * FROM department';

    db.query(sql, (err, rows) => {
        try {
            res.status(200).json({
                message: 'success',
                data: rows,
              }) }
        catch (err) {
            res.status(500).json({ error: err.message }); }        
    });
});

//Used to insert new departments
router.post('/department', ({ body }, res) => {

    const sql = `INSERT INTO department (department_name) VALUES (?)`;
  
    db.query(sql, body.department_name, (err, result) => {
        try{
            res.status(200).json({
                message: 'success',
                data: rows,
              }) }
        catch (err) {
            res.status(400).json({ error: err.message }); }  
    });
});

//removes department by id
router.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
  
    db.query(sql, req.params.id, (err, result) => {
      try {
        res.status(200).json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        }); }
      catch (err) {
        if (err)
        { res.status(400).json({ error: res.message }); }
        else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
              });
        } }
    });
});

// //fetches the departments budget
// router.get('/departments/budget', (req,res) =>{
//     const sql = ``;

//     db.query(sql, (err, rows) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: rows,
//         })
//     });
// });


module.exports = router;